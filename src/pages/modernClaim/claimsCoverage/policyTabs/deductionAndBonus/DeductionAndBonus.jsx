import React from 'react';
import Bonus from './Bonus';
import ClaimDeductionBreakUp from './ClaimDeductionBreakUp';

const DeductionAndBonus = () => {
 return (
  <div className='mb-4 price_breakup_bonus'>
   <div className='p-0 container'>
    <div className='left-half'>
     <ClaimDeductionBreakUp />
    </div>
    <div className='divider' />
    <div className='right-half'>
     <Bonus listingId={122} page='Bonus'/>
    </div>
   </div>
  </div>
 );
};

export default DeductionAndBonus;
