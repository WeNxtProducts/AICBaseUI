import React, { useEffect } from 'react';

const LoanDetails = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (!dataLoaded) console.log('LoanDetails');
  else console.log('LoanDetails Loaded');
 }, [dataLoaded]);

 return (
  <div>
   <p>LoanDetails</p>
  </div>
 );
};

export default LoanDetails;
