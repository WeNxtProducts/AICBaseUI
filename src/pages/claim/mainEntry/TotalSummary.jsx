import React from 'react';
import TotalFieldsSummary from './TotalFieldsSummary';

const TotalSummary = () => {
 return (
  <div className='grid grid-cols-8'>
   <div className='col-span-8'>
    <p className='header-font pl-1'>Total Summary</p>
   </div>
   <div className='mt-3 col-span-8 grid grid-cols-10'>
    <div className='col-span-9'>
     <TotalFieldsSummary />
    </div>
    <div className='col-span-1'>Buttons</div>
   </div>
  </div>
 );
};

export default TotalSummary;
