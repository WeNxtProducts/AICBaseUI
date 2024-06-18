/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import { AutoDispatchContext } from '../AutoDispatchSetUp';
import { useDispatch } from 'react-redux';
import useApiRequests from '../../../services/useApiRequests';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import {
 setCurrentID,
 setFormValues,
} from '../../../globalStore/slices/IdSlices';
import showNotification from '../../../components/notification/Notification';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../components/commonHelper/DataSend';
import Loader from '../../../components/loader/Loader';
import MainForm from '../../../components/mainForm/MainForm';

const DocPrintEntryForm = () => {
 const {
  AutoDispatchJSON,
  id: tranId,
  dropDown,
  setDropDown,
 } = useContext(AutoDispatchContext);
 const dispatch = useDispatch();
 const createAutoDispatch = useApiRequests('createAutoDispatch', 'POST');
 const updateAutoDispatch = useApiRequests('updateAutoDispatch', 'POST');
 const getAutoDispatch = useApiRequests('getAutoDispatch', 'GET');
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

 const handleGetAutoDispatch = async () => {
  setLoader(true);
  try {
   const response = await getAutoDispatch('', {
    tranId,
    screenCode: 'AUTODISPATCH',
    screenName: 'AUTODISPATCH',
   });
   handleStateInit(response?.Data, true);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleGetAutoDispatch();
  else handleStateInit(AutoDispatchJSON, false);
 }, []);

 const addOrUpdateDoc = async (payload, addOrUpdate) => {
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
  addOrUpdateDoc(payload, tranId ? updateAutoDispatch : createAutoDispatch);
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

export default DocPrintEntryForm;
