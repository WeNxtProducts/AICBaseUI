import React from 'react';
import { Checkbox, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const MRVListingScreen = ({ tableColumn = '', tableData = [] }) => {
 return (
  <div className='MRV_card pe-2'>
   {tableData?.map(item => (
    <div key={item?.value} className='list_card'>
     <div className='flex item-center justify-between'>
      <div>
       <Checkbox />
      </div>
      <div className='flex gap-2'>
       <Tooltip title='View'>
        <EyeOutlined className='mrv_icons' />
       </Tooltip>
       <Tooltip title='Edit'>
        <EditOutlined className='mrv_icons' />
       </Tooltip>
       <Tooltip title='Delete'>
        <DeleteOutlined className='mrv_icons delete_mrv_row' />
       </Tooltip>
      </div>
     </div>

     {Object.keys(tableColumn)?.map(key => (
      <div key={key} className='ml-3 mrv_list grid grid-cols-12'>
       <p className='col-span-6 key_font'>{tableColumn[key]}</p>
       <p className='col-span-6 value_font'>{item[key]}</p>
      </div>
     ))}
    </div>
   ))}
  </div>
 );
};

export default MRVListingScreen;
