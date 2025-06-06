import React, { useContext, useState } from 'react';
import CustomList from '../../../../components/customList/CustomList';
import claim from '../../../../getFormFields/claims.json';
import { ClaimStepperContext } from '../../Claims';
import MainForm from '../../../../components/mainForm/MainForm';
import { bankColumn, bankData } from '../../../../components/tableComponents/sampleData';

const ClaimDecision = () => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useContext(ClaimStepperContext);
 const [claimDecisionDetails, setClaimDecisionDetails] = useState(claim?.accordions);
 const [claimDecisionInitialValues, setClaimDecisionInitialValues] = useState(claim?.accordions);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='front-form claim-decision grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-8'>
    <MainForm
     initialValues={claimDecisionInitialValues}
     formRender={claimDecisionDetails}
     root='claim_decision'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
    />
   </div>
   <div className='inline-table-details mb-1 col-span-8'>
    <CustomList tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default ClaimDecision;
