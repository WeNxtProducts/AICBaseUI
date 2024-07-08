import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import MRVform from '../../../../../components/mrvForm/MRVform';

const Charges = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  QuotationJSON,
  id: tranId,
  formData,
 } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [chargesDetails, setChargesDetails] = useState(QuotationJSON);
 const [chargesDetailsInitialValues, setChargesDetailsInitialValues] =
  useState(null);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 useEffect(() => {
  if (tranId) {
   const queryId = getQueryId('chargs_dis-load_Conditions', mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 }, []);

 const handleEdit = item => {
  console.log('handleEdit : ', item);
  setChargesDetailsInitialValues(item);
 };

 const resetForm = () => {
  setChargesDetailsInitialValues(null);
 };

 return (
  <div className='charges front-form'>
   <div className='form-name'>
    <p>Charges details</p>
   </div>
   {rowData?.length > 0 && (
    <div className='inline-table-details mb-1 mt-2 col-span-8'>
     <CustomList
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
     />
    </div>
   )}
   {chargesDetails?.hasOwnProperty('Charges') && (
    <div className='propasal-entry-form col-span-8'>
     <MRVform
      initialValues={chargesDetailsInitialValues}
      formRender={chargesDetails}
      root='Charges'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default Charges;
