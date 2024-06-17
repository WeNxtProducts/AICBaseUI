import React from 'react';
import PolicyNumberList from './PolicyNumberList';
import PolicyTabs from './policyTabs/PolicyTabs';

const ClaimsCoverage = () => {
 return (
  <div className=''>
   <p className='header-font pl-1'>Coverage</p>
   <div className='mt-3 grid grid-cols-12 coverage_main_grid'>
    <div className='col-span-2 p-2'>
     <PolicyNumberList />
    </div>
    <div className='col-span-10 py-4'>
     <PolicyTabs />
    </div>
   </div>
  </div>
 );
};

export default ClaimsCoverage;
