import { Button } from 'antd';
import React from 'react';
import RIHeaderDetails from './RIHeaderDetails';
import RITable from './RITable';

const ReInsurance = () => {
 return (
  <div className='re_insurance me-2'>
   <div className='flex items-center justify-between'>
    <p className='ri_font'>Claim RI</p>
    <Button className='ri_close_btn'>RI Close</Button>
   </div>
   <RIHeaderDetails />
   <RITable />
  </div>
 );
};

export default ReInsurance;
