import React, { useEffect } from 'react';
import PremiumView from './PremiumView';
import OtherPolicies from './OtherPolicies';

const PolicyViewCheck = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (!dataLoaded) {
   console.log('PolicyViewCheck ');
  } else {
   console.log('PolicyViewCheck AlreadyLoaded');
  }
 }, [dataLoaded]);

 return (
  <div className='policy_view_check'>
   <div className='premium_policies'>
    <PremiumView />
    <OtherPolicies />
   </div>
  </div>
 );
};

export default PolicyViewCheck;
