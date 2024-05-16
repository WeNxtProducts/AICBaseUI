import React, { useState } from 'react';
import processJSON from '../../getFormFields/process.json';
import FieldWithValue from '../../components/fieldsWithValues/FieldWithValue';
import { Form, Formik } from 'formik';

const ProcessForm = () => {
 const { frontForm } = processJSON;
 const { formFields = {} } = frontForm;
 const [initialValues, setInitialValues] = useState(processJSON);

 const onSubmit = async values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='mt-2'>
   <Formik
    initialValues={initialValues}
    values={initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}>
    {({ handleSubmit, values, setFieldValue, errors }) => {
     return (
      <Form onSubmit={handleSubmit}>
       <div className='form-conatiner grid grid-cols-2'>
        {Object.keys(formFields).map(fieldKey => {
         const dataId = formFields[fieldKey]?.PFD_COLUMN_NAME;
         return (
          <div key={dataId} data-id={dataId}>
           <FieldWithValue
            currentData={formFields[fieldKey]}
            values={values}
            setFieldValue={setFieldValue}
            parent='frontForm'
            // lovData={custMasterLov?.[dataId]}
            handleChangeValue={handleChangeValue}
           />
          </div>
         );
        })}
       </div>
       <div className='mt-4 flex justify-center'>
        <button className='process-button'>Process</button>
       </div>
      </Form>
     );
    }}
   </Formik>
  </div>
 );
};

export default ProcessForm;
