import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';

const DispatchDetails = () => {
 const { QuotationJSON, id: tranId, formData } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [dispatchDetails, setDispatchDetails] = useState(QuotationJSON);
 const [dispatchDetailsInitialValues, setDispatchInitialValues] =
  useState(QuotationJSON);

 const onSubmit = values => {
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
  setDispatchInitialValues(item);
 };

 const resetForm = () => {
  setDispatchInitialValues(null);
 };

 return (
  <div className='dispatch-details front-form'>
   <div className='form-name'>
    <p>Dispatch Details</p>
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
   {dispatchDetails?.hasOwnProperty('dispatchDetails') && (
    <div className='propasal-entry-form col-span-8'>
     <MRVform
      initialValues={dispatchDetailsInitialValues}
      formRender={dispatchDetails}
      root='dispatchDetails'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default DispatchDetails;
