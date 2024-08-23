import React, { useEffect } from 'react';

const Alteration = ({ currentTab, dataLoaded }) => {
 useEffect(() => {
  if (!dataLoaded) console.log('Alteration ');
  else console.log('Alteration Loaded');
 }, [dataLoaded]);

 return (
  <div>
   <p>Alteration</p>
  </div>
 );
};

export default Alteration;
