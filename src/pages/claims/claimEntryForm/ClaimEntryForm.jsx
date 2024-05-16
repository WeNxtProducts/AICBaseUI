import React, { useContext, useState } from 'react';
import { ClaimStepperContext } from '../Claims';
import MainForm from '../../../components/mainForm/MainForm';

const ClaimEntryForm = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  ClaimsJson,
 } = useContext(ClaimStepperContext);
 const [claimEntry, setClaimEntry] = useState(ClaimsJson);
 const [claimEntryInitialValues, setClaimEntryInitialValues] = useState(ClaimsJson);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div>
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Claim Entry</p>
   </div>
   <div className='mt-3 mb-5'>
    {/* <ClaimFormFields
     claimEntry={claimEntry}
     claimEntryInitialValues={claimEntryInitialValues}
    /> */}
    <MainForm
     initialValues={claimEntryInitialValues}
     formRender={claimEntry}
     root='frontForm'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
    />
   </div>
  </div>
 );
};

export default ClaimEntryForm;
