import React, { useEffect } from 'react';
import PremiumView from './PremiumView';
import OtherPolicies from './OtherPolicies';
import Coverage from './coverage/Coverage';

const PolicyViewCheck = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (dataLoaded) console.log('PolicyViewCheck ');
 }, [dataLoaded]);

 return (
  <div className='policy_view_check'>
   <div className='premium_policies mt-4'>
    <PremiumView />
    <OtherPolicies />
   </div>
   <Coverage />
  </div>
 );
};

export default PolicyViewCheck;
