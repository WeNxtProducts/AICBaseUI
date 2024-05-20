import React, { createContext } from 'react';
import PolicyDetails from './PolicyDetails';
import surrenderJSON from '../../getFormFields/process.json';
import SurrenderPanels from './paymentDetails/SurrenderPanels';
import './SurrenderPayment.scss';

export const SurrenderPaymentContext = createContext();

const SurrenderPayment = () => {
 const data = { surrenderJSON };

 return (
  <SurrenderPaymentContext.Provider value={data}>
   <div className='surrender-payment claims'>
    <div className='main-screen p-2'>
     <PolicyDetails />
    </div>
    <div className='mt-4'>
     <SurrenderPanels />
    </div>
   </div>
  </SurrenderPaymentContext.Provider>
 );
};

export default SurrenderPayment;
