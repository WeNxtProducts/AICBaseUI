import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import MRVform from '../../../../../components/mrvForm/MRVform';

const DiscountLoading = () => {
 const { QuotationJSON, id: tranId, formData } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [discountLoadingDetails, setDiscountLoadingDetails] =
  useState(QuotationJSON);
 const [discountLoadingInitialValues, setDiscountLoadingInitialValues] =
  useState(null);

 const onSubmit = values => {
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
  setDiscountLoadingInitialValues(item);
 };

 const resetForm = () => {
  setDiscountLoadingInitialValues(null);
 };

 return (
  <div className='discount-loading front-form'>
   <div className='form-name'>
    <p>Discount/Loading Details</p>
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
   {discountLoadingDetails?.hasOwnProperty('Discount_Loading') && (
    <div className='propasal-entry-form col-span-8'>
     <MRVform
      initialValues={discountLoadingInitialValues}
      formRender={discountLoadingDetails}
      root='Discount_Loading'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default DiscountLoading;
