import React, { createContext, useState } from 'react';
import ReceiptHeader from './receiptHeader/ReceiptHeader';
import { useSelector } from 'react-redux';
import Dues from './dues/Dues';
import './Receipt.scss';

export const ReceiptContext = createContext();

const Receipt = () => {
 const id = useSelector(state => state?.Receipt?.id);
 const [multiSelect, setMultiSelect] = useState(false);
 const [policyList, setpolicyList] = useState([]);
 const [selectedPolicy, setSelectedPolicy] = useState('');
 const [amountSummary, setAmountSummary] = useState(null);
 const [isModified, setIsModified] = useState(false);

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
 };

 return (
  <ReceiptContext.Provider value={data}>
   <div className='receipt'>
    <ReceiptHeader />
    <hr className='custom-divider' />
    <div className='mt-2'>
     <Dues />
    </div>
   </div>
  </ReceiptContext.Provider>
 );
};

export default Receipt;
