import React, { useEffect } from 'react';
import MRVCoverage from '../mrvCoverage/MRVCoverage';
import { bankColumn, bankData } from './../../../../components/tableComponents/sampleData';

const RidersPremium = () => {
 useEffect(() => {
  console.log('RidersPremium RidersPremium RidersPremium');
 }, []);
 return (
  <div className='riders_premium'>
   <div>
    <MRVCoverage tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default RidersPremium;
