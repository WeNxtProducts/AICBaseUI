import React from 'react';
import CusJson from '../../getFormFields/CUSTCREATE_getFieldList.json';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const SchemavalidationCheck = () => {
 const yourJsonObject = CusJson;

 const createYupSchema = data => {
  if (typeof data === 'object' && !Array.isArray(data)) {
   let schema = {};
   for (const key in data) {
    const fieldValue = data[key];
    if (fieldValue?.formFields) {
     // If formFields exist, create schema for its properties
     let formFieldsSchema = {};
     for (const formField in fieldValue.formFields) {
      formFieldsSchema[formField] = Yup.object({
       PFD_FLD_VALUE: Yup.string().required('PFD_FLD_VALUE is required'),
      });
     }
     schema[key] = Yup.object().shape({
      formFields: Yup.object().shape(formFieldsSchema),
     });
    } else {
     // Otherwise, continue recursively creating schema
     schema[key] = createYupSchema(fieldValue);
    }
   }
   return Yup.object().shape(schema);
  }

  // If the current data is an array, recursively create schema for each item
  if (Array.isArray(data)) {
   const itemSchema = createYupSchema(data[0]);
   return Yup.array().of(itemSchema);
  }

  // If the current data is a string, return string schema
  return Yup.string().required('PFD_FLD_VALUE is required');
 };

 const validationSchema = createYupSchema(yourJsonObject);

 const handleSubmit = (values, { setSubmitting }) => {
  console.log('handleSubmit : ', values);
  setSubmitting(false);
 };

 return (
  <div>
   <p>SchemavalidationCheck</p>
   <button onClick={() => handleGenerate()}>Generate</button>
   <Formik
    initialValues={yourJsonObject}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}>
    {({ isSubmitting, values, errors }) => {
     console.log('values : ', values);
     console.log('errors : ', errors);
     return (
      <Form>
       {/* Your form fields here */}
       <Field type='text' name='exampleField' />
       <ErrorMessage name='exampleField' component='div' />

       <button type='submit' disabled={isSubmitting}>
        Submit
       </button>
      </Form>
     );
    }}
   </Formik>
  </div>
 );
};

export default SchemavalidationCheck;
