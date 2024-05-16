import React, { useState } from 'react';
import QuotationJSON from '../../../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import CustomList from '../../../../components/customList/CustomList';
import {
 bankColumn,
 bankData,
} from '../../../../components/tableComponents/sampleData';
import MRVform from '../../../../components/mrvForm/MRVform';

const RIEstimate = () => {
 const [estimateDetails, setEstimateDetails] = useState(QuotationJSON);
 const [estimateInitialValues, setEstimateInitialValues] = useState(null);

 const onSubmit = values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const handleEdit = item => {
  console.log('handleEdit : ', item);
  setEstimateInitialValues(item);
 };

 const resetForm = () => {
  setEstimateInitialValues(null);
 };

 return (
  <div className='ri-estimate'>
   <div className='inline-table-details mt-1'>
    <CustomList
     tableColumn={bankColumn}
     tableData={bankData}
     handleEdit={handleEdit}
    />
   </div>
   <div className='mt-2'>
    <MRVform
     initialValues={estimateInitialValues}
     formRender={estimateDetails}
     root='Charges'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
     isSubmit={false}
    />
   </div>
  </div>
 );
};

export default RIEstimate;
