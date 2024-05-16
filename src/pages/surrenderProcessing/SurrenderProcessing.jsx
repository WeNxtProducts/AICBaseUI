import React, { useState } from 'react';
import FromHeader from '../../components/fieldsWithValues/FromHeader';
import surrenderJson from '../../getFormFields/process.json';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../components/fieldsWithValues/FieldWithValue';
import './SurrenderProcessing.scss';

const SurrenderProcessing = () => {
 const { formFields = {} } = surrenderJson.surrender_processing || {};
 const [initialValues, setInitialValues] = useState(surrenderJson);

 const onSubmit = async values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='surrender-processing'>
   <FromHeader name='Surrender/Paid-Up Processing' />
   <div className='search-form mt-2'>
    <Formik
     initialValues={initialValues}
     values={initialValues}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue }) => {
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
             parent='surrender_processing'
             // lovData={custMasterLov?.[dataId]}
             handleChangeValue={handleChangeValue}
            />
           </div>
          );
         })}
         <div className='flex items-center'>
          <button className='process-button'>Ok</button>
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

export default SurrenderProcessing;
