import React, { useContext } from 'react';
import { ClaimSettlementContext } from './ClaimSettlement';

const ClaimSettlementHeader = () => {
 const { headerDetails, CH_REF_NO } = useContext(ClaimSettlementContext);
 const { CLM_CLAIM_NO, CLM_POL_NO } = headerDetails[0];

 return (
  <div className='claim_header mt-3 mb-6 grid grid-cols-2 gap-2 p-5'>
   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Reference No</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>{CH_REF_NO}</p>
    </div>
   </div>

   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Claim No</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>{CLM_CLAIM_NO}</p>
    </div>
   </div>

   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Policy No</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>{CLM_POL_NO}</p>
    </div>
   </div>
  </div>
 );
};

export default ClaimSettlementHeader;
