import React from 'react';
import './ClaimCoverDetails.scss';

const ClaimCheckbox = () => {
 return (
  <div className='claim-cover-checkbox'>
   <div className='inner_layer flex items-start'>
    <div className='ml-2 mt-2'>
     <p className='policy-number-style'>Policy No: P/09/102/30393/039383</p>
     <p className='policy-desc-style'>Claim No: P/09/102/30393/039383</p>
     <div className='mt-2 flex items-center gap-4'>
      <div>
       <p className='desc-head'>Amount(USD)</p>
       <p className='desc-val'>10,000,000</p>
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
