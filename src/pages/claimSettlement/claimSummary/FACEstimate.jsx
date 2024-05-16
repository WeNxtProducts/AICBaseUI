import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import MRVform from '../../../components/mrvForm/MRVform';
import QuotationJSON from '../../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import CustomList from '../../../components/customList/CustomList';
import { bankColumn, bankData } from '../../../components/tableComponents/sampleData';

const FACEstimate = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);
 const [facEstimateDetails, setFacEstimateDetails] = useState(QuotationJSON);
 const [facEstimateInitialValues, setFacEstimateInitialValues] = useState(null);

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 const onSubmit = values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const handleEdit = item => {
  console.log('handleEdit : ', item);
  setFacEstimateInitialValues(item);
 };

 const resetForm = () => {
  setFacEstimateInitialValues(null);
 };

 return (
  <Modal
   width={1000}
   title='FAC Estimate'
   open={Open}
   onCancel={() => onClose()}
   footer={null}>
   <div className='fac-calim-settlement'>
    <div className='fac-header p-1'>
     <MRVform
      initialValues={facEstimateInitialValues}
      formRender={facEstimateDetails}
      root='checklist'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
      isSubmit={false}
     />
    </div>
    <div className='fac-form mt-5'>
     <MRVform
      initialValues={facEstimateInitialValues}
      formRender={facEstimateDetails}
      root='Charges'
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
      isSubmit={false}
     />
    </div>
    <div className='inline-table-details mt-5'>
     <CustomList
      tableColumn={bankColumn}
      tableData={bankData}
      handleEdit={handleEdit}
     />
    </div>
   </div>
  </Modal>
 );
};

export default FACEstimate;
