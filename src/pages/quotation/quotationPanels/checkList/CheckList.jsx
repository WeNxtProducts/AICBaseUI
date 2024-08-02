import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../Quotation';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../../services/useApiRequests';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import showNotification from '../../../../components/notification/Notification';
import ListDetails from './ListDetails';
import MRVListingQuotation from '../../mrvQuotation/MRVHelper/MRVListing';

const Checklist = ({ tranId }) => {
 const { QuotationJSON, handleNext } = useContext(StepperContext);
 const { mrvListingId } = QuotationJSON;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const getChecklistDetails = useApiRequests('getPreClaimDate', 'POST');
 const [listItemData, setListItemData] = useState([]);
 const [editMRVId, setEditMRVId] = useState('');

 const MRVListing = () => {
  if (tranId) {
   const queryId = getQueryId('getCheckListList', mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 };

 useEffect(() => {
  if (tranId) {
   MRVListing();
  }
 }, [tranId]);

 const handleEdit = async item => {
  setEditMRVId(item?.Group_Code);
  try {
   const response = await getChecklistDetails(
    { queryParams: { tranId, groupCode: item?.Group_Code } },
    { queryId: 155 },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
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
    />
   </div>
   <div className='col-span-2 p-2 border_left_divider'>
    {rowData?.length > 0 && (
     <MRVListingQuotation
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
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
