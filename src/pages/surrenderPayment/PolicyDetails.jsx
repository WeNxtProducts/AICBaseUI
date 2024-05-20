import React, { useContext, useState } from 'react';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../components/fieldsWithValues/FieldWithValue';
import { SurrenderPaymentContext } from './SurrenderPayment';

const PolicyDetails = () => {
 const { surrenderJSON } = useContext(SurrenderPaymentContext);
 const { formFields = {} } = surrenderJSON.payment_details || {};
 const [initialValues, setInitialValues] = useState({
  payment_details: surrenderJSON?.payment_details,
 });

 const onSubmit = async values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='policy-details'>
   <div className='flex items-center justify-between'>
    <p className='header-font pl-2'>Policy Details</p>
   </div>
   <p className='status pl-2'>
    Surrender Payment Status : <span>Not Approved</span>
   </p>
   <div className='search-form mt-3'>
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
             parent='payment_details'
             // lovData={custMasterLov?.[dataId]}
             handleChangeValue={handleChangeValue}
            />
           </div>
          );
         })}
        </div>
        <div className='mt-2 flex justify-end'>
         <button type='submit' className='process-button mr-5'>
          Save
         </button>
        </div>
       </Form>
      );
     }}
    </Formik>
   </div>
  </div>
 );
};

export default PolicyDetails;
