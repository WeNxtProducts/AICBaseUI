import React from 'react';
import ClaimCheckbox from './claimCoverDetails/ClaimCoverDetails';

const ClaimList = () => {
 const elements = Array.from({ length: 4 }, (_, i) => i);

 return (
  <div className='grid grid-cols-8 gap-2 mt-3'>
   {elements.map(i => (
    <div key={i} className='col-span-2'>
     <ClaimCheckbox />
    </div>
   ))}
  </div>
 );
};

export default ClaimList;
