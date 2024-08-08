import React from 'react';
import MRVCoverage from '../mrvCoverage/MRVCoverage';
import {
 bankColumn,
 bankData,
} from './../../../../components/tableComponents/sampleData';

const RidersPremium = () => {
 return (
  <div className='riders_premium'>
   <div>
    <MRVCoverage tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default RidersPremium;
