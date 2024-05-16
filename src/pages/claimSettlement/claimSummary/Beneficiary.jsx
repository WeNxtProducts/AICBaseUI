import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import CustomList from '../../../components/customList/CustomList';
import {
 bankColumn,
 bankData,
} from '../../../components/tableComponents/sampleData';
import QuotationJSON from '../../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import MRVform from '../../../components/mrvForm/MRVform';

const Beneficiary = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);
 const [beneficiaryDetails, setBeneficiaryDetails] = useState(QuotationJSON);
 const [beneficiaryInitialValues, setBeneficiaryInitialValues] = useState(null);

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
  setBeneficiaryInitialValues(item);
 };

 const resetForm = () => {
  setBeneficiaryInitialValues(null);
 };

 return (
  <Modal
   width={1000}
   title='Beneficiary'
   open={Open}
   onCancel={() => onClose()}
   footer={null}>
   <div className='inline-table-details mt-5'>
    <CustomList
     tableColumn={bankColumn}
     tableData={bankData}
     handleEdit={handleEdit}
    />
   </div>
   <div className='mt-2'>
    <MRVform
     initialValues={beneficiaryInitialValues}
     formRender={beneficiaryDetails}
     root='Charges'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
    />
   </div>
  </Modal>
 );
};

export default Beneficiary;
