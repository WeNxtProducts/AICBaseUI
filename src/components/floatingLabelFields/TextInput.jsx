import React from 'react';
import { Input } from 'antd';
import FloatLabel from './FloatLabel';

const TextInput = ({ value = '', onChange, label = '' }) => {
 return (
  <FloatLabel label={label} value={value}>
   <Input
    type='text'
    className='float-control'
    value={value}
    onChange={onChange}
   />
  </FloatLabel>
 );
};

export default TextInput;
