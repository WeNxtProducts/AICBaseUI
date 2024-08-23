import React from 'react';
import CustomInput from './../../../components/customFieldComponents/customInput/CustomInput';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PolicyDetails from './policyDetails/PolicyDetails';

const EndorsementHeader = () => {
 return (
  <div className='endo_header'>
   <p className='ml-2 top_style'>Policy History</p>
   {/* <div className='field_style flex items-center'>
    <p className='field_label'>Policy Number</p>
    <div className='large-input ml-10'>
     <CustomInput placeholder='enter number' size='large' />
    </div>
   </div>
   <div className='search-btn mt-7'>
    <Button className='se_btn'>
     <div className='flex items-center'>
      <p className='me-2'>Search</p>
      <SearchOutlined />
     </div>
    </Button>
   </div> */}
   <div className='mt-5'>
    <PolicyDetails />
   </div>
  </div>
 );
};

export default EndorsementHeader;
