import React, { createContext, useEffect, useState } from 'react';
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
import './Quotations.scss';

export const StepperContext = createContext();

const Quotation = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useStepper(proposalStepper);
 const id = useSelector(state => state?.id?.id);
 const [loader, setLoader] = useState(false);
 const [showUnderWriter, setShowUnderWriter] = useState(false);
 const [dropDown, setDropDown] = useState(QuotationLov);
 const flag = 'completed';

 const handleSkipStep = index => {
  handleSkip(index);
 };

 useEffect(() => {
  //   console.log('id : ', id);
  const panel = document.querySelector(`[data-id='panel-${currentStep}']`);
  if (panel) {
   setTimeout(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, 300);
  }
 }, [currentStep]);

 const data = {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  id,
  QuotationJSON,
  setShowUnderWriter,
  flag,
  setDropDown,
  dropDown,
 };

 return (
  <StepperContext.Provider value={data}>
   {/* <SchemavalidationCheck /> */}
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
       className='flex items-center mb-2 back-button-usercreation-decision'>
       <i className='bi bi-arrow-left-short' />
       <p>Back</p>
      </div>
      <div className='main-screen mt-4'>
       <ProposalEntry />
       <div className='mt-3'>
        <QuotationPanels />
       </div>
      </div>
     </>
    )}
   </div>
  </StepperContext.Provider>
 );
};

export default Quotation;
