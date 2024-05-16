import React, { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import './CodeWithNumber.scss';

const CodeWithNumber = ({
 size = 'large',
 name,
 value,
 onChange,
 disabled = false,
}) => {
 const [phoneNumber, setPhoneNumber] = useState({
  code: '',
  number: '',
 });
 const fieldSize = {
  small: { code: '1/4', desc: '3/4', main: '2/5' },
  medium: { code: '4/12', desc: '8/12', main: '3/5' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };
 const options = [
  { value: '+91', label: '+91' },
  { value: '+255', label: '+255' },
 ];

 useEffect(() => {
  const splitString = String(value);
  const splitNumbers = splitString?.includes('+')
   ? splitString?.split('-')
   : ['', splitString];
  setPhoneNumber({
   code: splitNumbers[0] || '',
   number: splitNumbers[1] || '',
  });
 }, [value]);

 const handleCodeAndNumber = (value, key) => {
  const updateNumber = {
   ...phoneNumber,
   [key]: key === 'code' ? value : value.target.value,
  };
  setPhoneNumber(updateNumber);
  const formattedPhoneNumber = updateNumber?.code + '-' + updateNumber?.number;
  onChange(formattedPhoneNumber);
 };

 return (
  <div
   name={name}
   className={`flex w-${fieldSize[size].main} code-with-number-field`}>
   <div className={`w-${fieldSize[size].code}`}>
    <Select
     className='code-select-fields'
     showSearch
     placeholder='Country code'
     value={phoneNumber?.code || undefined}
     disabled={disabled}
     options={options}
     onChange={value => handleCodeAndNumber(value, 'code')}
    />
   </div>
   <div className={`w-${fieldSize[size].desc} number-field`}>
    <Input
     className='code-select-fields description-field-popover'
     disabled={disabled}
     placeholder='Number'
     value={phoneNumber?.number}
     onChange={value => handleCodeAndNumber(value, 'number')}
    />
   </div>
  </div>
 );
};

export default CodeWithNumber;
