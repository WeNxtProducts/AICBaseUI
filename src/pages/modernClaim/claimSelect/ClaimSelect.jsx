import React, { useContext, useState, useRef, useEffect } from 'react';
import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import RadioChip from '../../../components/radioChip/RadioChip';
import {
 claim_check,
 platforms,
} from '../../../components/tableComponents/sampleData';
import {
 CustomDatePicker,
 CustomSelect,
} from '../../../components/commonExportsFields/CommonExportsFields';
import { Form, Formik } from 'formik';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { ClaimContext } from '../ModernClaim';
import { setCurrentID } from '../../../globalStore/slices/IdSlices';
import { debounce } from 'lodash';
import dayjs from 'dayjs';

const ClaimSelect = () => {
 const {
  id: tranId,
  setPolicyList,
  setelectedPolicy,
 } = useContext(ClaimContext);
 const dispatch = useDispatch();
 const formRef = useRef(null);
 const companyCode = useSelector(
  state => state?.tokenAndMenuList?.userDetails?.companyCode,
 );
 const queryId = { PR: 85, ID: 90, PO: 86 };
 const createClaim = useApiRequests('createClaim', 'POST');
 const getPolicyList = useApiRequests('getPolicyList', 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const getClaimDetails = useApiRequests('getModernClaim', 'GET');
 const getPreClaimDate = useApiRequests('getPreClaimDate', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const [fieldName, setFieldName] = useState('Preclaim No');
 const [initialValues, setInitialValues] = useState({
  CH_CLAIM_TYPE: 'D',
  CH_CLAIM_BAS: 'PR',
  CH_CLAIM_BAS_VAL: '',
  CH_REF_NO: '',
  CH_LOSS_DT: '',
  CH_INTIM_DT: '',
  ASSURED_CODE: '',
 });
 const [selectDropDown, setSelectDropDown] = useState({
  CH_CLAIM_BAS_VAL: [],
  ASSURED_CODE: [],
 });

 const handleGetClaim = async () => {
  try {
   const response = await getClaimDetails('', { tranId });
   console.log('response : ', response);
   setInitialValues(response?.Data);
   handleGetPolicyList(response?.Data?.CH_TRAN_ID);
   //  handleGetPolicyList(55);
  } catch (err) {
   console.log('err');
  }
 };

 useEffect(() => {
  if (tranId) {
   handleGetClaim();
   console.log('tranId :  ', tranId);
  }
 }, []);

 const handleGetPolicyList = async tranId => {
  try {
   const response = await getPreClaimDate(
    { queryParams: { tranId } },
    { queryId: 117 },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setPolicyList(response?.Data);
    setelectedPolicy(response?.Data[0]?.CLM_POL_NO);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const claimSave = async values => {
  try {
   const response = await createClaim(values);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    // handleGetPolicyList(response?.Data?.Id);
    handleGetPolicyList(response?.Data?.Id);
    // response?.Data?.Id
    if (!tranId) dispatch(setCurrentID(response?.Data?.Id));
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   console.error('err : ', err);
  }
 };

 const onSubmit = async values => {
  const {
   CH_CLAIM_TYPE,
   CH_CLAIM_BAS,
   CH_CLAIM_BAS_VAL,
   CH_LOSS_DT,
   ASSURED_CODE,
  } = values;
  const payload = {
   inParams: {
    P_CLAIM_TYPE: CH_CLAIM_TYPE,
    P_CLAIM_BAS: CH_CLAIM_BAS,
    P_CLAIM_BAS_VAL: CH_CLAIM_BAS_VAL,
    P_LOSS_DT: CH_LOSS_DT,
    P_ASSR_CODE: ASSURED_CODE,
   },
  };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'P_VAL_ELIGIBLE_POL',
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    claimSave(values);
   }
  } catch (err) {
   console.error('err : ', err);
  }
 };

 const handleOnBlur = setFieldValue => {
  const { CH_CLAIM_BAS_VAL, CH_CLAIM_BAS, CH_CLAIM_TYPE } =
   formRef.current.values;
  if (CH_CLAIM_BAS === 'PR') {
   const payload = { CH_CLAIM_TYPE, CH_CLAIM_BAS_VAL };
   CH_CLAIM_BAS_VAL && handleGetPreClaimDate(payload, setFieldValue);
  } else if (CH_CLAIM_BAS !== 'PR') {
   const queryParams = {
    queryId: CH_CLAIM_BAS === 'ID' ? 88 : 89,
    ...(CH_CLAIM_BAS && { [CH_CLAIM_BAS]: CH_CLAIM_BAS_VAL }),
   };
   handleGetSelectValue(queryParams, 'ASSURED_CODE', setFieldValue);
  }
 };

 const handleGetPreClaimDate = async (payload, setFieldValue) => {
  try {
   const response = await getPreClaimDate(
    { queryParams: payload },
    { queryId: 87 },
   );
   if (response?.status === 'SUCCESS') {
    const { CH_INTIM_DT, CH_LOSS_DT, ASSURED_CODE } = response.Data[0];
    setFieldValue('CH_INTIM_DT', CH_INTIM_DT);
    setFieldValue('CH_LOSS_DT', CH_LOSS_DT);
    setFieldValue('ASSURED_CODE', ASSURED_CODE);
   }
  } catch (err) {
   console.error('err : ', err);
  }
 };

 const handleGetSelectValue = async (queryParams, key, setFieldValue) => {
  try {
   const response = await getParamLov({}, queryParams);
   if (response?.status === 'SUCCESS') {
    const list =
     key === 'ASSURED_CODE'
      ? response?.Data['ASSURED_CODE']
      : response?.Data[formRef?.current?.values?.CH_CLAIM_BAS];
    if (setFieldValue && list?.length === 1) {
     setFieldValue('ASSURED_CODE', list[0]?.value);
    }
    setSelectDropDown(pre => ({
     ...pre,
     [key]: list,
    }));
   }
  } catch (err) {
   console.error('err : ', err);
  }
 };

 const handleSearch = debounce(userInput => {
  if (userInput?.length > 0) {
   const queryParams = {
    queryId: queryId[formRef?.current?.values?.CH_CLAIM_BAS],
    userInput,
    COMP_CODE: companyCode,
   };
   handleGetSelectValue(queryParams, 'CH_CLAIM_BAS_VAL');
  }
 }, 100);

 return (
  <div>
   <div className='pl-1 mb-6 mt-1 grid grid-cols-2 gap-5 items-start'>
    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
     <div className='col-span-2'>
      <p className='header-font'>Claim Entry</p>
     </div>
    </div>
    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
     <div className='col-span-2'>
      <p className='ref_no'>Reference No</p>
     </div>
     <div className='col-span-4'>
      {/* <p className='ref_no_val'>
       C/008/8987 <span className='status_notify pending'>Not Submitted</span>
      </p> */}
      <p className='ref_no_val'>
       C/008/8987 <span className='status_notify approved'>Submitted</span>
      </p>
     </div>
    </div>
   </div>

   <Formik
    initialValues={initialValues}
    //validationSchema={validation}
    onSubmit={onSubmit}
    enableReinitialize={true}
    innerRef={formRef}>
    {({ handleSubmit, values, setFieldValue, resetForm }) => {
     return (
      <Form onSubmit={handleSubmit}>
       <div className='pl-1 mt-4 grid grid-cols-2 gap-5 items-start claim-type-form'>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Claim Type</p>
         </div>
         <div className='col-span-7'>
          <RadioChip
           main='CH_CLAIM_TYPE'
           items={platforms}
           selectedValue={values?.CH_CLAIM_TYPE}
           onSelectionChange={val => {
            !tranId && setFieldValue('CH_CLAIM_TYPE', val?.value);
           }}
          />
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Intimation Basis</p>
         </div>
         <div className='col-span-7'>
          <RadioChip
           main='CH_CLAIM_BAS'
           items={claim_check}
           selectedValue={values?.CH_CLAIM_BAS}
           onSelectionChange={val => {
            if (!tranId) {
             setFieldValue('CH_CLAIM_BAS_VAL', '');
             setFieldValue('ASSURED_CODE', '');
             setFieldName(val?.label);
             setFieldValue('CH_CLAIM_BAS', val?.value);
             setFieldValue('CH_LOSS_DT', '');
             setFieldValue(
              'CH_INTIM_DT',
              val?.value !== 'PR' ? dayjs().format('YYYY-MM-DD') : '',
             );
             setSelectDropDown({
              CH_CLAIM_BAS_VAL: [],
              ASSURED_CODE: [],
             });
            }
           }}
          />
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>{fieldName}</p>
         </div>
         <div className='col-span-4'>
          {tranId ? (
           <div className='flex items-center justify-between min-h-8 key_value_form'>
            <p className=''>{values?.CH_CLAIM_BAS_VAL}</p>
           </div>
          ) : (
           <CustomSelect
            name={fieldName}
            options={selectDropDown?.CH_CLAIM_BAS_VAL}
            onSearch={handleSearch}
            onBlur={() => handleOnBlur(setFieldValue)}
            placeholder=''
            value={values?.CH_CLAIM_BAS_VAL || undefined}
            onChange={e => {
             setFieldValue('CH_CLAIM_BAS_VAL', e);
            }}
           />
          )}
         </div>
        </div>
        {/* <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Reference No</p>
         </div>
         <div className='col-span-4'>
          {tranId ? (
           <div className='flex items-center justify-between min-h-8 key_value_form'>
            <p className=''>{values?.CH_REF_NO}</p>
           </div>
          ) : (
           <CustomInput
            name='CH_REF_NO'
            placeholder=''
            value={values?.CH_REF_NO}
            onChange={e => {
             setFieldValue('CH_REF_NO', e.target.value);
            }}
           />
          )}
         </div>
        </div> */}
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Loss Date</p>
         </div>
         <div className='col-span-4'>
          {tranId ? (
           <div className='flex items-center justify-between min-h-8 key_value_form'>
            <p className=''>
             {values?.CH_LOSS_DT
              ? dayjs(values?.CH_LOSS_DT).format('YYYY-MM-DD')
              : ''}
            </p>
           </div>
          ) : (
           <CustomDatePicker
            name='CH_LOSS_DT'
            placeholder='date'
            disabled={values?.CH_CLAIM_BAS === 'PR'}
            value={values?.CH_LOSS_DT}
            onChange={date => {
             setFieldValue('CH_LOSS_DT', date);
            }}
           />
          )}
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Intimation Date</p>
         </div>
         <div className='col-span-4'>
          {tranId ? (
           <div className='flex items-center justify-between min-h-8 key_value_form'>
            <p className=''>
             {values?.CH_INTIM_DT
              ? dayjs(values?.CH_INTIM_DT).format('YYYY-MM-DD')
              : ''}
            </p>
           </div>
          ) : (
           <CustomDatePicker
            name='CH_INTIM_DT'
            placeholder='date'
            disabled={true}
            value={values?.CH_INTIM_DT}
            onChange={date => {
             setFieldValue('CH_INTIM_DT', date);
            }}
           />
          )}
         </div>
        </div>
        {/* {values?.CH_CLAIM_BAS !== 'PR' && ( */}
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Assured Code</p>
         </div>
         <div className='col-span-4'>
          {tranId ? (
           <div className='flex items-center justify-between min-h-8 key_value_form'>
            <p className=''>{values?.ASSURED_CODE}</p>
           </div>
          ) : (
           <CustomSelect
            name={'assured_code'}
            options={selectDropDown?.ASSURED_CODE}
            placeholder='select'
            value={values?.ASSURED_CODE || undefined}
            onChange={e => {
             setFieldValue('ASSURED_CODE', e);
            }}
           />
          )}
         </div>
        </div>
        {/* )} */}
        {!tranId && (
         <div className='col-span-2 flex items-center justify-center'>
          <button type='submit' className='ok_button w-1/12'>
           OK
          </button>
         </div>
        )}
       </div>
      </Form>
     );
    }}
   </Formik>

   <Divider className='form-divide' />
  </div>
 );
};

export default ClaimSelect;
