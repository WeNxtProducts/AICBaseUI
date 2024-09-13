/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { DocPrintContext } from '../DocPrint';
import { deepCopy, extractFieldValuesInPlace } from '../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import { setCurrentID, setFormValues } from '../../../globalStore/slices/IdSlices';
import useApiRequests from '../../../services/useApiRequests';
import { useDispatch } from 'react-redux';
import showNotification from '../../../components/notification/Notification';
import Loader from '../../../components/loader/Loader';
import MainForm from '../../../components/mainForm/MainForm';

const DocPrintEntryForm = () => {
 const { DoctPrintJSON, id: tranId, dropDown, setDropDown } = useContext(DocPrintContext);
 const dispatch = useDispatch();
 const createDoc = useApiRequests('createDoc', 'POST');
 const updateDoc = useApiRequests('updateDoc', 'POST');
 const getDoc = useApiRequests('getDoc', 'GET');
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

 const handleGetDoc = async () => {
  setLoader(true);
  try {
   const response = await getDoc('', {
    tranId,
    screenCode: 'DOCPRINTSETUP',
    screenName: 'DOCPRINTSETUP',
   });
   handleStateInit(response?.Data, true);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (tranId) handleGetDoc();
  else handleStateInit(DoctPrintJSON, false);
 }, []);

 const addOrUpdateDoc = async (payload, addOrUpdate) => {
  setLoader(true);
  try {
   const response = await addOrUpdate(payload, '', tranId && { tranId });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
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
  addOrUpdateDoc(payload, tranId ? updateDoc : createDoc);
 };

 const handleChangeValue = (value, path, setFieldValue, parent, values, currentData) => {
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
