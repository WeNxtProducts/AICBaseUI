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
import { setCurrentID } from '../../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';

const ClaimEntryForm = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  ClaimsJson,
  id: tranId,
 } = useContext(ClaimStepperContext);
 const dispatch = useDispatch();
 const [claimEntry, setClaimEntry] = useState(null);
 const [claimEntryInitialValues, setClaimEntryInitialValues] = useState(null);
 const [loader, setLoader] = useState(false);
 const createClaim = useApiRequests('createClaim', 'POST');
 const updateClaim = useApiRequests('updateClaim', 'POST');
 const getClaim = useApiRequests('getClaim', 'GET');

 const handleStateInit = value => {
  const orderedData = sortObjectByPFDSeqNo(value);
  setClaimEntryInitialValues({ frontForm: orderedData?.frontForm });
  setClaimEntry({ frontForm: orderedData?.frontForm });
 };

 const handleGetClaim = async () => {
  setLoader(true);
  try {
   const response = await getClaim('', {
    screenCode: 'CLAIMENTRY',
    screenName: 'CLAIMENTRY',
    tranId,
   });
   handleStateInit(response);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleGetClaim();
  else handleStateInit(ClaimsJson);
 }, []);

 const addOrUpdateClaim = async (payload, addOrUpdate) => {
  try {
   const response = await addOrUpdate(payload, '', tranId && { tranId });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    if (!tranId) dispatch(setCurrentID(response?.data?.Id));
    showNotification.SUCCESS(response?.status_msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const onSubmit = async values => {
  // handleNext();
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const { frontForm } = modifiedData;
  const payload = { frontForm };
  addOrUpdateClaim(payload, tranId ? updateClaim : createClaim);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const resetForm = () => {
  handleStateInit(ClaimsJson);
 };

 return (
  <div>
   {loader && <Loader />}
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Claim Entry</p>
   </div>
   {claimEntryInitialValues !== null && (
    <div className='mt-3 mb-5'>
     <MainForm
      initialValues={claimEntryInitialValues}
      formRender={claimEntry}
      root='frontForm'
      addOrUpdate={!!tranId}
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default ClaimEntryForm;
