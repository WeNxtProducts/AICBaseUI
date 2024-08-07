import React from 'react';

const PaymentSummary = () => {
 const renderFields = (label, val) => (
  <div className='col-span-1 grid grid-cols-4 items-center'>
   <p className='col-span-1 form-label'>{label}</p>
   <div className='col-span-2 form-value'>{val}</div>
  </div>
 );

 return (
  <div className='pay_summary mt-10'>
   <p className='pay_title'>Payment Summary</p>
   <div className='mt-3 grid grid-cols-2 items-center gap-y-3'>
    <div className='col-span-1'>{renderFields('Amount to be Paid', '0')}</div>
    <div className='col-span-1'>{renderFields('Paid Amount', '0')}</div>
   </div>
  </div>
 );
};

export default PaymentSummary;
