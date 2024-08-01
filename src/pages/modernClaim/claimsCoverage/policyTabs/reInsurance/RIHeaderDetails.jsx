import React from 'react';

const RIHeaderDetails = ({ claimDetails, policyNumber }) => {
 const renderRI = (key, val) => (
  <div className='col-span-1 grid grid-cols-8 gap-3 items-center'>
   <div className='col-span-2'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <p className='key_value'>{val}</p>
   </div>
  </div>
 );

 return (
  <div className='grid grid-cols-2 gap-3 mt-3'>
   {renderRI('Policy No', claimDetails?.CLM_CLAIM_NO)}
   {renderRI('Claim No', policyNumber)}
   {/* {renderRI('Treaty Cover', 'TTY3212')}
   {renderRI('Currency', 'Tanzania Shillings')} */}
  </div>
 );
};

export default RIHeaderDetails;
