import React from 'react';
import PolicyNumberList from './PolicyNumberList';
import PolicyTabs from './policyTabs/PolicyTabs';
import ClaimDetails from './ClaimDetails';

const ClaimsCoverage = () => {
 return (
  <div className='' data-id='claim_tabs'>
   <p className='header-font pl-1'>Coverage</p>
   <div className='mt-3 grid grid-cols-12 coverage_main_grid'>
    <div className='col-span-2 p-0'>
     <PolicyNumberList />
    </div>
    <div className='col-span-10 selected_claim_highlight'>
     <ClaimDetails />
     <PolicyTabs />
    </div>
   </div>
  </div>
 );
};

export default ClaimsCoverage;
