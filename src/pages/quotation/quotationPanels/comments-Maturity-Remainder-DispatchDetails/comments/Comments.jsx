import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import MRVform from '../../../../../components/mrvForm/MRVform';

const Comments = () => {
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
 const [commentsDetails, setCommentsDetails] = useState(QuotationJSON);
 const [commentsDetailsInitialValues, setCommentsInitialValues] =
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
   const queryId = getQueryId(
    'comments_maturity_remainder_dispatch details',
    mrvListingId,
   );
   handleMRVListing(queryId, tranId);
  }
 }, []);

 const handleEdit = item => {
  console.log('handleEdit : ', item);
  setCommentsInitialValues(item);
 };

 const resetForm = () => {
  setCommentsInitialValues(null);
 };

 return (
  <div className='comments front-form'>
   <div className='form-name'>
    <p>Comments</p>
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
   {commentsDetails?.hasOwnProperty('comments') && (
    <MRVform
     initialValues={commentsDetailsInitialValues}
     formRender={commentsDetails}
     root='comments'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
    />
   )}
  </div>
 );
};

export default Comments;
