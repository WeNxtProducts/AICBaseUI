import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../Quotation';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../../services/useApiRequests';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import showNotification from '../../../../components/notification/Notification';
import ListDetails from './ListDetails';
import MRVListingQuotation from '../../mrvQuotation/MRVHelper/MRVListing';

const Checklist = ({ tranId }) => {
 const { QuotationJSON } = useContext(StepperContext);
 const { mrvListingId } = QuotationJSON;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const getChecklist = useApiRequests('getProposalChecklist', 'GET');
 const [listItemData, setListItemData] = useState([]);
 const [editMRVId, setEditMRVId] = useState('');

 const MRVListing = () => {
  if (tranId) {
   const queryId = getQueryId('CheckList', mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 };

 useEffect(() => {
  if (tranId) {
   MRVListing();
  }
 }, [tranId]);

 const handleEdit = async item => {
  console.log('handleEdit :', item);
  setEditMRVId(item?.ID);
  try {
   const response = await getChecklist('', {
    screenCode: 'QUOTATIONENTRY',
    screenName: 'QUOTATIONENTRY',
    tranId: item?.ID,
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setListItemData(response?.Data);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 return (
  <div className='grid grid-cols-9 py-1 pe-1'>
   <div className='col-span-7 pe-2'>
    <ListDetails listItemData={listItemData} />
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
     />
    )}
   </div>
  </div>
 );
};

export default Checklist;
