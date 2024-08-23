import React, { useEffect, useState } from 'react';
// import { StepperContext } from '../../Quotation';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../../services/useApiRequests';
// import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import showNotification from '../../../../components/notification/Notification';
import ListDetails from './ListDetails';
import MRVListingQuotation from '../../mrvQuotation/MRVHelper/MRVListing';

const Checklist = ({ tranId, proposalNumber, queryID, freeze }) => {
 //  const { QuotationJSON } = useContext(StepperContext);
 //  const { mrvListingId } = QuotationJSON;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const getChecklistDetails = useApiRequests('getPreClaimDate', 'POST');
 const [listItemData, setListItemData] = useState([]);
 const [editMRVId, setEditMRVId] = useState('');
 const [files, setFiles] = useState([]);
 const [first, setFirst] = useState(true);

 const MRVListing = () => {
  if (tranId) {
   //const queryId = getQueryId('getCheckListList', mrvListingId);
   handleMRVListing(queryID, tranId);
  }
 };

 useEffect(() => {
  if (tranId) {
   MRVListing();
  }
 }, [tranId]);

 useEffect(() => {
  if (first && rowData?.length > 0 && proposalNumber) {
   handleEdit(rowData[0]);
   setFirst(false);
  }
 }, [proposalNumber, rowData]);

 const handleGetMediaFiles = async () => {
  try {
   const response = await getChecklistDetails(
    { queryParams: { tranId: proposalNumber } },
    { queryId: 195 },
   );
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setFiles(response?.Data);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleEdit = async item => {
  setEditMRVId(item?.Group_Code);
  try {
   const response = await getChecklistDetails(
    { queryParams: { tranId, groupCode: item?.Group_Code } },
    { queryId: 155 },
   );
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handleGetMediaFiles();
    setListItemData(response?.Data);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const refreshData = () => {
  const payload = { Group_Code: editMRVId };
  handleEdit(payload);
 };

 return (
  <div className='grid grid-cols-9 py-1 pe-1 pl-2'>
   <div className='col-span-7 pe-2'>
    <ListDetails
     listItemData={listItemData}
     tranId={tranId}
     refreshData={refreshData}
     selectedRow={editMRVId}
     Tran_Id={proposalNumber}
     group_code={editMRVId}
     files={files}
     setFiles={setFiles}
     handleGetMediaFiles={handleGetMediaFiles}
     freeze={freeze}
    />
   </div>
   <div className='col-span-2 p-2 border_left_divider'>
    {rowData?.length > 0 && (
     <MRVListingQuotation
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
      freeze={freeze}
      //handleDelete={handleDelete}
      //selectedRow={editMRVId}
      selectedRow={editMRVId}
      highlightKey='Group_Code'
     />
    )}
   </div>
   {/* <button onClick={() => handleNext()}>handleNext</button> */}
  </div>
 );
};

export default Checklist;
