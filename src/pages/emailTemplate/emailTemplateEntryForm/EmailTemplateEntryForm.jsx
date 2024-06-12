/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../../components/fieldsWithValues/FieldWithValue';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../components/commonHelper/DataSend';
import { MailTemplateContext } from '../EmailTemplate';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import {
 setCurrentID,
 setFormValues,
} from '../../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';
import { createYupSchema } from '../../../components/commonHelper/SchemaGenerator';
import useApiRequests from '../../../services/useApiRequests';
import Loader from '../../../components/loader/Loader';
import showNotification from '../../../components/notification/Notification';

const EmailTemplateEntryForm = () => {
 const {
  EmailTemplateJSON,
  id: tranId,
  dropDown,
  formValues,
 } = useContext(MailTemplateContext);
 const dispatch = useDispatch();
 const createEmail = useApiRequests('createEmail', 'POST');
 const updateEmail = useApiRequests('updateEmail', 'POST');
 const getEmail = useApiRequests('getEmail', 'GET');
 const [initialValues, setInitialValues] = useState(null);
 const [formRender, setFormRender] = useState(null);
 const [validation, setValidation] = useState(null);
 const [loader, setLoader] = useState(false);

 const resetForm = setValues => {
  setValues({ frontForm: initialValues?.frontForm });
 };

 const handleStateInit = (value, isEdit) => {
  const validationSchema = createYupSchema({
   frontForm: value.frontForm,
  });
  setValidation(validationSchema);
  const orderedData = sortObjectByPFDSeqNo(value);
  setInitialValues({ frontForm: orderedData?.frontForm });
  setFormRender({ frontForm: orderedData?.frontForm });
  dispatch(setFormValues(orderedData));
 };

 const handleGetEmail = async () => {
  setLoader(true);
  try {
   const response = await getEmail('', {
    tranId,
    screenCode: 'EMAILTEMPLATE',
    screenName: 'EMAILTEMPLATE',
   });
   handleStateInit(response, true);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleGetEmail();
  else handleStateInit(EmailTemplateJSON, false);
 }, []);

 const addOrUpdateEmail = async (payload, addOrUpdate) => {
  setLoader(true);
  try {
   const response = await addOrUpdate(payload, '', tranId && { tranId });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    if (!tranId) dispatch(setCurrentID(response?.data?.Id));
    showNotification.SUCCESS(response?.status_msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const onSubmit = async values => {
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const { frontForm } = modifiedData;
  const payload = { frontForm };
  console.log('payload : ', payload);
  addOrUpdateEmail(payload, tranId ? updateEmail : createEmail);
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
   {loader && <Loader />}
   {validation !== null && initialValues !== null && (
    <Formik
     initialValues={initialValues}
     //  values={initialValues}
     validationSchema={validation}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue, setValues }) => {
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
         <button
          type='button'
          onClick={() => resetForm(setValues)}
          className='reset'>
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
   )}
  </div>
 );
};

export default EmailTemplateEntryForm;
