import React, { useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import { SurrenderPaymentContext } from '../../SurrenderPayment';
import FieldWithValue from '../../../../components/fieldsWithValues/FieldWithValue';
import FromHeader from '../../../../components/fieldsWithValues/FromHeader';

const PaymentDetails = () => {
 const { surrenderJSON } = useContext(SurrenderPaymentContext);
 const { formFields = {} } = surrenderJSON.payment_header || {};
 const { formFields: deduction = {} } = surrenderJSON.deduction_details || {};
 const { formFields: payment_check = {} } = surrenderJSON.payment_detail || {};
 const [initialValues, setInitialValues] = useState(surrenderJSON);

 const onSubmit = async values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='p-2'>
   <Formik
    initialValues={initialValues}
    values={initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}>
    {({ handleSubmit, values, setFieldValue }) => {
     return (
      <Form onSubmit={handleSubmit}>
       <div className='grid grid-cols-2'>
        {Object.keys(formFields).map(fieldKey => {
         const dataId = formFields[fieldKey]?.PFD_COLUMN_NAME;
         return (
          <div key={dataId} data-id={dataId}>
           <FieldWithValue
            currentData={formFields[fieldKey]}
            values={values}
            setFieldValue={setFieldValue}
            parent='payment_header'
            // lovData={custMasterLov?.[dataId]}
            handleChangeValue={handleChangeValue}
           />
          </div>
         );
        })}
       </div>
       <div className='mt-5'>
        <FromHeader name='Deduction Details' />
        <div className='grid grid-cols-2'>
         {Object.keys(deduction).map(fieldKey => {
          const dataId = deduction[fieldKey]?.PFD_COLUMN_NAME;
          return (
           <div key={dataId} data-id={dataId}>
            <FieldWithValue
             currentData={deduction[fieldKey]}
             values={values}
             setFieldValue={setFieldValue}
             parent='deduction_details'
             // lovData={custMasterLov?.[dataId]}
             handleChangeValue={handleChangeValue}
            />
           </div>
          );
         })}
        </div>
       </div>
       <div className='mt-5'>
        <FromHeader name='Payment Details' />
        <div className='grid grid-cols-2'>
         {Object.keys(payment_check).map(fieldKey => {
          const dataId = payment_check[fieldKey]?.PFD_COLUMN_NAME;
          return (
           <div key={dataId} data-id={dataId}>
            <FieldWithValue
             currentData={payment_check[fieldKey]}
             values={values}
             setFieldValue={setFieldValue}
             parent='payment_detail'
             // lovData={custMasterLov?.[dataId]}
             handleChangeValue={handleChangeValue}
            />
           </div>
          );
         })}
        </div>
       </div>
       <div className='flex justify-center'>
        <button type='submit' className='process-button'>
         Save
        </button>
       </div>
      </Form>
     );
    }}
   </Formik>
  </div>
 );
};

export default PaymentDetails;
