import React from 'react';
import { Button } from 'antd';

const ActionButtons = () => {
 return (
  <div className='action-buttons'>
   <div className='flex flex-col items-center'>
    <Button>View Checklist</Button>
    <Button>View Document</Button>
    <Button>Edit</Button>
    <Button>Prem Calc</Button>
   </div>
  </div>
 );
};

export default ActionButtons;
