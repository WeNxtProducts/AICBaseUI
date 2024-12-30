import React from 'react';
import PolicyValues from './PolicyValues';
import ValueButtons from './ValueButtons';

const PolicyDetails = () => {
 return (
  <div className='policy_details'>
   <div className='grid grid-cols-12'>
    <div className='col-span-10'>
     <PolicyValues />
    </div>
    <div className='col-span-2'>
     <ValueButtons />
    </div>
   </div>
  </div>
 );
};

export default PolicyDetails;
