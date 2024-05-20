import React, { useContext, useState } from 'react';
import { SurrenderPaymentContext } from '../SurrenderPayment';
import MainForm from '../../../components/mainForm/MainForm';

const Charges = () => {
 const { surrenderJSON } = useContext(SurrenderPaymentContext);
 const [chargesDetails, setChargesDetails] = useState(surrenderJSON);
 const [chargesInitialValues, setChargesInitialValues] =
  useState(surrenderJSON);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='front-form claim-charges grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-8'>
    <MainForm
     initialValues={chargesInitialValues}
     formRender={chargesDetails}
     root='payment_header'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     action={false}
    />
   </div>
  </div>
 );
};

export default Charges;
