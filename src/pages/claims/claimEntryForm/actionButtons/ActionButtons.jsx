import React from 'react';
import { Button } from 'antd';

const ActionButtons = () => {
 return (
  <div className='action-buttons'>
   <div className='section-1 flex flex-col items-center'>
    <Button>File Upload</Button>
    <Button>DMS</Button>
   </div>
   <div className='section-2 mt-7 flex flex-col items-center'>
    <Button>Bus Rule</Button>
    <Button>Pre Claim Dtls</Button>
    <Button>Freeze</Button>
    <Button>Close</Button>
    <Button>Claim Decision</Button>
    <Button>Settlement</Button>
    <Button>Re-Open</Button>
    <Button>Pol Details</Button>
    <Button>Reminder</Button>
    <Button>Comments</Button>
   </div>
  </div>
 );
};

export default ActionButtons;
