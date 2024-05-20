import React, { useContext, useState } from 'react';
import { processSurrenderContext } from './SurrenderProcessing';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../components/fieldsWithValues/FieldWithValue';
import surrenderJson from '../../getFormFields/process.json';
import FromHeader from '../../components/fieldsWithValues/FromHeader';

const SurrenderForm = () => {
 //  const { surrenderJson } = useContext(processSurrenderContext);
 const { formFields = {} } = surrenderJson.frontForm || {};
 const [initialValues, setInitialValues] = useState(surrenderJson);

 const onSubmit = async values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values) => {
  setFieldValue(path, value);
 };

 return (
  <div className='mt-5 pb-10'>
   <FromHeader name='Form' />
   <div className='search-form mt-8'>
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
             parent='frontForm'
             // lovData={custMasterLov?.[dataId]}
             handleChangeValue={handleChangeValue}
            />
           </div>
          );
         })}
        </div>
        <div className='mt-2 flex justify-center'>
         <button type='submit' className='process-button'>
          Accept
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

export default SurrenderForm;
