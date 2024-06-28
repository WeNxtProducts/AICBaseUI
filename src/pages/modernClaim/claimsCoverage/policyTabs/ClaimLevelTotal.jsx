import React, { useContext, useEffect, useState } from 'react';
import { ClaimContext } from '../../ModernClaim';

const ClaimLevelTotal = () => {
 const { claimLevelTotal = {} } = useContext(ClaimContext);
 const [claimValues, setClaimValues] = useState(null);

 useEffect(() => {
  if (claimLevelTotal !== null) {
   setClaimValues(claimLevelTotal);
  }
 }, [claimLevelTotal]);

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
   {claimValues !== null && (
    <div className='grid grid-cols-2 items-center gap-3 mt-2'>
     {renderFields('Gross Amount', claimValues?.CLM_LC_EST_AMT ?? 0)}
     {renderFields('Total Deduction', claimValues?.CLM_DEDU_AMT ?? 0)}
     {renderFields('Total Bonus', claimValues?.CLM_BON_AMT ?? 0)}
     {renderFields('Net Amount', claimValues?.CLM_LC_PAID_AMT ?? 0)}
    </div>
   )}
   <hr className='mt-3 claim_level_divider mr-3' />
  </div>
 );
};

export default ClaimLevelTotal;
