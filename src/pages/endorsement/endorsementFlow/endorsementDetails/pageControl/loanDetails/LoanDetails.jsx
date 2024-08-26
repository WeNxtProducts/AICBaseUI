import React, { useEffect } from 'react';

const LoanDetails = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (dataLoaded) console.log('LoanDetails');
 }, [dataLoaded]);

 return (
  <div>
   <p>LoanDetails</p>
  </div>
 );
};

export default LoanDetails;
