import React, { createContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
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
 setProdCode,
} from '../../globalStore/slices/IdSlices';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import StatusPopup from '../../components/statusPopup/StatusPopup';
import './Quotations.scss';

export const StepperContext = createContext();

const Quotation = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const [stepperIndex, setStepperIndex] = useState(5);
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useStepper(proposalStepper, stepperIndex);
 const id = useSelector(state => state?.id?.id);
 const prodCode = useSelector(state => state?.id?.prodCode);
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
  };
 }, []);

 useEffect(() => {
  console.log('stepperData : ', stepperData);
 }, [stepperData]);

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
 };

 const procedureCall = async () => {
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
       <div className='mt-10 mb-7 flex justify-center'>
        <Button className='prem_btn' onClick={() => procedureCall()}>
         Prem Calc
        </Button>
        <Button className='sub_btn' onClick={() => setSuccessPopup(true)}>
         Submit
        </Button>
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
