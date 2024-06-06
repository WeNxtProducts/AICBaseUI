import React from 'react';

const ClaimDeductionBreakUp = () => {
 const renderHeader = () => (
  <>
   <div className='col-span-3'></div>
   <div className='col-span-3 content_header'>Foriegn Currency</div>
   <div className='col-span-3 content_header'>Local Currency</div>
  </>
 );

 const renderRows = fieldName => (
  <>
   <div className='col-span-3 field_name_style'>{fieldName}</div>
   <div className='col-span-3 field_val_style'>500</div>
   <div className='col-span-3 field_val_style'>2000000</div>
  </>
 );

 return (
  <div>
   <p className='breakup_title'>Claim deduction Breakup</p>
   <div className='breakUpContent p-1'>
    <div className='grid grid-cols-10 items-center gap-y-3 gap-x-3'>
     {renderHeader()}
     {renderRows('O/S Premium')}
     {renderRows('O/S Premium Interest')}
     {renderRows('O/S Loan')}
     {renderRows('O/S Loan Interest')}
    </div>

    <div className='mt-7 field_name_style flex justify-center items-center gap-5'>
     <p>Total Deduction</p>
     <div className='total_value'> </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimDeductionBreakUp;
