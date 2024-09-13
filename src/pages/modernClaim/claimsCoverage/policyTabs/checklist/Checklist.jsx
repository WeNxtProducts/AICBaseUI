import React, { useContext, useEffect, useState } from 'react';
import ListDetails from './ListDetails';
import MRVListingScreen from '../MRVListingScreen';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import { getQueryId } from '../../../../../components/commonHelper/QueryIdFetch';
import { ClaimContext } from '../../../ModernClaim';
import useApiRequests from '../../../../../services/useApiRequests';
import showNotification from '../../../../../components/notification/Notification';

const Checklist = () => {
 const { ClaimsJson, id: tranId, selectedPolDetails } = useContext(ClaimContext);
 const { CLM_TRAN_ID } = selectedPolDetails;
 const { mrvListingId } = ClaimsJson;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const getChecklist = useApiRequests('getPreClaimDate', 'POST');
 const [listItemData, setListItemData] = useState([]);
 const [editMRVId, setEditMRVId] = useState('');

 const MRVListing = () => {
  if (CLM_TRAN_ID) {
   const queryId = getQueryId('ClaimCheckList', mrvListingId);
   handleMRVListing(queryId, CLM_TRAN_ID);
  }
 };

 useEffect(() => {
  if (CLM_TRAN_ID) {
   MRVListing();
  }
 }, [CLM_TRAN_ID]);

 const handleEdit = async item => {
  setEditMRVId(item?.Group_Code);
  try {
   const response = await getChecklist(
    { queryParams: { CLM_TRAN_ID: CLM_TRAN_ID, GROUP_CODE: item?.Group_Code } },
    { queryId: 129 },
   );
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setListItemData(response?.Data);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 return (
  <div className='grid grid-cols-7 py-1 pe-1'>
   <div className='col-span-5 pe-2'>
    <ListDetails listItemData={listItemData} />
   </div>
   <div className='col-span-2 p-2 border_left_divider'>
    {rowData?.length > 0 && (
     <MRVListingScreen
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
      //  handleDelete={handleDelete}
      //  selectedRow={editMRVId}
      selectedRow={editMRVId}
      highlightKey='Group_Code'
     />
    )}
   </div>
  </div>
 );
};

export default Checklist;
