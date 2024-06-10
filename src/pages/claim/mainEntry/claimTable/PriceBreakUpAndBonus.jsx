import React from 'react';
import Bonus from './Bonus';
import ClaimDeductionBreakUp from './ClaimDeductionBreakUp';

const PriceBreakUpAndBonus = () => {
 const renderTotals = fieldName => (
  <div className='total_container'>
   <p className='mb-2'>{fieldName}</p>
   <div className='total_value'>500</div>
  </div>
 );

 return (
  <div className='mb-4'>
   <div className='p-0 container'>
    <div className='left-half'>
     <ClaimDeductionBreakUp />
    </div>
    <div className='divider' />
    <div className='right-half'>
     <Bonus />
    </div>
   </div>
   <div className='total_details mt-3'>
    <hr className='field_divider' />
    <div className='mt-4 field_name_style   '>
     {renderTotals('Net Payable')}
     {renderTotals('Excess Amount')}
     {renderTotals('Advance Premium')}
    </div>
   </div>
  </div>
 );
};

export default PriceBreakUpAndBonus;
