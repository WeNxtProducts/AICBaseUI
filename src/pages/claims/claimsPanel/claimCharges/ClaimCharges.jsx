import React, { useContext, useState } from 'react';
import { ClaimStepperContext } from '../../Claims';
import CustomList from '../../../../components/customList/CustomList';
import claim from '../../../../getFormFields/claims.json';
import MainForm from '../../../../components/mainForm/MainForm';
import {
 bankColumn,
 bankData,
} from '../../../../components/tableComponents/sampleData';

const ClaimCharges = () => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useContext(ClaimStepperContext);
 const [claimChargesDetails, setClaimChargesDetails] = useState(claim);
 const [claimChargesInitialValues, setClaimChargesInitialValues] =
  useState(claim);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='front-form claim-charges grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-8'>
    <MainForm
     initialValues={claimChargesInitialValues}
     formRender={claimChargesDetails}
     root='claim_charges'
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

export default ClaimCharges;
