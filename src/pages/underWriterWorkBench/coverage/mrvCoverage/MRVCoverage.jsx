import React, { useEffect } from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import '../../../../styles/components/mrvStyleDue.scss';

const MRVCoverage = ({
 tableColumn = '',
 tableData = [],
 handleEdit,
 handleDelete,
 selectedRow = '',
 action,
 isView = true,
 isEdit = true,
 isDelete = true,
 freeze = false,
 highlightKey = 'ID',
}) => {
 const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;

 return (
  <div className='MRV_card grid grid-cols-6 gap-4 pe-2'>
   {tableData?.map((item, index) => (
    <div
     data-id={item?.[highlightKey]}
     key={item?.[highlightKey]}
     className={`col-span-2 ${
      selectedRow === item?.[highlightKey]
       ? 'list_card_highlighted_row'
       : 'list_card'
     }`}>
     <div
      className={`action_header flex item-center justify-${
       action && !freeze ? 'start' : 'start'
      }`}>
      <div
       onClick={e => {
        handleDelete(item);
       }}
       className='pl-2 flex items-center'>
       <div className='mrv_checkbox'>
        <input
         readOnly
         //checked={item?.isSelected === 'Y'}
         checked={true}
         id={index}
         type='checkbox'
        />
        <label />
       </div>
      </div>
     </div>

     {Object.keys(column)?.map(key => (
      <div
       key={key}
       className='ml-3 mrv_list items-center grid grid-cols-12 mb-1'>
       <p className='col-span-6 key_font'>{column[key]}</p>
       <p className='col-span-6 value_font'>{item[key]}</p>
      </div>
     ))}
    </div>
   ))}
  </div>
 );
};

export default MRVCoverage;
