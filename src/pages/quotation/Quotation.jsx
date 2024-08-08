import React, { createContext, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProposalEntry from './proposalEntryForm/ProposalEntry';
import QuotationPanels from './quotationPanels/QuotationPanels';
import useStepper from '../../components/customStepper/useStepper';
import CustomStepper from '../../components/customStepper/CustomStepper';
import { proposalStepper } from '../../components/tableComponents/sampleData';
import Loader from '../../components/loader/Loader';
import QuotationJSON from '../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import QuotationLov from '../../getFormFields/QUOTATIONENTRY_getLOVList.json';
import UnderWriterWorkBench from '../underWriterWorkBench/UnderWriterWorkBench';
import {
 setCurrentID,
 setFormValues,
 setFreezeStatus,
 setProdCode,
} from '../../globalStore/slices/IdSlices';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import StatusPopup from '../../components/statusPopup/StatusPopup';
import './Quotations.scss';

export const StepperContext = createContext();

const Quotation = () => {
 const { id: stepperId } = { id: Number(useParams().id) };
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const updateProposalStepperStatus = useApiRequests(
  'updateProposalStepperStatus',
  'POST',
 );
 const updateProposalFreezeStatus = useApiRequests(
  'updateProposalFreezeStatus',
  'POST',
 );
 const [lastUpdatedStep, setLastUpdatedStep] = useState(0);
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  getNextKey,
 } = useStepper(proposalStepper, stepperId);
 const id = useSelector(state => state?.id?.id);
 const freeze = useSelector(state => state?.id?.freezeStatus);
 const prodCode = useSelector(state => state?.id?.prodCode);
 const planCode = useSelector(state => state?.id?.planCode);
 const [loader, setLoader] = useState(false);
 const [showUnderWriter, setShowUnderWriter] = useState(false);
 const [dropDown, setDropDown] = useState(QuotationLov);
 const [proposalNumber, setProposalNumber] = useState('');
 const [successPopup, setSuccessPopup] = useState(false);

 const handleSkipStep = index => {
  handleSkip(index);
 };

 useEffect(() => {
  return () => {
   dispatch(setCurrentID(''));
   dispatch(setProdCode(''));
   dispatch(setFormValues(null));
   dispatch(setFreezeStatus(false));
  };
 }, []);

 const stepperUpdate = async flag => {
  const queryParams = { flag, tranId: id };
  try {
   const response = await updateProposalStepperStatus('', queryParams);
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    setLastUpdatedStep(flag);
   }
  } catch (err) {
   //console.log('err : ', err);
  }
 };

 const freezeUpdate = async flag => {
  const queryParams = { flag: flag ? 'Y' : 'N', tranId: id };
  try {
   const response = await updateProposalFreezeStatus('', queryParams);
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    showNotification.SUCCESS(response?.status_msg);
    dispatch(setFreezeStatus(flag));
   }
  } catch (err) {
   //console.log('err : ', err);
  }
 };

 useEffect(() => {
  if (id) {
   const flag = getNextKey(stepperData);
   if (flag > 0 && lastUpdatedStep !== flag) stepperUpdate(flag);
  }
 }, [stepperData, id]);

 const data = {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  id,
  QuotationJSON,
  setShowUnderWriter,
  setDropDown,
  dropDown,
  prodCode,
  proposalNumber,
  setProposalNumber,
  freeze,
  planCode,
 };

 const procedureCall = async () => {
  setLoader(true);
  const payload = { inParams: { P_POL_TRAN_ID: id } };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'PREM_CALC',
    packageName: 'WNPKG_PREM_CALC',
   });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    console.log('response : ', response);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const handleClose = () => {
  setSuccessPopup(false);
 };

 return (
  <StepperContext.Provider value={data}>
   {loader && <Loader />}
   <div className='quotation'>
    {showUnderWriter ? (
     <UnderWriterWorkBench
      fromQuotation={true}
      setShowUnderWriter={setShowUnderWriter}
     />
    ) : (
     <>
      <div className='stepper'>
       <CustomStepper
        currentStep={currentStep}
        stepperData={stepperData}
        handleSkip={handleSkipStep}
       />
      </div>

      <div
       onClick={() => navigate('/quotationList')}
       className='flex items-center mb-1 back-button-usercreation-decision'>
       <i className='bi bi-arrow-left-short' />
       <p>Back</p>
      </div>
      <div className='main-screen mt-0'>
       <ProposalEntry />
       <div className='mt-3'>
        <QuotationPanels />
       </div>
       <div className='mt-6 mb-7'>
        <Checkbox
         className='custom-checkbox pl-2'
         checked={freeze}
         onChange={e => freezeUpdate(e.target.checked)}>
         <span className='freeze_style'>Freeze All Changes</span>
        </Checkbox>
        <div className='flex justify-center'>
         <Button
          disabled={!freeze}
          className='prem_btn'
          onClick={() => procedureCall()}>
          Prem Calc
         </Button>
         <Button
          disabled={!freeze}
          className='sub_btn'
          onClick={() => setSuccessPopup(true)}>
          Submit
         </Button>
        </div>
       </div>
      </div>
      {successPopup && (
       <StatusPopup
        open={successPopup}
        handleClose={handleClose}
        status={true}
       />
      )}
     </>
    )}
   </div>
  </StepperContext.Provider>
 );
};

export default Quotation;
