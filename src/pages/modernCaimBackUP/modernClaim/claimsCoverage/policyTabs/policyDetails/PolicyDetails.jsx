import React from 'react';
import PolicySummary from './policySummary/PolicySummary';
import PolicyListing from './policyListing/PolicyListing';

const PolicyDetails = () => {
 return (
  <div className='grid grid-cols-7 py-1 pe-1'>
   <div className='col-span-5'>
    <PolicySummary />
   </div>
   <div className='col-span-2'>
    <PolicyListing />
   </div>
  </div>
 );
};

export default PolicyDetails;
