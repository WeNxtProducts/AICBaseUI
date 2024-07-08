import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';

const Maturity = () => {
 const { QuotationJSON, id: tranId, formData } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [maturityDetails, setMaturityDetails] = useState(QuotationJSON);
 const [maturityInitialValues, setMaturityInitialValues] = useState(null);

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
  setMaturityInitialValues(item);
 };

 const resetForm = () => {
  setMaturityInitialValues(null);
 };

 return (
  <div className='maturity front-form'>
   <div className='form-name'>
    <p>Maturity</p>
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
   {maturityDetails?.hasOwnProperty('maturity') && (
    <MRVform
     initialValues={maturityInitialValues}
     formRender={maturityDetails}
     root='maturity'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
    />
   )}
  </div>
 );
};

export default Maturity;
