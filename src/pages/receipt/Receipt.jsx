import React, { createContext, useEffect, useState } from 'react';
import ReceiptHeader from './receiptHeader/ReceiptHeader';
import { useSelector } from 'react-redux';
import Dues from './dues/Dues';
import './Receipt.scss';
import useApiRequests from '../../services/useApiRequests';

export const ReceiptContext = createContext();

const Receipt = () => {
 const id = useSelector(state => state?.Receipt?.id);
 const getpolicylist = useApiRequests('getPreClaimDate', 'POST');
 const [multiSelect, setMultiSelect] = useState(false);
 const [policyList, setpolicyList] = useState([]);
 const [selectedPolicy, setSelectedPolicy] = useState('');
 const [amountSummary, setAmountSummary] = useState(null);
 const [isModified, setIsModified] = useState(false);
 const [headerStatus, setHeaderStatus] = useState(null);

 const data = {
  multiSelect,
  setMultiSelect,
  id,
  policyList,
  setpolicyList,
  selectedPolicy,
  setSelectedPolicy,
  amountSummary,
  setAmountSummary,
  isModified,
  setIsModified,
  headerStatus,
  setHeaderStatus,
 };

 const handlePolicyList = async () => {
  const payload = { queryParams: { tranId: id } };
  try {
   const response = await getpolicylist(payload, { queryId: 212 });
   setpolicyList(response?.Data);
   if (response?.Data?.length > 0) {
    setSelectedPolicy(response?.Data[0]?.RP_POL_NO);
   }
  } catch (err) {
   console.error(err);
  }
 };

 useEffect(() => {
  if (id) handlePolicyList();
 }, [id]);

 return (
  <ReceiptContext.Provider value={data}>
   <div className='receipt'>
    <ReceiptHeader />
    <hr className='custom-divider' />
    {id && policyList?.length > 0 && (
     <div className='mt-2'>
      <Dues />
     </div>
    )}
   </div>
  </ReceiptContext.Provider>
 );
};

export default Receipt;
