import React from 'react';
import CheckListTable from './CheckListTable';
import CheckListDetails from './CheckListDetails';
import { Divider } from 'antd';

const CheckList = () => {
 return (
  <div className='checklist p-3'>
   <CheckListTable />
   <Divider className='table-divider'/>
   <CheckListDetails />
  </div>
 );
};

export default CheckList;
