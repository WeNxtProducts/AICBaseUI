import React, { useState } from 'react';
import { emailData } from '../../components/tableComponents/sampleData';
import './EmailSetUp.scss';
import { Form, Formik } from 'formik';

const EmailSetUp = () => {
 const [initialValues, setInitialValues] = useState(emailData);

 const onSubmit = values => {
  console.log('EmailSetUp : ', values);
 };

 return (
  <div className='email_setup p-2'>
   <p className='template_header'>Email Template</p>
   <div className='mt-5'>
    <Formik
     initialValues={initialValues}
     values={initialValues}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue }) => {
      return (
       <Form onSubmit={handleSubmit}>
        <div className='current-field p-2 flex items-center'>
         <div className='w-1/4'>
          <p className='label-font select-none'>Notification Type *</p>
         </div>
        </div>
       </Form>
      );
     }}
    </Formik>
   </div>
  </div>
 );
};

export default EmailSetUp;
