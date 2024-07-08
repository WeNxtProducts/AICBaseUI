import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import MRVform from '../../../../../components/mrvForm/MRVform';

const Remainder = () => {
 const { QuotationJSON, id: tranId, formData } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [remainderDetails, setRemainderDetails] = useState(QuotationJSON);
 const [remainderInitialValues, setRemainderInitialValues] = useState(null);

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
  setRemainderInitialValues(item);
 };

 const resetForm = () => {
  setRemainderInitialValues(null);
 };

 return (
  <div className='remainder front-form'>
   <div className='form-name'>
    <p>Remainder</p>
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
   {remainderDetails?.hasOwnProperty('remainder') && (
    <MRVform
     initialValues={remainderInitialValues}
     formRender={remainderDetails}
     root='remainder'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
    />
   )}
  </div>
 );
};

export default Remainder;
