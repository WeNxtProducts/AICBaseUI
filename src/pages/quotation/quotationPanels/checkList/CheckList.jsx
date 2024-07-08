import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../components/customList/CustomList';
import { StepperContext } from '../../Quotation';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import MRVform from '../../../../components/mrvForm/MRVform';

const CheckList = () => {
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
 const [checklistDetails, setChecklistDetails] = useState(QuotationJSON);
 const [checklistInitialValues, setChecklistInitialValues] = useState(null);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 useEffect(() => {
  if (tranId) {
   const queryId = getQueryId('CheckList', mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 }, []);

 const handleEdit = item => {
  console.log('handleEdit : ', item);
  setChecklistInitialValues(item);
 };

 const resetForm = () => {
  setChecklistInitialValues(null);
 };

 return (
  <div className='checklist front-form'>
   {rowData?.length > 0 && (
    <div className='inline-table-details mb-1 mt-2 col-span-8'>
     <CustomList
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
     />
    </div>
   )}
   {checklistDetails?.hasOwnProperty('checklist') && (
    <div className='propasal-entry-form col-span-8'>
     <MRVform
      initialValues={checklistInitialValues}
      formRender={checklistDetails}
      root='checklist'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default CheckList;
