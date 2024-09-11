import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import DueMrvListing from '../../dueMrvListing/DueMrvListing';
import DueInfo from './DueInfo';
import { ReceiptContext } from '../../Receipt';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import useMRVListingPayload from '../../../../components/mrvListing/useMRVListingPayload';

const DueDetails = () => {
 const {
  id: tranId,
  selectedPolicy,
  setAmountSummary,
  setIsModified,
  headerStatus,
 } = useContext(ReceiptContext);
 const { rowData, columnData, handleMRVListingPayload } = useMRVListingPayload();
 const getDuesDetails = useApiRequests('getDuesDetails', 'POST');
 const reeiptHeaderGet = useApiRequests('getReceiptHeader', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const saveDueSelected = useApiRequests('saveDueSelected', 'POST');
 const [dueDetail, setDueDetail] = useState(null);
 const [editMRVId, setEditMRVId] = useState('');
 const [selectedDues, setSelectedDues] = useState([]);

 const handleInitStage = () => {
  handleMRVListingPayload({ queryId: 213, tranId, emptranId: selectedPolicy });
  setDueDetail(null);
  setEditMRVId('');
  setSelectedDues([]);
 };

 useEffect(() => {
  if (selectedPolicy) {
   handleInitStage();
  }
 }, [selectedPolicy]);

 const hasValidRowData = rowData => {
  return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
 };

 useEffect(() => {
  if (hasValidRowData(rowData)) {
   const initSTage = {
    receiptProcess: rowData.map(selectedData => ({
     formFields: {
      RP_TRAN_ID: selectedData.ID,
      RP_POL_NO: selectedData.POL_NO,
      RP_PROCESS_YN: selectedData?.Process_YN,
     },
    })),
   };
   setSelectedDues(initSTage);
  }
 }, [rowData]);

 const handleEdit = async item => {
  setEditMRVId(item?.ID);
  try {
   const response = await getDuesDetails('', { tranId: item?.ID });
   if (response?.status === 'SUCCESS') {
    setDueDetail(response?.Data);
   }
  } catch (err) {
   console.error(err);
  }
 };

 const handleGetHeader = async () => {
  try {
   const response = await reeiptHeaderGet('', { tranId });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    const { RH_BATCH_LC_AMT = 0, RH_LC_AMT, RH_POL_NO = '', RH_FLEX_03 = false } = response.Data;
    setIsModified(RH_FLEX_03 === 'Y');
    setAmountSummary({
     receiptHeader: {
      formFields: {
       RH_BATCH_LC_AMT: RH_BATCH_LC_AMT,
       RH_LC_AMT: RH_LC_AMT,
       RH_POL_NO: RH_POL_NO,
      },
     },
    });
    handleInitStage();
   }
  } catch (err) {
   console.log(err);
  }
 };

 const procedureCall = async () => {
  const payload = { inParams: { P_RH_TRAN_ID: tranId } };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'P_UPD_RCPT_BATCH_AMT',
    packageName: 'WNPKG_RECEIPT',
   });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    handleGetHeader();
   }
  } catch (err) {
   console.error(err);
  }
 };

 const handleSaveDueSelected = async () => {
  try {
   const response = await saveDueSelected(selectedDues, {}, { tranId });
   if (response?.status === 'SUCCESS') {
    showNotification.SUCCESS(response?.status_msg);
    procedureCall();
   } else if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   }
  } catch (err) {
   console.error(err);
  }
 };

 const selectIndex = item => {
  setSelectedDues(prevState => {
   const updatedReceiptProcess = prevState.receiptProcess.map(process => {
    if (process.formFields.RP_TRAN_ID === item?.ID) {
     return {
      ...process,
      formFields: {
       ...process.formFields,
       RP_PROCESS_YN: process.formFields.RP_PROCESS_YN === 'Y' ? 'N' : 'Y',
      },
     };
    }
    return process;
   });

   return {
    ...prevState,
    receiptProcess: updatedReceiptProcess,
   };
  });
 };

 return (
  <div className='due_details'>
   <div className='header'>
    <p className='due_count'>
     Total Dues <span>{hasValidRowData(rowData) ? rowData?.length : 0}</span>
    </p>
    {selectedDues?.receiptProcess?.length > 0 && headerStatus?.RH_APPRV_STATUS !== 'A' && (
     <Button className='save-btn' onClick={() => handleSaveDueSelected()}>
      Save
     </Button>
    )}
   </div>
   {hasValidRowData(rowData) ? (
    <div className='due_content'>
     <DueMrvListing
      tableColumn={columnData}
      tableData={rowData}
      isSlide={true}
      handleEdit={handleEdit}
      selectedRow={editMRVId}
      selectIndex={selectIndex}
      selectedCard={selectedDues}
     />
     {dueDetail !== null && <DueInfo dueDetail={dueDetail} />}
    </div>
   ) : (
    <p>No Dues</p>
   )}
  </div>
 );
};

export default DueDetails;
