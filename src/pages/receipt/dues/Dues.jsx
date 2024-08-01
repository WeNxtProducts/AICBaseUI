import React from 'react';
import PolicyList from './policyList/PolicyList';
import DueHeader from './dueHeader/DueHeader';
import DueDetails from './dueDetails/DueDetails';

const Dues = () => {
 return (
  <div className='grid grid-cols-12 dues_main_grid'>
   <div className='col-span-2 p-0'>
    <PolicyList />
   </div>
   <div className='col-span-10 selected_claim_highlight'>
    <DueHeader />
    <DueDetails />
   </div>
  </div>
 );
};

export default Dues;
