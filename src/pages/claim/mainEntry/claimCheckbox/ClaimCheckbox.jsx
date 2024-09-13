import React from 'react';
import './ClaimCheckbox.scss';

const ClaimCheckbox = () => {
 return (
  <div className='claim-checkbox'>
   <div className='inner_layer flex items-start'>
    <input type='checkbox' className='cursor-pointer' />
    <div className='ml-1'>
     <p className='policy-number-style'>Policy No: P/09/102/30393/039383</p>
     <p className='policy-desc-style'>Policy short description </p>
     <div className='mt-2 flex items-center gap-4'>
      <div>
       <p className='desc-head'>Product code</p>
       <p className='desc-val'>1001</p>
      </div>
      <div>
       <p className='desc-head'>Date</p>
       <p className='desc-val'>12-Dec-2023</p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimCheckbox;
