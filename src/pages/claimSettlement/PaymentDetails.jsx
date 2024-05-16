import React, { useContext, useState } from 'react';
import { ClaimSettlementContext } from './ClaimSettlement';
import { Form, Formik } from 'formik';
import SummaryForm from './claimSummary/SummaryForm';

const PaymentDetails = () => {
 const { claimSettlementJSON } = useContext(ClaimSettlementContext);
 const [paymentDetails, setPaymentDetails] = useState(claimSettlementJSON);
 const [paymentDetailsInitialValues, setPaymentDetailsInitialValues] =
  useState(claimSettlementJSON);

 const onSubmit = values => {
  console.log('PaymentDetails: ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className=' mt-4'>
   <div className='grid grid-cols-12'>
    <div className='col-span-10 p-5 payment_details'>
     <p className='payment_header pl-2'>PaymentDetails</p>
     <div className='mt-3'>
      <Formik
       initialValues={paymentDetailsInitialValues}
       values={paymentDetailsInitialValues}
       onSubmit={onSubmit}
       enableReinitialize={true}>
       {({ handleSubmit, values, setFieldValue }) => {
        return (
         <Form onSubmit={handleSubmit}>
          <SummaryForm
           values={values}
           setFieldValue={setFieldValue}
           formData={paymentDetails}
           handleChangeValue={handleChangeValue}
           root='paymentDetails'
          />
         </Form>
        );
       }}
      </Formik>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PaymentDetails;
