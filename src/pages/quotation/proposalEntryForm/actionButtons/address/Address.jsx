import { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { StepperContext } from '../../../Quotation';
import MainForm from '../../../../../components/mainForm/MainForm';

const Address = ({ open, handleClose }) => {
 const { QuotationJSON } = useContext(StepperContext);
 const [Open, setOpen] = useState(false);
 const [addressDetails, setAddressDetails] = useState(QuotationJSON);
 const [addressInitialValues, setAddressInitialValues] =
  useState(QuotationJSON);

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
   title='Address'
   open={Open}
   onCancel={() => onClose()}
   footer={null}>
   <MainForm
    initialValues={addressInitialValues}
    formRender={addressDetails}
    root='address'
    onSubmit={onSubmit}
    handleChangeValue={handleChangeValue}
   />
  </Modal>
 );
};

export default Address;
