import React, { useContext, useEffect, useState } from 'react';
import CustomList from '../../../../../components/customList/CustomList';
import { StepperContext } from '../../../Quotation';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import MRVform from '../../../../../components/mrvForm/MRVform';

const Conditions = () => {
 const { QuotationJSON, id: tranId, formData } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [conditionsDetails, setconditionsDetails] = useState(QuotationJSON);
 const [conditionsInitialValues, setConditionsInitialValues] = useState(null);

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
  setConditionsInitialValues(item);
 };

 const resetForm = () => {
  setConditionsInitialValues(null);
 };

 return (
  <div className='conditions front-form'>
   <div className='form-name'>
    <p>Conditions</p>
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
   {conditionsDetails?.hasOwnProperty('Conditions') && (
    <div className='propasal-entry-form col-span-8'>
     <MRVform
      initialValues={conditionsInitialValues}
      formRender={conditionsDetails}
      root='Conditions'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    </div>
   )}
  </div>
 );
};

export default Conditions;
