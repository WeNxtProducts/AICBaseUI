/* eslint-disable no-prototype-builtins */
import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../components/customList/CustomList';
import { StepperContext } from '../../Quotation';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import useApiRequests from '../../../../services/useApiRequests';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import MRVform from '../../../../components/mrvForm/MRVform';

const Beneficiary = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  QuotationJSON,
  formData,
  id: tranId,
 } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [beneficiaryDetails, setBeneficiaryDetails] = useState(QuotationJSON);
 const [beneficiaryInitialValues, setBeneficiaryInitialValues] = useState(null);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 useEffect(() => {
  if (tranId) {
   const queryId = getQueryId('Benificiary', mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 }, []);

 const handleEdit = item => {
  // console.log('handleEdit : ', item);
  setBeneficiaryInitialValues(item);
 };

 const resetForm = () => {
  setBeneficiaryInitialValues(null);
 };

 return (
  <div className='front-form beneficiary grid grid-cols-8 gap-1'>
   {rowData?.length > 0 && (
    <div className='inline-table-details mb-1 mt-2 col-span-8'>
     <CustomList
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
     />
    </div>
   )}
   {beneficiaryDetails?.hasOwnProperty('benificiary') && (
    <div className='propasal-entry-form col-span-8'>
     <MRVform
      initialValues={beneficiaryInitialValues}
      formRender={beneficiaryDetails}
      root='benificiary'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default Beneficiary;
