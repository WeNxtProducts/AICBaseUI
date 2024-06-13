import React, { useContext, useEffect, useMemo, useState } from 'react';
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
import useApiRequests from '../../../services/useApiRequests';
import Loader from '../../../components/loader/Loader';
import showNotification from '../../../components/notification/Notification';
import MainForm from './../../../components/mainForm/MainForm';

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
 const [loader, setLoader] = useState(false);

 const resetForm = setValues => {
  setValues({ frontForm: initialValues?.frontForm });
 };

 const handleStateInit = (value, isEdit) => {
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
   {initialValues !== null && (
    <div className='mt-3 mb-5'>
     <MainForm
      initialValues={initialValues}
      formRender={formRender}
      root='frontForm'
      lovList={dropDown}
      addOrUpdate={!!tranId}
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
     />
    </div>
   )}
  </div>
 );
};

export default EmailTemplateEntryForm;
