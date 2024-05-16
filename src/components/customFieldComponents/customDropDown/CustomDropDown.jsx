import React, { useEffect, useRef, useState } from 'react';
import { Input, Select } from 'antd';
import './CustomDropDown.scss';
// import 'antd/dist/reset.css';

const { Option } = Select;

const CustomDropDown = ({
 value,
 options = [],
 onChange,
 name,
 size = 'large',
 firstFieldRef = null,
 disabled = false,
}) => {
 const fieldSize = {
  small: { code: '1/4', desc: '3/4', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };
 const inputRef = useRef(null);
 const [selected, setSelected] = useState({});

 useEffect(() => {
  if (firstFieldRef?.current) {
   firstFieldRef.current.focus();
  }
 }, [options]);

 const handleDescriptionData = check => {
  const currentValueObj = options?.find(item => {
   return item?.value == check;
  });
  if (currentValueObj !== undefined) setSelected(currentValueObj);
 };

 useEffect(() => {
  handleDescriptionData(value);
 }, [value, options]);

 const handleOnChange = dropValue => {
  handleDescriptionData(dropValue);
  onChange(dropValue);
 };

 const customFilterOption = (input, option) => {
  const inputLowerCase = input?.toLowerCase();
  const optionValueLowerCase = option?.value?.toString().toLowerCase();
  const optionLabelLowerCase = option?.key?.toLowerCase();
  return (
   optionValueLowerCase.includes(inputLowerCase) ||
   optionLabelLowerCase.includes(inputLowerCase)
  );
 };

 const sharedProps = {
  showSearch: true,
  // allowClear: true,
  className: 'code-select-field',
  filterOption: customFilterOption,
 };

 return (
  <div
   name={name}
   className={`flex w-${fieldSize[size].main} custom-dropdown-main`}>
   <div className={`w-${fieldSize[size].code}`}>
    <Select
     value={value}
     onChange={handleOnChange}
     disabled={disabled}
     ref={firstFieldRef}
     placeholder='code'
     popupClassName={`my-custom-select-dropdown-${size}`}
     optionLabelProp='value'
     {...sharedProps}>
     {options?.map((item, index) => (
      <Option key={`${item?.label}-${index}`} value={item?.value}>
       <div className='flex'>
        <div className='w-2/5'>
         <p className='content-pop'>{item?.value}</p>
        </div>
        <div className='w-3/5 overflow-auto whitespace-normal'>
         <p className='content-pop'>{item?.label}</p>
        </div>
       </div>
      </Option>
     ))}
    </Select>
   </div>
   <div
    onClick={() => inputRef.current.focus()}
    className={`w-${fieldSize[size].desc} relative select-none`}>
    <Input
     disabled={disabled}
     value={selected?.label}
     className='pointer-events-none'
     placeholder='description'
     tabIndex={-1}
    />
   </div>
  </div>
 );
};

export default CustomDropDown;

//  dropdownRender={menu => <div className='checking'>{menu}</div>}
