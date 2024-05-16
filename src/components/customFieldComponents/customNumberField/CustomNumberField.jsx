import React, { useEffect } from 'react';
import '../customInput/CustomInput.scss';
import { Input } from 'antd';

const CustomNumberField = ({
 placeholder,
 onChange,
 value,
 size = 'large',
 name,
 firstFieldRef = null,
 disabled = false,
}) => {
 const fieldSize = {
  small: { code: '1/3', desc: '2/3', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };

 useEffect(() => {
  if (firstFieldRef?.current) {
   firstFieldRef.current.focus();
  }
 }, []);

 return (
  <div className={`w-${fieldSize[size].main}`}>
   <Input
    name={name}
    ref={firstFieldRef}
    type='number'
    className='custom-form-fields number-field'
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    inputmode='numeric'
    // dir="rtl"
   />
  </div>
 );
};

export default CustomNumberField;
