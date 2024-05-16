import { Button } from 'antd';
import React from 'react';

const SummaryActionButtons = ({ onSubmit }) => {
 return (
  <div className='action-buttons'>
   <div className='flex flex-col items-center'>
    <button type='submit'>Save</button>
    <Button>Beneficiary</Button>
    <Button>RI Recovery</Button>
    <Button>FAC Estimate</Button>
    <Button>FAC Settlement</Button>
    <Button>Approve</Button>
   </div>
  </div>
 );
};

export default SummaryActionButtons;
