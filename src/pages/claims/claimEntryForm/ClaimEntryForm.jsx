import React, { useContext, useEffect, useState } from 'react';
import { ClaimStepperContext } from '../Claims';
import MainForm from '../../../components/mainForm/MainForm';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import Loader from '../../../components/loader/Loader';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from './../../../components/commonHelper/DataSend';
import showNotification from '../../../components/notification/Notification';
import useApiRequests from '../../../services/useApiRequests';
import {
 setCurrentID,
 setFormValues,
} from '../../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';
import {
 extractValues,
 mergeDropdownData,
} from '../../../components/commonHelper/ParamLov';

const ClaimEntryForm = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  ClaimsJson,
  ClaimsLOVJson,
  id: tranId,
  setDropDown,
  dropDown,
  formValues,
 } = useContext(ClaimStepperContext);
 const dispatch = useDispatch();
 const [claimEntry, setClaimEntry] = useState(null);
 const [claimEntryInitialValues, setClaimEntryInitialValues] = useState(null);
 const [loader, setLoader] = useState(false);
 const createClaim = useApiRequests('createClaim', 'POST');
 const updateClaim = useApiRequests('updateClaim', 'POST');
 const getClaim = useApiRequests('getClaim', 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');

 const handleStateInit = (value, isEdit) => {
  const orderedData = sortObjectByPFDSeqNo(value);
  setClaimEntryInitialValues(isEdit ? orderedData : null);
  setClaimEntry(orderedData);
  // setClaimEntry({ frontForm: orderedData?.frontForm });
  dispatch(setFormValues(orderedData));
 };

 const handleGetClaim = async () => {
  setLoader(true);
  try {
   const response = await getClaim('', {
    screenCode: 'CLAIMENTRY',
    screenName: 'CLAIMENTRY',
    tranId,
   });
   handleStateInit(response, true);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleGetClaim();
  else handleStateInit(ClaimsJson, false);
 }, []);

 const addOrUpdateClaim = async (payload, addOrUpdate) => {
  try {
   const response = await addOrUpdate(payload, '', tranId && { tranId });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handleNext();
    if (!tranId) dispatch(setCurrentID(response?.data?.Id));
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
  addOrUpdateClaim(payload, tranId ? updateClaim : createClaim);
 };

 const handleChangeValue = (
  value,
  path,
  setFieldValue,
  parent,
  values,
  currentData,
 ) => {
  setFieldValue(path, value);
 };

 const apiCallsParamLov = (PFD_PARAM_2, valueKey, valueQueryId) => {
  const promises = PFD_PARAM_2.map(item => {
   const queryParams = { queryId: valueQueryId[item], ...valueKey };
   return getParamLov('', queryParams);
  });

  Promise.all(promises)
   .then(responses => {
    if (responses[0].status === 'SUCCESS') {
     const mergedData = mergeDropdownData(responses);
     setDropDown(prevDropdown => {
      return { ...prevDropdown, ...mergedData };
     });
    }
   })
   .catch(error => {
    console.error(error);
   });
 };

 const handleOnBlur = (currentData, values) => {
  if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_2')) {
   const PFD_PARAM_2 = currentData?.PFD_PARAM_2.split(',');
   const PFD_PARAM_3 = currentData?.PFD_PARAM_3.split(',');
   const valueKey = extractValues(PFD_PARAM_3, values, 'PFD_FLD_VALUE');
   const valueQueryId = extractValues(PFD_PARAM_2, formValues, 'PFD_PARAM_1');
   apiCallsParamLov(PFD_PARAM_2, valueKey, valueQueryId);
  }
 };

 return (
  <div>
   {loader && <Loader />}
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Claim Entry</p>
   </div>
   {claimEntry !== null && (
    <div className='mt-3 mb-5'>
     <MainForm
      initialValues={claimEntryInitialValues}
      formRender={claimEntry}
      root='frontForm'
      lovList={dropDown}
      addOrUpdate={!!tranId}
      onSubmit={onSubmit}
      handleOnBlur={handleOnBlur}
      handleChangeValue={handleChangeValue}
     />
    </div>
   )}
  </div>
 );
};

export default ClaimEntryForm;
