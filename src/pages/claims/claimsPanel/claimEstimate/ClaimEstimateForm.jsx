import React, { useContext, useState } from 'react';
import { ClaimStepperContext } from '../../Claims';
import claim from '../../../../getFormFields/claims.json';
import MainForm from '../../../../components/mainForm/MainForm';

const ClaimEstimateForm = () => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useContext(ClaimStepperContext);
 const [claimEstimateDetails, setClaimEstimateDetails] = useState(claim?.accordions);
 const [claimEstimateInitialValues, setClaimEstimateInitialValues] = useState(claim?.accordions);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='claim-estimate'>
   <MainForm
    initialValues={claimEstimateInitialValues}
    formRender={claimEstimateDetails}
    root='claim_estimate'
    onSubmit={onSubmit}
    handleChangeValue={handleChangeValue}
   />
  </div>
 );
};

export default ClaimEstimateForm;
