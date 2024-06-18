import React from 'react';
import { Checkbox } from 'antd';
import './CustomCheckList.scss';

const CustomCheckList = ({ options = [], value = [], onChange }) => {
 const fieldSize = '3/5';
 const indeterminate = value.length > 0 && value.length < options.length;

 const handleCheckboxChange = itemValue => {
  let newValue;
  if (value.includes(itemValue)) newValue = value.filter(v => v !== itemValue);
  else newValue = [...value, itemValue];
  onChange(newValue);
 };

 return (
  <div className={`custom_transfer_box w-${fieldSize}`}>
   <div className='p-1 all_check'>
    <Checkbox
     onChange={e => {
      if (e.target.checked) {
       onChange(options.map(item => item.value));
      } else {
       onChange([]);
      }
     }}
     indeterminate={indeterminate}
     checked={options.length === value.length}
    />
    <span className='ml-2 checkbox_val'>{value?.length} selected</span>
    <hr className='box_divider mt-1' />
   </div>

   <div className='pl-1 mt-1 pr-1'>
    {options?.map(item => (
     <div key={item?.value} className='pb-1 pt-1'>
      <Checkbox
       onChange={() => handleCheckboxChange(item.value)}
       checked={value?.includes(item.value)}>
       <span className='mail_name'>{item.label}</span>
      </Checkbox>
     </div>
    ))}
   </div>
  </div>
 );
};

export default CustomCheckList;
