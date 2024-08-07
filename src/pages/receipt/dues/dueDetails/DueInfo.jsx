import React from 'react';

const DueInfo = () => {
 const renderFields = (label, val) => (
  <div className='col-span-1 grid grid-cols-4 items-center'>
   <p className='col-span-1 form-label'>{label}</p>
   <div className='col-span-2 form-value'>{val}</div>
  </div>
 );

 return (
  <div className='due_info'>
   <p className='info_title'>Policy Reciept Details</p>
   <div className='mt-3 grid grid-cols-2 items-center gap-y-3'>
    <div className='col-span-2 grid grid-cols-2'>
     {renderFields('Currency Code', 'USD')}
    </div>
    <div className='col-span-1'>
     {renderFields('Policy Due Date', '10 - Mar - 2024')}
    </div>
    <div className='col-span-1'>{renderFields('Exchange Rate', '2520.00')}</div>
    <div className='col-span-1'>{renderFields('Total Amount FC', '0')}</div>
    <div className='col-span-1'>{renderFields('Total Amount LC', '0')}</div>
   </div>
  </div>
 );
};

export default DueInfo;
