import React from 'react';
import { Button } from 'antd';

const DecisionBox = () => {
 return (
  <div className='decision_box mt-4'>
   <div className='grid grid-cols-11'>
    <div className='col-span-5 flex justify-center items-center first_box'>
     <Button className='mr-2 reject'>Reject</Button>
     <Button className='ml-2 approve'>Approve</Button>
    </div>
    <div className='col-span-1 or-style'>or</div>
    <div className='col-span-5 p-3 second_box'>
     <p className='dec-title'>UW Decision</p>
    </div>
   </div>
  </div>
 );
};

export default DecisionBox;
