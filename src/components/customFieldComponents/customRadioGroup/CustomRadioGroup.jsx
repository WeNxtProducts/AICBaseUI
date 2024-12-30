import React from 'react';
import { Radio } from 'antd';

const CustomRadioGroup = ({ options, onChange, value }) => {
 return (
  <Radio.Group onChange={onChange} value={value} className='custom-radio-buttons'>
   {options.map(option => (
    <Radio key={option.value} value={option.value}>
     {option.label}
    </Radio>
   ))}
  </Radio.Group>
 );
};

export default CustomRadioGroup;
