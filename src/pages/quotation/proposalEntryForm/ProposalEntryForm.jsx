import React, { useContext, useEffect, useState } from 'react';
import MainForm from '../../../components/mainForm/MainForm';
import { StepperContext } from '../Quotation';
import { sortObjectByPFDSeqNo } from './../../../components/commonHelper/SortBySequence';
import { setCurrentID, setFormValues } from '../../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';
import useApiRequests from '../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../components/commonHelper/DataSend';
import showNotification from '../../../components/notification/Notification';
import Loader from '../../../components/loader/Loader';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useSelector } from 'react-redux';
import useParamLov from '../../../components/useParamLov/useParamLov';
import { calculateDateAfterYears } from '../../../components/commonHelper/CurrentFormatter';

dayjs.extend(utc);

const ProposalEntryForm = () => {
 const dispatch = useDispatch();
 const {
  handleNext,
  id: tranId,
  QuotationJSON,
  dropDown,
  setDropDown,
  prodCode,
  proposalNumber,
  setProposalNumber,
  freeze,
  planCode,
  rules,
 } = useContext(StepperContext);
 const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
 const { onSearch } = useParamLov();
 const getQuotation = useApiRequests('getQuotation', 'GET');
 const saveQuotation = useApiRequests('saveProposalEntry', 'POST');
 const updateQuotation = useApiRequests('updateProposalEntry', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const [proposalEntry, setProposalEntry] = useState(null);
 const [proposalEntryInitialValues, setProposalEntryInitialValues] = useState(null);
 const [loader, setLoader] = useState(false);

 const dataAssign = orderedData => {
  setProposalEntryInitialValues({ frontForm: orderedData?.frontForm });
  setProposalEntry({ frontForm: orderedData?.frontForm });
  dispatch(setFormValues(orderedData));
 };

 const handleStateInit = value => {
  const orderedData = sortObjectByPFDSeqNo(value);
  if (!tranId) {
   if (orderedData?.frontForm?.formFields?.POL_UW_YEAR) {
    const updatedState = changeState(orderedData, 'POL_UW_YEAR', 'PFD_FLD_VALUE', dayjs()?.year());
    dataAssign(updatedState);
   }
  } else if (tranId) {
   const { POL_ASSR_CODE, POL_ASSURED_NAME, POL_CUST_NAME, POL_CUST_CODE, POL_ASSR_CUST_FLAG } =
    orderedData.frontForm.formFields;
   const flag = POL_ASSR_CUST_FLAG?.PFD_FLD_VALUE === 'Yes';
   let updatedState = orderedData;
   if (!flag) {
    const newState = {
     ...orderedData,
     frontForm: {
      ...orderedData.frontForm,
      formFields: {
       ...orderedData.frontForm.formFields,
       POL_ASSR_CODE: {
        ...orderedData.frontForm.formFields.POL_ASSR_CODE,
        PFD_MANDATORY_YN: true,
        PFD_EDIT_YN: true,
       },
      },
     },
    };
    updatedState = newState;
   }
   setDropDown(prev => ({
    ...prev,
    POL_ASSR_CODE: [
     { value: POL_ASSR_CODE?.PFD_FLD_VALUE, label: POL_ASSURED_NAME?.PFD_FLD_VALUE },
    ],
    POL_CUST_CODE: [{ value: POL_CUST_CODE?.PFD_FLD_VALUE, label: POL_CUST_NAME?.PFD_FLD_VALUE }],
   }));
   dataAssign(updatedState);
  }
 };

 const handleQuotationDetails = async () => {
  setLoader(true);
  const queryParams = {
   screenCode: 'QUOTATIONENTRY',
   screenName: 'QUOTATIONENTRY',
   tranId,
  };
  try {
   const response = await getQuotation('', queryParams);
   if (response?.status === 'SUCCESS') {
    setProposalNumber(response?.PROPOSAL_NO);
    handleStateInit(response?.Data);
   } else if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleQuotationDetails();
  else handleStateInit(QuotationJSON);
 }, []);

 const procedureCall = async data => {
  const { P_POL_END_NO_IDX = 0, Id: P_POL_TRAN_ID } = data;
  const { ds_type, ds_code } = currentMenuId;
  const payload = {
   inParams: {
    P_POL_PROD_CODE: prodCode || '',
    P_POL_DS_TYPE: ds_type || '',
    P_POL_DS_CODE: ds_code || '',
    P_POL_TRAN_ID,
    P_POL_ISSUE_DT: dayjs().format(`YYYY-MM-DD HH:mm:ss`),
    P_POL_END_NO_IDX: P_POL_END_NO_IDX || 0,
   },
  };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'POL_DEF_PROD_COVER',
    packageName: 'WNPKG_POLICY',
   });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') handleNext();
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const addOrUpdateClaim = async (payload, addOrUpdate) => {
  setLoader(true);
  const { ds_type, ds_code, POL_CLASS_CODE = '' } = currentMenuId;
  const inParams = {
   POL_PROD_CODE: prodCode || '',
   POL_DS_TYPE: ds_type || '',
   POL_DS_CODE: ds_code || '',
   POL_PLAN_CODE: planCode || '',
   POL_CLASS_CODE,
  };
  const mainLoad = { inParams, frontForm: payload?.frontForm };
  try {
   const response = await addOrUpdate(mainLoad, '', tranId && { tranId });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
    setLoader(false);
   }
   if (response?.status === 'SUCCESS') {
    if (!tranId) {
     setProposalNumber(response?.Data?.PROPOSAL_NO || '');
     dispatch(setCurrentID(response?.Data?.Id));
     procedureCall(response?.Data);
    } else if (tranId) {
     handleNext();
    }
    showNotification.SUCCESS(response?.status_msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const onSubmit = async values => {
  //handleNext();
  dispatch(setFormValues(values));
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const { frontForm } = modifiedData;
  const payload = { frontForm };
  addOrUpdateClaim(payload, tranId ? updateQuotation : saveQuotation);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values, currentData, col_name) => {
  setFieldValue(path, value);

  if (col_name === 'POL_FM_DT') {
   setFieldValue(
    'frontForm.formFields.POL_TO_DT.PFD_FLD_VALUE',
    calculateDateAfterYears(value, values?.frontForm.formFields.POL_PERIOD.PFD_FLD_VALUE),
   );
  }
 };

 const changeState = (preState, field, key, value) => {
  const newState = {
   ...preState,
   frontForm: {
    ...preState.frontForm,
    formFields: {
     ...preState.frontForm.formFields,
     [field]: {
      ...preState.frontForm.formFields[field],
      [key]: value,
     },
    },
   },
  };
  return newState;
 };

 const handleCust_code = (values, setFieldValue) => {
  const cust_code = values?.frontForm?.formFields?.POL_CUST_CODE?.PFD_FLD_VALUE;
  const cust_name = values?.frontForm?.formFields?.POL_CUST_NAME?.PFD_FLD_VALUE;
  setFieldValue(`frontForm.formFields.${'POL_ASSR_CODE'}.PFD_FLD_VALUE`, cust_code);
  setFieldValue(`frontForm.formFields.${'POL_ASSURED_NAME'}.PFD_FLD_VALUE`, cust_name);
  setDropDown(prev => ({
   ...prev,
   POL_ASSR_CODE: [{ value: cust_code, label: cust_name }],
  }));
 };

 const handleOnBlur = (currentData, values, setFieldValue, val, label) => {
  const key = currentData?.PFD_COLUMN_NAME;

  if (key === 'POL_CUST_CODE') {
   setFieldValue(`frontForm.formFields.${'POL_CUST_NAME'}.PFD_FLD_VALUE`, label);
   const flag = values?.frontForm?.formFields?.POL_ASSR_CUST_FLAG?.PFD_FLD_VALUE === 'Yes';
   if (flag) {
    handleCust_code(values, setFieldValue);
   }
  }

  if (key === 'POL_ASSR_CODE') {
   setFieldValue(`frontForm.formFields.${'POL_ASSURED_NAME'}.PFD_FLD_VALUE`, label);
  }

  if (key === 'POL_ASSR_CUST_FLAG') {
   const flag = values?.frontForm?.formFields?.POL_ASSR_CUST_FLAG?.PFD_FLD_VALUE === 'Yes';
   const updatedEdit = changeState(proposalEntry, 'POL_ASSR_CODE', 'PFD_EDIT_YN', !flag);
   const updatedState = changeState(updatedEdit, 'POL_ASSR_CODE', 'PFD_MANDATORY_YN', !flag);
   setProposalEntry(updatedState);
   if (flag) {
    handleCust_code(values, setFieldValue);
   }
  }

  if (key === 'POL_PERIOD') {
   if (values?.frontForm.formFields.POL_FM_DT.PFD_FLD_VALUE) {
    setFieldValue(
     'frontForm.formFields.POL_TO_DT.PFD_FLD_VALUE',
     calculateDateAfterYears(values?.frontForm.formFields.POL_FM_DT.PFD_FLD_VALUE, val),
    );
   }
  }

  if (key === 'POL_SRC_OF_BUS') {
   const srcId = Number(values?.frontForm?.formFields?.POL_SRC_OF_BUS?.PFD_FLD_VALUE);
   const updatedState = changeState(
    proposalEntry,
    'POL_AGENT_CODE',
    'PFD_MANDATORY_YN',
    srcId === 75,
   );
   setProposalEntry(updatedState);
  }

  if (key === 'POL_MODE_OF_PYMT') {
   setFieldValue(
    `frontForm.formFields.${'POL_NO_OF_INST'}.PFD_FLD_VALUE`,
    rules?.POL_MODE_OF_PYMT[val],
    val,
   );
  }
 };

 const handleOnSearch = async (currentData, values, setFieldValue, val) => {
  const key = currentData?.PFD_COLUMN_NAME;
  if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_4')) {
   if (['POL_CUST_CODE', 'POL_AGENT_CODE', 'POL_ASSR_CODE'].includes(key)) {
    if (val?.length > 0) {
     const response = await onSearch(currentData?.PFD_PARAM_4, val);
     setDropDown(prev => ({
      ...prev,
      [key]: response?.Data?.[key],
     }));
    }
   }
  }
 };

 return (
  <div>
   {loader && <Loader />}
   <div className='flex items-center pl-1'>
    <p className='header-font'>{`Proposal Entry`}</p>
    {proposalNumber && <p className='pol-number ml-10'>{`${proposalNumber}`}</p>}
   </div>
   {proposalEntry !== null && (
    <div className='mt-3 mb-5'>
     <MainForm
      initialValues={proposalEntryInitialValues}
      formRender={proposalEntry}
      root='frontForm'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      addOrUpdate={!!tranId}
      lovList={dropDown}
      freeze={freeze}
      handleOnBlur={handleOnBlur}
      handleOnSearch={handleOnSearch}
     />
    </div>
   )}
  </div>
 );
};

export default ProposalEntryForm;
