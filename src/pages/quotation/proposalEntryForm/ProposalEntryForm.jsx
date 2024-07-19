import React, { useContext, useEffect, useState } from 'react';
import MainForm from '../../../components/mainForm/MainForm';
import { StepperContext } from '../Quotation';
import { sortObjectByPFDSeqNo } from './../../../components/commonHelper/SortBySequence';
import {
 setCurrentID,
 setFormValues,
} from '../../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';
import useApiRequests from '../../../services/useApiRequests';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../components/commonHelper/DataSend';
import showNotification from '../../../components/notification/Notification';
import Loader from '../../../components/loader/Loader';

const ProposalEntryForm = () => {
 const dispatch = useDispatch();
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  id: tranId,
  QuotationJSON,
  setDropDown,
  dropDown,
 } = useContext(StepperContext);
 const getQuotation = useApiRequests('getQuotation', 'GET');
 const saveQuotation = useApiRequests('saveProposalEntry', 'POST');
 const updateQuotation = useApiRequests('updateProposalEntry', 'POST');
 const [proposalEntry, setProposalEntry] = useState(null);
 const [proposalEntryInitialValues, setProposalEntryInitialValues] =
  useState(null);
 const [loader, setLoader] = useState(false);

 const handleStateInit = value => {
  const orderedData = sortObjectByPFDSeqNo(value);
  setProposalEntryInitialValues({ frontForm: orderedData?.frontForm });
  setProposalEntry({ frontForm: orderedData?.frontForm });
  dispatch(setFormValues(orderedData));
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
   if (response?.status === 'SUCCESS') handleStateInit(response?.Data);
   else if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleQuotationDetails();
  else handleStateInit(QuotationJSON);
 }, []);

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const addOrUpdateClaim = async (payload, addOrUpdate) => {
  setLoader(true);
  try {
   const response = await addOrUpdate(payload, '', tranId && { tranId });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    // handleNext();
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
  addOrUpdateClaim(payload, tranId ? updateQuotation : saveQuotation);
 };

 return (
  <div>
   {loader && <Loader />}
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Propasal Entry</p>
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
      //handleOnBlur={handleOnBlur}
     />
    </div>
   )}
  </div>
 );
};

export default ProposalEntryForm;
