import React, { useContext, useState } from 'react';
import CustomList from '../../../../components/customList/CustomList';
import { ClaimStepperContext } from '../../Claims';
import claim from '../../../../getFormFields/claims.json';
import MainForm from '../../../../components/mainForm/MainForm';
import { bankColumn, bankData } from '../../../../components/tableComponents/sampleData';

const CheckList = () => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useContext(ClaimStepperContext);
 const [checklistDetails, setChecklistDetails] = useState(claim?.accordions);
 const [checklistInitialValues, setChecklistInitialValues] = useState(
  claim?.accordions,
 );

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='checklist front-form'>
   <div className='propasal-entry-form col-span-8'>
    <MainForm
     initialValues={checklistInitialValues}
     formRender={checklistDetails}
     root='checkList'
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

export default CheckList;
