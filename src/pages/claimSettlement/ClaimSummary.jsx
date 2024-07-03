import React from 'react';
import { Button } from 'antd';
import { CustomNumberField } from '../../components/commonExportsFields/CommonExportsFields';

const ClaimSummary = () => {
 const renderRow = (title, value) => (
  <div className='col-span-1'>
   <div className='flex items-center'>
    <div className='w-4/12'>
     <p className='label-font'>{title}</p>
    </div>
    <div className='w-1/2 ml-4 pl-1 ref_no_box'>
     <p className='pl-2'>{value}</p>
    </div>
   </div>
  </div>
 );

 const renderInput = (title, value) => (
  <div className='col-span-1'>
   <div className='flex items-center'>
    <div className='w-4/12'>
     <p className='label-font'>{title}</p>
    </div>
    <div className='w-1/2 ml-4'>
     <CustomNumberField
      name='fc_amount'
      placeholder='0'
      value={value?.PFD_FLD_VALUE}
      onChange={e => {
       console.log('e.target.value : ', e.target.value);
      }}
     />
    </div>
   </div>
  </div>
 );

 return (
  <div className='claim_summary px-2 mt-9 mb-10'>
   <div className='grid grid-cols-12 gap-1 mt-2'>
    <div className='col-span-10 grid grid-cols-2 gap-3'>
     {renderRow('Cover Code', 'C001')}
     {renderRow('Payment Date', '12/04/2023')}
     {renderInput('FC Amount', '1000')}
     {renderRow('LC Amount', '780')}
     {renderRow('Settlement Confirmation', 'Y')}
     {renderRow('Claim Pay Date', '12/02/2023')}
    </div>
    <div className='col-span-2'>
     <div className='action-buttons'>
      <div className='flex flex-col items-center gap-3'>
       <Button>Save</Button>
       <Button>Approve</Button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimSummary;
