import React, { createContext, useEffect } from 'react';
import CustomStepper from '../../components/customStepper/CustomStepper';
import useStepper from '../../components/customStepper/useStepper';
import { claimsStepper } from '../../components/tableComponents/sampleData';
import ClaimEntry from './claimEntryForm/ClaimEntry';
import ClaimsPanel from './claimsPanel/ClaimsPanel';
import ClaimsJson from '../../getFormFields/CLAIMENTRY_getFieldList.json';
import ClaimsLOVJson from '../../getFormFields/CLAIMENTRY_getLOVList.json';
import { useSelector } from 'react-redux';
import './Claims.scss';
// import '../../styles/components/Quotation.scss';

export const ClaimStepperContext = createContext();

const Claims = () => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useStepper(claimsStepper);
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);

 const handleSkipStep = index => {
  handleSkip(index);
 };

 const data = {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  ClaimsJson,
  id,
  ClaimsLOVJson,
  formValues,
 };

 useEffect(() => {
  console.log('id : ', id);
  const panel = document.querySelector(`[data-id='panel-${currentStep}']`);
  if (panel) {
   setTimeout(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, 300);
  }
 }, [currentStep]);

 return (
  <ClaimStepperContext.Provider value={data}>
   <div className='claims quotation'>
    <div className='stepper'>
     <CustomStepper
      currentStep={currentStep}
      stepperData={stepperData}
      handleSkip={handleSkipStep}
     />
    </div>
    <div className='main-screen mt-4'>
     <ClaimEntry />
     <div className='mt-3'>
      <ClaimsPanel />
     </div>
    </div>
   </div>
  </ClaimStepperContext.Provider>
 );
};

export default Claims;
