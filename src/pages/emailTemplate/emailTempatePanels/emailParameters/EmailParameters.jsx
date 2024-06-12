import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../../components/commonHelper/SortBySequence';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import {
 extractValues,
 mergeDropdownData,
} from '../../../../components/commonHelper/ParamLov';
import Loader from '../../../../components/loader/Loader';
import CustomList from '../../../../components/customList/CustomList';
import MRVform from '../../../../components/mrvForm/MRVform';
import ConfirmationModal from '../../../../components/confirmationModal/ConfirmationModal';
import { MailTemplateContext } from '../../EmailTemplate';

const EmailParameters = ({
 queryID,
 root,
 mrvGet,
 screenCode,
 screenName,
 saveRow,
 editRow,
 deleteRow,
}) => {
 console.log('deleteRow : ', deleteRow);
 const {
  EmailTemplateJSON,
  id: tranId,
  formValues,
  setDropDown,
  dropDown,
 } = useContext(MailTemplateContext);
 const { mrvListingId } = EmailTemplateJSON;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const mrvGetById = useApiRequests(mrvGet, 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const saveMRV = useApiRequests(saveRow, 'POST');
 const editMRV = useApiRequests(editRow, 'POST');
 const deleteMRV = useApiRequests(deleteRow, 'POST');
 const [emailParamDetails, setEmailParamDetails] = useState(null);
 const [emailParamInitialValues, setEmailParamInitialValues] = useState(null);
 const [editMRVId, setEditMRVId] = useState('');
 const [deleteConfirmation, setDeleteConfirmation] = useState(false);
 const [loader, setLoader] = useState(false);

 const addOrUpdateMRV = async (payload, addOrUpdate) => {
  try {
   const params = editMRVId ? { editMRVId } : { tranId };
   const response = await addOrUpdate(payload, '', params);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    MRVListing();
    // setEditMRVId(response?.data?.Id);
    showNotification.SUCCESS(response?.status_msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const onSubmit = values => {
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const payload = { [root]: { formFields: modifiedData[root]?.formFields } };
  console.log('payload : ', payload);
  addOrUpdateMRV(payload, editMRVId ? editMRV : saveMRV);
 };

 const handleInitData = response => {
  const orderedData = sortObjectByPFDSeqNo(response);
  setEmailParamDetails({ [root]: orderedData[root] });
  setEmailParamInitialValues({ [root]: orderedData[root] });
  // console.log('orderedData : ', { [root]: orderedData[root] });
 };

 const MRVListing = () => {
  if (tranId) {
   const queryId = getQueryId(queryID, mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 };

 useEffect(() => {
  handleInitData(EmailTemplateJSON);
  MRVListing();
 }, []);

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const resetForm = () => {
  setEditMRVId('');
  handleInitData(EmailTemplateJSON);
 };

 const handleEdit = async item => {
  try {
   const response = await mrvGetById('', {
    screenCode,
    screenName,
    tranId: item?.ID,
   });
   //  if (response?.status === 'SUCCESS') {
   setEditMRVId(item?.ID);
   handleInitData(response);
   //  } else if (response?.status === 'FAILURE') {
   //   showNotification.ERROR(response?.status_msg);
   //  }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleDeleteConfirm = async id => {
  setLoader(true);
  try {
   const response = await deleteMRV('', {}, { id });
   if (response?.status === 'SUCCESS') {
    MRVListing();
    showNotification.SUCCESS(response?.status_msg);
   } else if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   }
   setEditMRVId('');
   setDeleteConfirmation(false);
   setLoader(false);
  } catch (err) {
   console.log('err  : ', err);
  }
 };

 const handleClose = status => {
  const deleteId = editMRVId;
  setEditMRVId('');
  if (status) handleDeleteConfirm(deleteId);
 };

 const handleDelete = item => {
  setEditMRVId(item?.ID);
  setDeleteConfirmation(true);
 };

 const apiCallsParamLov = (PFD_PARAM_2, valueKey, valueQueryId) => {
  const promises = PFD_PARAM_2.map(item => {
   const queryParams = { queryId: valueQueryId[item], ...valueKey };
   return getParamLov('', queryParams);
  });

  Promise.all(promises)
   .then(responses => {
    if (responses[0].status === 'SUCCESS') {
     const mergedData = mergeDropdownData(responses);
     setDropDown(prevDropdown => {
      return { ...prevDropdown, ...mergedData };
     });
    }
   })
   .catch(error => {
    console.error(error);
   });
 };

 const handleOnBlur = (currentData, values) => {
  // if (currentData.hasOwnProperty('PFD_PARAM_2')) {
  if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_2')) {
   const PFD_PARAM_2 = currentData?.PFD_PARAM_2.split(',');
   const PFD_PARAM_3 = currentData?.PFD_PARAM_3.split(',');
   const valueKey = extractValues(PFD_PARAM_3, values, 'PFD_FLD_VALUE');
   const valueQueryId = extractValues(PFD_PARAM_2, formValues, 'PFD_PARAM_1');
   apiCallsParamLov(PFD_PARAM_2, valueKey, valueQueryId);
  }
 };

 return (
  <div className='front-form claim-cover grid grid-cols-8 gap-1'>
   {loader && <Loader />}
   <div className='propasal-entry-form col-span-8'>
    {rowData?.length > 0 && (
     <div className='inline-table-details mb-4 mt-2 col-span-8'>
      <CustomList
       tableColumn={columnData}
       tableData={rowData}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
       selectedRow={editMRVId}
      />
     </div>
    )}
    {emailParamDetails &&
     Object.prototype.hasOwnProperty.call(emailParamDetails, root) && (
      <MRVform
       initialValues={emailParamInitialValues}
       formRender={emailParamDetails}
       root={root}
       lovList={dropDown}
       onSubmit={onSubmit}
       handleChangeValue={handleChangeValue}
       resetForm={resetForm}
       handleOnBlur={handleOnBlur}
       addOrUpdate={!!editMRVId}
      />
     )}
   </div>
   {deleteConfirmation && (
    <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />
   )}
  </div>
 );
};

export default EmailParameters;
