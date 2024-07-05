import React from 'react';
import { DatePicker } from 'antd';
import FloatLabel from './FloatLabel';
import dayjs from 'dayjs';

const DateInput = ({ value = '', onChange, label = '' }) => {
 return (
  <FloatLabel label={label} value={value}>
   <DatePicker
    className='float-control'
    placeholder=''
    value={value ? dayjs(value) : null}
    onChange={(date, dateString) => {
     onChange(dateString);
    }}
   />
  </FloatLabel>
 );
};

export default DateInput;
