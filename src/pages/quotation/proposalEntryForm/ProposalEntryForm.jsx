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
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useSelector } from 'react-redux';

dayjs.extend(utc);

const ProposalEntryForm = () => {
 const dispatch = useDispatch();
 const {
  handleNext,
  id: tranId,
  QuotationJSON,
  dropDown,
  prodCode,
  proposalNumber,
  setProposalNumber,
  freeze,
 } = useContext(StepperContext);
 const currentMenuId = useSelector(
  state => state?.tokenAndMenuList?.currentMenuId,
 );
 const getQuotation = useApiRequests('getQuotation', 'GET');
 const saveQuotation = useApiRequests('saveProposalEntry', 'POST');
 const updateQuotation = useApiRequests('updateProposalEntry', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
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
   if (response?.status === 'SUCCESS') {
    setProposalNumber(response?.PROPOSAL_NO);
    handleStateInit(response?.Data);
   } else if (response?.status === 'FAILURE')
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
  try {
   const response = await addOrUpdate(payload, '', tranId && { tranId });
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

 return (
  <div>
   {loader && <Loader />}
   <div className='flex items-center pl-1'>
    <p className='header-font'>{`Propasal Entry`}</p>
    {proposalNumber && (
     <p className='pol-number ml-10'>{`${proposalNumber}`}</p>
    )}
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
      //handleOnBlur={handleOnBlur}
     />
    </div>
   )}
  </div>
 );
};

export default ProposalEntryForm;
