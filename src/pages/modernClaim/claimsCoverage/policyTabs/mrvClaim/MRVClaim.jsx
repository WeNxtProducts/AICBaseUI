import React, { useContext, useEffect, useState } from 'react';
import useApiRequests from '../../../../../services/useApiRequests';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import showNotification from '../../../../../components/notification/Notification';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../../../components/commonHelper/SortBySequence';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import {
 extractValues,
 mergeDropdownData,
} from '../../../../../components/commonHelper/ParamLov';
import Loader from '../../../../../components/loader/Loader';
import ConfirmationModal from '../../../../../components/confirmationModal/ConfirmationModal';
import { ClaimContext } from '../../../ModernClaim';
import MRVListingScreen from '../MRVListingScreen';
import { bankColumn, bankData } from '../../../../../components/tableComponents/sampleData';
import ModernMRV from '../../../modernMRV/ModernMRV';

const MRVClaim = ({
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
  formValues,
  setDropDown,
  dropDown,
 } = useContext(ClaimContext);
 const { mrvListingId } = ClaimsJson;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const mrvGetById = useApiRequests(mrvGet, 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const saveMRV = useApiRequests(saveRow, 'POST');
 const editMRV = useApiRequests(editRow, 'POST');
 const deleteMRV = useApiRequests(deleteRow, 'POST');
 const [claimMRV, setClaimMRV] = useState(null);
 const [claimMRVInitialValues, setClaimMRVInitialValues] = useState(null);
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
  setClaimMRV({ [root]: orderedData[root] });
  setClaimMRVInitialValues({ [root]: orderedData[root] });
  //console.log('orderedData : ', { [root]: orderedData[root] });
 };

 const MRVListing = () => {
  if (tranId) {
   const queryId = getQueryId(queryID, mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 };

 useEffect(() => {
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
  try {
   const response = await mrvGetById('', {
    screenCode,
    screenName,
    tranId: item?.ID,
   });
   //  if (response?.status === 'SUCCESS') {
   setEditMRVId(item?.ID);
   handleInitData(response?.Data);
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
   <div className='propasal-entry-form col-span-8 grid grid-cols-7'>
    {/* {rowData?.length > 0 && (
     <div className='inline-table-details mb-4 mt-2 col-span-8'>
      <CustomList
       tableColumn={columnData}
       tableData={rowData}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
       selectedRow={editMRVId}
      />
     </div>
    )} */}
    <div className='col-span-5 mt-3'>
     {claimMRV && Object.prototype.hasOwnProperty.call(claimMRV, root) && (
      <ModernMRV
       initialValues={claimMRVInitialValues}
       formRender={claimMRV}
       root={root}
       lovList={dropDown}
       onSubmit={onSubmit}
       handleChangeValue={handleChangeValue}
       resetForm={resetForm}
       handleOnBlur={handleOnBlur}
       addOrUpdate={!!editMRVId}
       smallFont={true}
      />
     )}
    </div>
    <div className='col-span-2 p-2 border_left_divider'>
     <MRVListingScreen tableColumn={bankColumn} tableData={bankData} />
    </div>
   </div>
   {deleteConfirmation && (
    <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />
   )}
  </div>
 );
};

export default MRVClaim;
