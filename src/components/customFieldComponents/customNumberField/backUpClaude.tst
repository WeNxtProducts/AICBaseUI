import React, { useEffect, useState, useRef } from 'react';
import '../customInput/CustomInput.scss';
import { Input } from 'antd';

// Utility function for formatting numbers as currency
const formatCurrency = (value = '', locale = 'en-US') => {
 // Check if the value ends with a dot
 const endsWithDot = value.endsWith('.');

 // Remove commas and parse the number
 const number = parseFloat(value.replace(/,/g, ''));

 if (isNaN(number)) return '';

 // Format the number
 let formatted = number.toLocaleString(locale, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
 });

 // If the original value ended with a dot, append it to the formatted result
 if (endsWithDot) {
  formatted += '.';
 }

 return formatted;
};

const CustomNumberField = ({
 placeholder,
 onChange,
 value,
 size = 'large',
 name,
 firstFieldRef = null,
 disabled = false,
 readOnly = false,
}) => {
 const [formattedValue, setFormattedValue] = useState(value?.toString() || '');
 const inputRef = useRef(null);

 const fieldSize = {
  small: { code: '1/3', desc: '2/3', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/5' },
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };

 useEffect(() => {
  if (firstFieldRef?.current) {
   firstFieldRef.current.focus();
  }
 }, [firstFieldRef]);

 useEffect(() => {
  const mainVal = formatCurrency(value?.toString());
  setFormattedValue(mainVal);
  console.log('mainVal : ', mainVal);
 }, [value]);

 const handleInputChange = e => {
  let inputValue = e.target.value;

  // Remove commas for processing
  const rawValue = inputValue.replace(/,/g, '');

  // Check if the value is a valid number or a valid decimal number
  if (/^\d*\.?\d*$/.test(rawValue)) {
   // If the raw value ends with a decimal or contains decimal with trailing zeros
   const isDecimal = rawValue.includes('.');
   const parts = rawValue.split('.');
   const formatted = isDecimal
    ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
      (parts[1] !== undefined ? `.${parts[1]}` : '.')
    : formatCurrency(rawValue);

   setFormattedValue(formatted);

   console.log('rawValue : ', rawValue, formatted);

   if (onChange) {
    onChange({
     ...e,
     target: {
      ...e.target,
      value: rawValue,
     },
    });
   }
  }
 };

 return (
  <div className={`w-${fieldSize[size].main}`}>
   <Input
    name={name}
    ref={el => {
     inputRef.current = el;
     if (firstFieldRef) {
      firstFieldRef.current = el;
     }
    }}
    type='text'
    className='custom-form-fields number-field'
    placeholder={placeholder}
    readOnly={readOnly}
    value={formattedValue}
    onChange={handleInputChange}
    disabled={disabled}
    inputMode='decimal'
    // dir="rtl"
   />
  </div>
 );
};

export default CustomNumberField;
