import { Button } from 'antd';
import React from 'react';

const ClaimTotal = () => {
 const renderPairs = (key, val) => (
  <div className='col-span-1 grid grid-cols-3 gap-3 items-center'>
   <div className='col-span-1'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <div className='flex items-center justify-between min-h-8 amount_field_curr'>
     <p>{val}</p>
    </div>
   </div>
  </div>
 );

 return (
  <div className='mt-5 summary_form'>
   <p className='header-font pl-1'>Total Summary</p>
   <div className='mt-4 grid grid-cols-2 gap-3'>
    {renderPairs('Gross Estimate Local Currency', '')}
    {renderPairs('Settlement Start Date', '')}
    {renderPairs('Total Deduction Local Currency', '')}
    {renderPairs('Advance Premium', '')}
    {renderPairs('Accumulated Profit LC', '')}
    {renderPairs('Total Charge Amount', '')}
    {renderPairs('Net Payable / Setl Local Currency', '')}
    {renderPairs('Units Amount LC', '')}
    {renderPairs('Excess Amount', '')}
   </div>
   <div className='flex justify-center mt-10'>
    <Button className='pro_btn'>Process</Button>
   </div>
  </div>
 );
};

export default ClaimTotal;
