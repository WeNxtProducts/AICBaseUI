import React, { useContext, useState } from 'react';
import { Divider } from 'antd';
import { useDispatch } from 'react-redux';
import RadioChip from '../../../components/radioChip/RadioChip';
import { claim_check, platforms } from '../../../components/tableComponents/sampleData';
import {
 CustomDatePicker,
 CustomInput,
} from '../../../components/commonExportsFields/CommonExportsFields';
import { Form, Formik } from 'formik';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { ClaimContext } from '../ModernClaim';
import { setCurrentID } from '../../../globalStore/slices/IdSlices';

const ClaimSelect = () => {
 const { id: tranId, setPolicyList } = useContext(ClaimContext);
 const dispatch = useDispatch();
 const createClaim = useApiRequests('createClaim', 'POST');
 const getPolicyList = useApiRequests('getPolicyList', 'GET');
 const [fieldName, setFieldName] = useState('Preclaim No');
 const [initialValues, setInitialValues] = useState({
  CH_CLAIM_TYPE: 'death',
  CH_CLAIM_BAS: 'preclaimNo',
  CH_CLAIM_BAS_VAL: '',
  CH_REF_NO: '',
  CH_LOSS_DT: '',
  CH_INTIM_DT: '',
 });

 const handleGetPolicyList = async sysId => {
  try {
   const response = await getPolicyList('', { sysId: 16 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setPolicyList(response?.Data?.Policy_Numbers);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const onSubmit = async values => {
  try {
   const response = await createClaim(values);
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handleGetPolicyList(response?.Data?.Id);
    if (!tranId) dispatch(setCurrentID(response?.Data?.Id));
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 return (
  <div>
   <p className='header-font pl-1'>Claim Entry</p>
   <Formik
    initialValues={initialValues}
    //validationSchema={validation}
    onSubmit={onSubmit}
    enableReinitialize={true}>
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
            setFieldValue('CH_CLAIM_TYPE', val?.value);
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
            setFieldValue('CH_CLAIM_BAS_VAL', '');
            setFieldName(val?.label);
            setFieldValue('CH_CLAIM_BAS', val?.value);
           }}
          />
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>{fieldName}</p>
         </div>
         <div className='col-span-4'>
          <CustomInput
           name={fieldName}
           placeholder=''
           value={values?.CH_CLAIM_BAS_VAL}
           onChange={e => {
            setFieldValue('CH_CLAIM_BAS_VAL', e.target.value);
           }}
          />
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Reference No</p>
         </div>
         <div className='col-span-4'>
          <CustomInput
           name='CH_REF_NO'
           placeholder=''
           value={values?.CH_REF_NO}
           onChange={e => {
            setFieldValue('CH_REF_NO', e.target.value);
           }}
          />
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Loss Date</p>
         </div>
         <div className='col-span-4'>
          <CustomDatePicker
           name='CH_LOSS_DT'
           placeholder='date'
           value={values?.CH_LOSS_DT}
           onChange={date => {
            setFieldValue('CH_LOSS_DT', date);
           }}
          />
         </div>
        </div>
        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
         <div className='col-span-2'>
          <p className='chip-label'>Inti Date</p>
         </div>
         <div className='col-span-4'>
          <CustomDatePicker
           name='CH_INTIM_DT'
           placeholder='date'
           value={values?.CH_INTIM_DT}
           onChange={date => {
            setFieldValue('CH_INTIM_DT', date);
           }}
          />
         </div>
        </div>

        <div className='col-span-2 flex items-center justify-center'>
         <button type='submit' className='ok_button w-1/12'>
          OK
         </button>
        </div>
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
