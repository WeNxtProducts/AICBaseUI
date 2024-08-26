import React, { useEffect } from 'react';
import AlterCard from './alterCard/AlterCard';
import { alterData } from '../../../../../../components/tableComponents/sampleData';

const Alteration = ({ currentTab, dataLoaded }) => {
 const rowData = alterData;

 useEffect(() => {
  if (dataLoaded) console.log('Alteration ');
 }, [dataLoaded]);

 return (
  <div className=''>
   <AlterCard rowData={rowData} />
  </div>
 );
};

export default Alteration;
