import React, { useContext, useEffect, useState } from 'react';
import { ClaimStepperContext } from '../../Claims';
import CustomList from '../../../../components/customList/CustomList';
import MRVform from '../../../../components/mrvForm/MRVform';
import { response } from '../../../../components/tableComponents/sampleData';
import { sortObjectByPFDSeqNo } from '../../../../components/commonHelper/SortBySequence';
import { getQueryId } from './../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from './../../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import showNotification from '../../../../components/notification/Notification';
import ConfirmationModal from '../../../../components/confirmationModal/ConfirmationModal';
import Loader from '../../../../components/loader/Loader';
import { extractValues, mergeDropdownData } from '../../../../components/commonHelper/ParamLov';

const ClaimCover = ({
 queryID,
 root,
 mrvGet,
 screenCode,
 screenName,
 saveRow,
 editRow,
 deleteRow,
}) => {
 const {
  ClaimsJson,
  id: tranId,
  ClaimsLOVJson,
  formValues,
  setDropDown,
  dropDown,
 } = useContext(ClaimStepperContext);
 const { mrvListingId } = ClaimsJson;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const mrvGetById = useApiRequests(mrvGet, 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const saveMRV = useApiRequests(saveRow, 'POST');
 const editMRV = useApiRequests(editRow, 'POST');
 const deleteMRV = useApiRequests(deleteRow, 'POST');
 const [claimCoverDetails, setClaimCoverDetails] = useState(null);
 const [claimCoverInitialValues, setClaimCoverInitialValues] = useState(null);
 const [editMRVId, setEditMRVId] = useState('');
 const [deleteConfirmation, setDeleteConfirmation] = useState(false);
 //  const [dropDown, setDropDown] = useState(ClaimsLOVJson);
 const [loader, setLoader] = useState(false);

 const addOrUpdateMRV = async (payload, addOrUpdate) => {
  try {
   const params = editMRVId ? { editMRVId } : { tranId };
   const response = await addOrUpdate(payload, '', params);
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    MRVListing();
    setEditMRVId('');
    showNotification.SUCCESS(response?.status_msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const onSubmit = values => {
  //handleNext();
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
  const payload = { [root]: { formFields: modifiedData[root]?.formFields } };
  console.log('payload : ', payload);
  addOrUpdateMRV(payload, editMRVId ? editMRV : saveMRV);
 };

 const handleInitData = response => {
  const orderedData = sortObjectByPFDSeqNo(response);
  setClaimCoverDetails({ [root]: orderedData[root] });
  setClaimCoverInitialValues({ [root]: orderedData[root] });
  //console.log('orderedData : ', { [root]: orderedData[root] });
 };

 const MRVListing = () => {
  if (tranId) {
   const queryId = getQueryId(queryID, mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 };

 useEffect(() => {
  console.log('formValues : ', formValues);
  handleInitData(ClaimsJson);
  MRVListing();
 }, []);

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const resetForm = () => {
  setEditMRVId('');
  handleInitData(ClaimsJson);
 };

 const handleEdit = async item => {
  //   console.log('handleEdit : ', item);
  try {
   const response = await mrvGetById('', {
    screenCode,
    screenName,
    tranId: item?.ID,
   });
   if (response?.status === 'SUCCESS') {
    setEditMRVId(item?.ID);
    handleInitData(response?.Data);
   } else if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   }
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
  console.log('handleDelete : ', item);
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
      />
     </div>
    )}
    {claimCoverDetails && Object.prototype.hasOwnProperty.call(claimCoverDetails, root) && (
     <MRVform
      initialValues={claimCoverInitialValues}
      formRender={claimCoverDetails}
      root={root}
      lovList={dropDown}
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
      handleOnBlur={handleOnBlur}
     />
    )}
   </div>
   {deleteConfirmation && <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />}
  </div>
 );
};

export default ClaimCover;
