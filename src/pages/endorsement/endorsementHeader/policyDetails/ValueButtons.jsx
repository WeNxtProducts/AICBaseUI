import React from 'react';
import { Button } from 'antd';

const ValueButtons = () => {
 return (
  <div className='action-buttons'>
   <div className='flex flex-col items-center'>
    <Button>View Checklist</Button>
    <Button>View Dcuments</Button>
   </div>
  </div>
 );
};

export default ValueButtons;
