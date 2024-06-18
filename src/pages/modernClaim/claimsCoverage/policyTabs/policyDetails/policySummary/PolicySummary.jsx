import React from 'react';
import SummaryHeader from './SummaryHeader';
import PolicyHeaderAndTotal from './PolicyHeaderAndTotal';

const PolicySummary = () => {
 return (
  <div className='policy_details'>
   <SummaryHeader />
   <hr className='divider_summary' />
   <PolicyHeaderAndTotal />
  </div>
 );
};

export default PolicySummary;
