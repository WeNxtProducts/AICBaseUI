import React from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import medicalBag from '../../../../assets/medical.png';
import cycle from '../../../../assets/cycle.png';

const MRVListingQuotation = ({
 root = '',
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
 handleCardActions,
 isPremCalc = false,
}) => {
 const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;

 //  useEffect(() => {
 //   scrollToView(selectedRow);
 //  }, [selectedRow,tableData]);

 const scrollToView = id => {
  const panel = document.querySelector(`[data-id='${id}']`);
  console.log('panel : ', panel);
  if (panel) {
   panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
 };

 return (
  <div className='MRV_card pe-2'>
   {tableData?.map((item, index) => (
    <div
     data-id={item?.[highlightKey]}
     key={item?.[highlightKey]}
     className={
      selectedRow == item?.[highlightKey]
       ? `list_card_highlighted_row pb-${
          root !== 'medical' && root !== 'life_assured_details' ? 2 : 0
         }`
       : `list_card pb-${root !== 'medical' && root !== 'life_assured_details' ? 2 : 0}`
     }>
     <div
      className={`action_header flex item-center justify-${action && !freeze ? 'between' : 'end'}`}>
      {action && !freeze && (
       <div
        onClick={e => {
         handleDelete(item);
        }}
        className='pl-2'>
        {/* <Checkbox
         checked={item?.isSelected === 'Y'}
         onChange={e => handleDelete(item)}
        /> */}
        <div className='mrv_checkbox'>
         <input readOnly checked={item?.isSelected === 'Y'} id={index} type='checkbox' />
         <label />
        </div>
       </div>
      )}
      <div className='flex gap-2 pe-3 p-1'>
       {isView && (
        <Tooltip title='View'>
         <EyeOutlined onClick={() => handleEdit(item)} className='mrv_icons' />
        </Tooltip>
       )}
       {isEdit && !freeze && (
        <Tooltip title='Edit'>
         <EditOutlined onClick={() => handleEdit(item)} className='mrv_icons' />
        </Tooltip>
       )}
       {isDelete && !freeze && (
        <Tooltip title='Delete'>
         <DeleteOutlined onClick={() => handleDelete(item)} className='mrv_icons delete_mrv_row' />
        </Tooltip>
       )}
      </div>
     </div>

     {Object.keys(column)?.map(key => (
      <div key={key} className='ml-3 mrv_list items-center grid grid-cols-12 mb-1'>
       <p className='col-span-6 key_font'>{column[key]}</p>
       <p className='col-span-6 value_font'>{item[key]}</p>
      </div>
     ))}
     {root === 'life_assured_details' && (
      <div className='card_action_buttons'>
       <button onClick={() => handleCardActions('Riders', item)}>
        <img src={cycle} />
       </button>
       <button
        className={`${!isPremCalc ? 'is_medical' : ''}`}
        onClick={() => {
         if (isPremCalc) handleCardActions('Medical', item);
        }}>
        <img src={medicalBag} />
       </button>
      </div>
     )}
     {/* {root === 'medical' && (
      <div className='card_action_buttons'>
       <button onClick={() => handleCardActions('Riders')}>
        Doctor fee Details
       </button>
      </div>
     )} */}
    </div>
   ))}
  </div>
 );
};

export default MRVListingQuotation;
