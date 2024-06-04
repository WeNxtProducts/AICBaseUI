import React from 'react';
import ClaimTypeSelect from './ClaimTypeSelect';
import { Divider } from 'antd';
import CoverageDetails from './CoverageDetails';
import TotalSummary from './TotalSummary';

const MainEntry = () => {
 return (
  <div className='front-form p-3'>
   <div className='grid grid-cols-8 gap-1'>
    <div className='propasal-entry-form col-span-7'>
     <ClaimTypeSelect />
    </div>
   </div>
   <Divider className='form-divide' />
   <div className='propasal-entry-form grid grid-cols-10 gap-1'>
    <CoverageDetails />
   </div>
   <div className='propasal-entry-form'>
    <TotalSummary />
   </div>
  </div>
 );
};

export default MainEntry;
