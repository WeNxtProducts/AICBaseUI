import React, { useEffect } from 'react';

const ClaimDetails = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (!dataLoaded) console.log('ClaimDetails ');
  else console.log('ClaimDetails Loaded');
 }, [dataLoaded]);

 return (
  <div>
   <p>ClaimDetails</p>
  </div>
 );
};

export default ClaimDetails;
