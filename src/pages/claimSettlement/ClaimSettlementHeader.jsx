import React from 'react';

const ClaimSettlementHeader = () => {
 return (
  <div className='claim_header mt-3 mb-6 grid grid-cols-2 gap-2 p-5'>
   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Claim number</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>23/000/8007</p>
    </div>
   </div>

   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Policy Number</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>P/100/23/0992/2000</p>
    </div>
   </div>

   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Assured Code</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>CUST003</p>
    </div>
   </div>

   <div className='w-full flex items-center'>
    <div className='w-1/5 claim-title'>Assured Name</div>
    <div className='w-1/12 text-center'>
     <p className='claim-title'>-</p>
    </div>
    <div>
     <p className='ml-3 claim-value'>xaweqw</p>
    </div>
   </div>
  </div>
 );
};

export default ClaimSettlementHeader;
