import { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { StepperContext } from '../../../Quotation';
import MainForm from '../../../../../components/mainForm/MainForm';

const BankDetails = ({ open, handleClose }) => {
 const { QuotationJSON } = useContext(StepperContext);
 const [Open, setOpen] = useState(false);
 const [bankDetails, setBankDetails] = useState(QuotationJSON);
 const [bankInitialValues, setBankInitialValues] = useState(QuotationJSON);

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

 return (
  <Modal
   width={1000}
   title='Bank Details'
   open={Open}
   onCancel={() => onClose()}
   footer={null}>
   <MainForm
    initialValues={bankInitialValues}
    formRender={bankDetails}
    root='bank_details'
    onSubmit={onSubmit}
    handleChangeValue={handleChangeValue}
   />
  </Modal>
 );
};

export default BankDetails;
