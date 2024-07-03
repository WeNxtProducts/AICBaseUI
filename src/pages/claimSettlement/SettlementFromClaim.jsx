import React from 'react';
import ClaimList from './ClaimList';
import { Divider } from 'antd';

const SettlementFromClaim = () => {
 return (
  <div className='settlement_from_claim p-2'>
   <div className='flex items-center'>
    <p className='ref_no_font'>Reference No</p>
    <div className='ml-7 ref_no_box'>
     <p>REF No-490</p>
    </div>
   </div>
   <div className='Claim_list'>
    <ClaimList />
   </div>
   <Divider />
  </div>
 );
};

export default SettlementFromClaim;
