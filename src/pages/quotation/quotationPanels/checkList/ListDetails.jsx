import React, { useEffect, useState } from 'react';
import DetailsTable from './DetailsTable';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';

const ListDetails = ({ listItemData, refreshData, tranId, selectedRow }) => {
 const updateFlag = useApiRequests('updateProposalChecklistFlag', 'POST');
 const updateFlagBulk = useApiRequests(
  'updateProposalChecklistFlagBulk',
  'POST',
 );
 const [rowData, setRowData] = useState([]);
 const [openUpload, setOpenUpload] = useState(false);

 useEffect(() => {
  setRowData(listItemData);
 }, [listItemData]);

 const handleSelect = async (index, field, value, item) => {
  //   setRowData(prevData => {
  //    const newData = [...prevData];
  //    newData[index] = { ...newData[index], [field]: value };
  //    return newData;
  //   });

  try {
   const response = await updateFlag('', {}, { id: item?.ID, flag: value });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    refreshData();
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleBulkFlag = async status => {
  const pathParams = {
   id: tranId,
   groupCode: selectedRow,
   flag: status ? 'Y' : 'N',
  };
  try {
   const response = await updateFlagBulk('', {}, pathParams);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    showNotification.SUCCESS(response?.status_msg);
    refreshData();
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleUpload = item => {
  console.log('item : ', item);
  setOpenUpload(true);
 };

 const handleClose = () => {
  setOpenUpload(false);
 };

 return (
  <div className='modern_checklist_claim'>
   <div className='mt-4'>
    {rowData?.length > 0 && (
     <DetailsTable
      tableData={rowData}
      handleSelect={handleSelect}
      handleBulkFlag={handleBulkFlag}
      handleUpload={handleUpload}
     />
    )}
   </div>
  </div>
 );
};

export default ListDetails;
