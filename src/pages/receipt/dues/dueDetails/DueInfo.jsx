import React from 'react';

const DueInfo = ({ dueDetail }) => {
 const { RP_CURR_CODE = '-', RP_DUE_DT = 0, RP_PYBL_LC_AMT = 0, RP_PYBL_FC_AMT = 0 } = dueDetail;
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
    <div className='col-span-2 grid grid-cols-2'>{renderFields('Currency Code', RP_CURR_CODE)}</div>
    <div className='col-span-1'>{renderFields('Policy Due Date', RP_DUE_DT)}</div>
    <div className='col-span-1'>{renderFields('Exchange Rate', '2520.00')}</div>
    <div className='col-span-1'>{renderFields('Total Amount FC', RP_PYBL_FC_AMT)}</div>
    <div className='col-span-1'>{renderFields('Total Amount LC', RP_PYBL_LC_AMT)}</div>
   </div>
  </div>
 );
};

export default DueInfo;
