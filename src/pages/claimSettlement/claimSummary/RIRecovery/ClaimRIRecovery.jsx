import React, { useState } from 'react';
import QuotationJSON from '../../../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import CustomList from '../../../../components/customList/CustomList';
import { bankColumn, bankData } from '../../../../components/tableComponents/sampleData';
import MRVform from '../../../../components/mrvForm/MRVform';

const ClaimRIRecovery = () => {
 const [claimRIDetails, setClaimRIDetails] = useState(QuotationJSON);
 const [claimRIInitialValues, setClaimRIInitialValues] = useState(null);

 const onSubmit = values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const handleEdit = item => {
  console.log('handleEdit : ', item);
  setClaimRIInitialValues(item);
 };

 const resetForm = () => {
  setClaimRIInitialValues(null);
 };

 return (
  <div className='ri-estimate'>
   <div className='inline-table-details mt-1'>
    <CustomList tableColumn={bankColumn} tableData={bankData} handleEdit={handleEdit} />
   </div>
   <div className='mt-2'>
    <MRVform
     initialValues={claimRIInitialValues}
     formRender={claimRIDetails}
     root='Discount_Loading'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
     isSubmit={false}
    />
   </div>
  </div>
 );
};

export default ClaimRIRecovery;
