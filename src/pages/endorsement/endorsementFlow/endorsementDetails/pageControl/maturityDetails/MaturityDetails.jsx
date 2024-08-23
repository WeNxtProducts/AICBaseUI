import React, { useEffect } from 'react';

const MaturityDetails = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (!dataLoaded) console.log('MaturityDetails');
  else console.log('MaturityDetails Loaded');
 }, [dataLoaded]);

 return (
  <div>
   <p>MaturityDetails</p>
  </div>
 );
};

export default MaturityDetails;
