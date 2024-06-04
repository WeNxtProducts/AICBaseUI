import React from 'react';
import CoverageCheckBox from '../CoverageCheckBox';
import CoverageTable from './CoverageTable';

const CoverageDetails = () => {
 return (
  <div className='col-span-9'>
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Coverage</p>
   </div>
   <CoverageCheckBox />
   <CoverageTable />
  </div>
 );
};

export default CoverageDetails;
