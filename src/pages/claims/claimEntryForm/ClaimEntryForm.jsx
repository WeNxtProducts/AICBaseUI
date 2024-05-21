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

 const handleStateInit = value => {
  console.log('value : ', value);
  const orderedData = sortObjectByPFDSeqNo(value);
  setClaimEntryInitialValues(orderedData);
  setClaimEntry(orderedData);
 };

 const handleGetClaim = async () => {
  setLoader(true);
  try {
   const response = await getCustomerMaster('', {
    screenCode: 'CUSTOMERMASTER',
    screenName: 'CUSTCREATE',
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

 const onSubmit = async values => {
  //   handleNext();
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const { frontForm } = modifiedData;
  const payload = { frontForm };
  try {
   const response = await createClaim(payload);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    dispatch(setCurrentID(response?.data?.Id));
    showNotification.SUCCESS(response?.status_msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
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
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
     />
    </div>
   )}
  </div>
 );
};

export default ClaimEntryForm;
