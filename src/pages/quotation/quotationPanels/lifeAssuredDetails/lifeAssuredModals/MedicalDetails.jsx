import { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { StepperContext } from '../../../Quotation';
import CustomList from '../../../../../components/customList/CustomList';
import {
 bankColumn,
 bankData,
} from '../../../../../components/tableComponents/sampleData';
import MainForm from '../../../../../components/mainForm/MainForm';

const MedicalDetails = ({ open, handleClose }) => {
 const { QuotationJSON } = useContext(StepperContext);
 const [Open, setOpen] = useState(false);
 const [medicalDetails, setMedicalDetails] = useState(QuotationJSON);
 const [medicalInitialValues, setMedicalInitialValues] =
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
   title='Riders'
   open={Open}
   onCancel={() => onClose()}
   footer={null}>
   <MainForm
    initialValues={medicalInitialValues}
    formRender={medicalDetails}
    root='bank_details'
    onSubmit={onSubmit}
    handleChangeValue={handleChangeValue}
   />
   <div className='inline-table-details mt-5'>
    <CustomList tableColumn={bankColumn} tableData={bankData} />
   </div>
  </Modal>
 );
};

export default MedicalDetails;
