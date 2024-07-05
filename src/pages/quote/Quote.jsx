import React, { useState } from 'react';
import './Quote.scss';
import {
 TextInput,
 SelectInput,
 DateInput,
} from '../../components/floatingLabelFields/FLFieldsExports';

const Quote = () => {
 const [inputValue, setInputValue] = useState('');
 const [selectValue, setSelectValue] = useState('');

 return (
  <div className='Quote'>
   <p>Quote.jsx</p>
   <TextInput
    label='Name'
    value={inputValue}
    onChange={e => setInputValue(e.target.value)}
   />

   <SelectInput
    label='Select'
    value={selectValue}
    onChange={value => setSelectValue(value)}
   />

   <DateInput
    label='Date'
    value={inputValue}
    onChange={date => setInputValue(date)}
   />
  </div>
 );
};

export default Quote;
