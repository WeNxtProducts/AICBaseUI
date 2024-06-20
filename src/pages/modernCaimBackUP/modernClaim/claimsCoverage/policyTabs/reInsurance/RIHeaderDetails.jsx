import React from 'react';

const RIHeaderDetails = () => {
 const renderRI = (key, val) => (
  <div className='col-span-2 grid grid-cols-8 gap-3 items-center'>
   <div className='col-span-1'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <p className='key_value'>{val}</p>
   </div>
  </div>
 );

 return (
  <div className='grid grid-cols-2 gap-3 mt-3'>
   {renderRI('Policy No', 'P/1022/1982912/19219')}
   {renderRI('Claim No', 'C/2981/0192/090/090')}
   {renderRI('Claim Paid Date', '12/12/2024')}
  </div>
 );
};

export default RIHeaderDetails;
