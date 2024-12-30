import React from 'react';
import { notification_options } from '../../../../../../components/tableComponents/sampleData';
import { Button, Select } from 'antd';

const PolicyHeaderAndTotal = () => {
 const renderPairs = (key, val) => (
  <div className='col-span-1 grid grid-cols-3 gap-3 items-center'>
   <div className='col-span-1'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <p className='key_value'>{val}</p>
   </div>
  </div>
 );

 const renderTotals = (key, val, curr) => (
  <div className='col-span-1 grid grid-cols-3 gap-3 items-center'>
   <div className='col-span-1'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <div className='flex items-center justify-between min-h-8 amount_field_curr'>
     <p>{val}</p>
     <p>{curr}</p>
    </div>
   </div>
  </div>
 );

 const renderEstimateCode = key => (
  <div className='col-span-1 grid grid-cols-3 gap-3 items-center'>
   <div className='col-span-1'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <Select className='estimate_cost_select' placeholder='None'>
     {notification_options?.map(item => (
      <Select.Option key={item.value} value={item.value}>
       {`${item?.value}${item?.value !== item?.label ? ` - ${item?.label}` : ''}`}
      </Select.Option>
     ))}
    </Select>
   </div>
  </div>
 );

 return (
  <div className='policy_header_total'>
   <div className='grid grid-cols-2 gap-3'>
    {renderPairs('Policy No', 'P/1022/1982912/19219')}
    {renderPairs('Pol Start Date', '12/12/2022')}
    {renderPairs('Claim No', 'C/2981/0192/090/090')}
    {renderPairs('Prod Code', 'GT282UW8')}
    {renderPairs('Cover Desc', 'Checkque')}
    <div className='col-span-1' />
    <div className='mt-2 col-span-2 grid grid-cols-2'>
     {renderTotals('Total Bonus', '20,000', 'USD')}
     {renderTotals('Total Deduction', '20,000', 'USD')}
    </div>
    <hr className='col-span-2 pol_head_divider' />
    <div className='mt-1 col-span-2 grid grid-cols-2 gap-3'>
     {renderEstimateCode('Estimate Code')}
     {renderTotals('Gross Amount', '')}
     <div className='col-span-1' />
     {renderTotals('Net Amount', '')}
    </div>
   </div>
   <div className='flex justify-between pol_actions_buttons'>
    <Button>Save</Button>
    <Button>Refer</Button>
    <Button>Reopen</Button>
    <Button>Settlement</Button>
   </div>
  </div>
 );
};

export default PolicyHeaderAndTotal;
