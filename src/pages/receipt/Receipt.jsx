import React, { createContext } from 'react';
import ReceiptHeader from './receiptHeader/ReceiptHeader';
import Dues from './dues/Dues';
import './Receipt.scss';

export const ReceiptContext = createContext();

const Receipt = () => {
 const data = {};

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
