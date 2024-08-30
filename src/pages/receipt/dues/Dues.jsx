import React, { useContext } from 'react';
import DueHeader from './dueHeader/DueHeader';
import DueDetails from './dueDetails/DueDetails';
import PaymentSummary from './paymentSummary/PaymentSummary';
import PaymentDetails from './paymentDetails/PaymentDetails';
import PolicyListView from './policyList/PolicyList';
import { ReceiptContext } from '../Receipt';

const Dues = () => {
 const { amountSummary, isModified } = useContext(ReceiptContext);

 return (
  <div className='grid grid-cols-12 dues_main_grid'>
   <div className='col-span-2 p-0'>
    <PolicyListView />
   </div>
   <div className='col-span-10 selected_claim_highlight'>
    <DueHeader />
    <DueDetails />
   </div>
   {/* <div className='submit_section mt-3 col-span-12 flex justify-end'>
    <Button className='submit_btn'>Submit</Button>
   </div> */}
   {amountSummary !== null && (
    <div className='col-span-12'>
     <PaymentSummary />
    </div>
   )}
   {isModified && (
    <div className='col-span-12'>
     <PaymentDetails />
    </div>
   )}
  </div>
 );
};

export default Dues;
