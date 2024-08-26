import React, { useEffect } from 'react';

const ClaimDetails = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (dataLoaded) console.log('ClaimDetails ');
 }, [dataLoaded]);

 return (
  <div>
   <p>ClaimDetails</p>
  </div>
 );
};

export default ClaimDetails;
