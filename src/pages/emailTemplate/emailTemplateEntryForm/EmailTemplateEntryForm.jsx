/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../../components/fieldsWithValues/FieldWithValue';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../components/commonHelper/DataSend';
import { MailTemplateContext } from '../EmailTemplate';

const EmailTemplateEntryForm = () => {
 const {
  EmailTemplateJSON,
  id: tranId,
  dropDown,
  setDropDown,
 } = useContext(MailTemplateContext);
 const [initialValues, setInitialValues] = useState(EmailTemplateJSON);
 const [formRender, setFormRender] = useState(EmailTemplateJSON);

 const onSubmit = async values => {
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const { frontForm } = modifiedData;
  const payload = { frontForm };
  console.log('payload : ', payload);
 };

 const handleChangeValue = (
  value,
  path,
  setFieldValue,
  parent,
  values,
  currentData,
 ) => {
  setFieldValue(path, value);
 };

 return (
  <div className='mt-4'>
   <Formik
    initialValues={initialValues}
    values={initialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}>
    {({ handleSubmit, values, setFieldValue }) => {
     return (
      <Form onSubmit={handleSubmit}>
       <div className={`items-center grid grid-cols-${'2'} gap-0`}>
        {Object.keys(formRender?.frontForm?.formFields).map(fieldKey => {
         const dataId =
          formRender?.frontForm?.formFields[fieldKey]?.PFD_COLUMN_NAME;
         return useMemo(() => {
          return (
           <React.Fragment key={dataId}>
            {!formRender?.frontForm?.formFields[fieldKey]?.PFD_HIDE_YN && (
             <div data-id={dataId}>
              <FieldWithValue
               currentData={formRender?.frontForm?.formFields[fieldKey]}
               values={values}
               lovData={dropDown?.[dataId]}
               setFieldValue={setFieldValue}
               handleChangeValue={handleChangeValue}
               parent='frontForm'
              />
             </div>
            )}
           </React.Fragment>
          );
         }, [values?.frontForm?.formFields[fieldKey], dropDown?.[dataId]]);
        })}
       </div>
       <div className='w-full mt-9 mb-5 submit-button-form'>
        <button type='button' className='reset'>
         Reset
        </button>
        <button type='submit' className='save ml-9'>
         Submit
        </button>
       </div>
      </Form>
     );
    }}
   </Formik>
  </div>
 );
};

export default EmailTemplateEntryForm;
