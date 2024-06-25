import React from 'react';

const ClaimLevelTotal = () => {
 const renderFields = (fieldName, fieldValue) => (
  <div className='col-span-1 grid grid-cols-3 items-center'>
   <div className='col-span-1 label_small_font'>{fieldName}</div>
   <div className='col-span-2 amount_field_curr'>
    <p>{fieldValue}</p>
   </div>
  </div>
 );

 return (
  <div className='claim_level_total'>
   <p className='mrv_header'>Claim Details</p>
   <div className='grid grid-cols-2 items-center gap-3 mt-2'>
    {renderFields('Gross Amount', '20,000')}
    {renderFields('Total Deduction', '20,000')}
    {renderFields('Total Bonus', '20,000')}
    {renderFields('Net Amount', '20,000')}
   </div>
   <hr className='mt-3 claim_level_divider mr-3' />
  </div>
 );
};

export default ClaimLevelTotal;
