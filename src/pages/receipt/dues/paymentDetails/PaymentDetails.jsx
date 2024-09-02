import React, { useContext, useEffect, useState } from 'react';
import PayForm from './PayForm';
import DueMrvListing from '../../dueMrvListing/DueMrvListing';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import { ReceiptContext } from '../../Receipt';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';

const paymentMethods = [
 { value: 'P', label: 'Cash' },
 { value: 'C', label: 'Cheque' },
 { value: 'CC', label: 'Credit Card' },
 { value: 'AD', label: 'Bank Transfer' },
];

const PaymentDetails = () => {
 const { id: tranId } = useContext(ReceiptContext);
 const getPayDetails = useApiRequests('getPayDetails', 'POST');
 const savePayDetails = useApiRequests('savePayDetails', 'POST');
 const updatePayDetails = useApiRequests('updatePayDetails', 'POST');
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [editMRVId, setEditMRVId] = useState('');
 const [mainValue, setMainValue] = useState(null);

 const MRVListing = () => {
  handleMRVListing(214, tranId);
 };

 useEffect(() => {
  if (tranId) MRVListing();
 }, [tranId]);

 const hasValidRowData = rowData => {
  return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
 };

 const handleEdit = async item => {
  try {
   const response = await getPayDetails('', {
    tranId: item?.ID,
   });
   if (response?.status === 'SUCCESS') {
    setEditMRVId(item?.ID);
    setMainValue(response?.Data);
   } else if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const addOrUpdate = async (apiCall, payload) => {
  try {
   const params = editMRVId ? { editMRVId } : { tranId };
   const response = await apiCall(payload, {}, params);
   if (response?.status === 'SUCCESS') {
    console.log(response?.Data);
   } else if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleSaveOrUpdate = values => {
  console.log(' values  : ', values);
  if (editMRVId) {
   addOrUpdate(updatePayDetails, values);
  } else if (!editMRVId) {
   addOrUpdate(savePayDetails, values);
  }
 };

 return (
  <div className='pay_details mt-10'>
   <div className='grid grid-cols-8'>
    <div className='col-span-6'>
     <p className='pay_title'>Payment Details</p>
     <PayForm
      options={paymentMethods}
      currentValue={mainValue}
      handleSaveOrUpdate={handleSaveOrUpdate}
     />
    </div>
    <div className='col-span-2 mrv_col'>
     {hasValidRowData(rowData) && (
      <DueMrvListing
       tableColumn={columnData}
       tableData={rowData}
       handleEdit={handleEdit}
       selectedRow={editMRVId}
      />
     )}
    </div>
   </div>
  </div>
 );
};

export default PaymentDetails;
