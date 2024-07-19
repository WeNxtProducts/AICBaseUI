import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import { getQueryId } from '../../../components/commonHelper/QueryIdFetch';
import {
 extractValues,
 mergeDropdownData,
} from '../../../components/commonHelper/ParamLov';
import Loader from '../../../components/loader/Loader';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import { StepperContext } from '../Quotation';
import MRVQuotationForm from './MRVHelper/MRVQuotationForm';
import MRVListingQuotation from './MRVHelper/MRVListing';
import MRVModal from './MRVHelper/MRVInModal/MRVModal';
import '../../../styles/components/MRV_Card.scss';

const MrvQuotation = ({
 tranId,
 queryID,
 root,
 mrvGet,
 screenCode,
 screenName,
 saveRow,
 editRow,
 deleteRow,
 title,
 action = true,
 isView = true,
 isEdit = true,
 isDelete = true,
 subId = '',
}) => {
 const {
  QuotationJSON,
  // id: tranId,
  formValues,
  setDropDown,
  dropDown,
  freeze,
 } = useContext(StepperContext);
 const { mrvListingId } = QuotationJSON;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const mrvGetById = useApiRequests(mrvGet, 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const saveMRV = useApiRequests(saveRow, 'POST');
 const editMRV = useApiRequests(editRow, 'POST');
 const deleteMRV = useApiRequests(deleteRow, 'POST');
 const [quotationMRV, setQuotationMRV] = useState(null);
 const [quotationMRVInitialValues, setQuotationMRVInitialValues] =
  useState(null);
 const [editMRVId, setEditMRVId] = useState('');
 const [deleteConfirmation, setDeleteConfirmation] = useState(false);
 const [loader, setLoader] = useState(false);
 const [first, setFirst] = useState(false);
 const [formInit, setFormInit] = useState(false);
 const [openModal, setOpenModal] = useState(false);
 const [modalType, setModalType] = useState('');

 const addOrUpdateMRV = async (payload, addOrUpdate) => {
  try {
   const params = editMRVId
    ? { editMRVId }
    : { tranId, ...(subId && { subId }) };
   const response = await addOrUpdate(payload, '', params);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    MRVListing();
    if (!editMRVId) setFormInit(!formInit);
    // setEditMRVId(response?.data?.Id ?? editMRVId);
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
  addOrUpdateMRV(payload, editMRVId ? editMRV : saveMRV);
 };

 const handleInitData = response => {
  const orderedData = sortObjectByPFDSeqNo(response);
  setQuotationMRV({ [root]: orderedData[root] });
  setQuotationMRVInitialValues({ [root]: orderedData[root] });
  // console.log('orderedData : ', { [root]: orderedData[root] });
 };

 const MRVListing = () => {
  if (tranId) {
   const queryId = getQueryId(queryID, mrvListingId);
   handleMRVListing(queryId, tranId, subId);
  }
 };

 //  useEffect(() => {
 //   if (rowData?.length > 0 && !editMRVId && !first) {
 //    setFirst(true);
 //    handleEdit(rowData[0]);
 //   }
 //  }, [rowData]);

 useEffect(() => {
  if (tranId) {
   handleInitData(QuotationJSON);
   MRVListing();
  } else {
   handleInitData(QuotationJSON);
  }
 }, [tranId]);

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const resetForm = () => {
  setEditMRVId('');
  handleInitData(QuotationJSON);
 };

 const handleEdit = async item => {
  try {
   const response = await mrvGetById('', {
    screenCode,
    screenName,
    tranId: item?.ID,
    // ...(subId ? { emptranId: subId } : {}),
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
    if (id === editMRVId) resetForm();
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
  // setEditMRVId('');
  if (status) handleDeleteConfirm(deleteId);
  else if (!status) setDeleteConfirmation(false);
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

 const handleCloseModal = () => {
  setOpenModal(false);
  setModalType('');
 };

 const handleCardActions = (type, item) => {
  handleEdit(item);
  setEditMRVId(item?.ID);
  setModalType(type);
  setOpenModal(true);
 };

 const hasValidRowData = rowData => {
  return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
 };

 return (
  <div className='front-form claim-cover grid grid-cols-8 gap-1'>
   {loader && <Loader />}
   <div className='propasal-entry-form col-span-8 grid grid-cols-9'>
    <div className={`col-span-${hasValidRowData(rowData) ? '7' : '9'} mt-1`}>
     {quotationMRV &&
      Object.prototype.hasOwnProperty.call(quotationMRV, root) && (
       <MRVQuotationForm
        initialValues={quotationMRVInitialValues}
        formRender={quotationMRV}
        root={root}
        lovList={dropDown}
        onSubmit={onSubmit}
        handleChangeValue={handleChangeValue}
        resetForm={resetForm}
        handleOnBlur={handleOnBlur}
        addOrUpdate={!!editMRVId}
        smallFont={true}
        title={title}
        action={action}
        freeze={freeze}
        formInit={formInit}
       />
      )}
    </div>
    {hasValidRowData(rowData) && (
     <div className='col-span-2 p-3 border_left_divider'>
      <MRVListingQuotation
       root={root}
       tableColumn={columnData}
       tableData={rowData}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
       selectedRow={editMRVId}
       action={action}
       isView={isView}
       isEdit={isEdit}
       isDelete={isDelete}
       freeze={freeze}
       handleCardActions={handleCardActions}
      />
     </div>
    )}
   </div>
   {deleteConfirmation && (
    <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />
   )}
   {openModal && (
    <MRVModal
     subId={editMRVId}
     tranId={tranId}
     open={openModal}
     modalTitle={modalType}
     handleClose={handleCloseModal}
    />
   )}
  </div>
 );
};

export default MrvQuotation;
