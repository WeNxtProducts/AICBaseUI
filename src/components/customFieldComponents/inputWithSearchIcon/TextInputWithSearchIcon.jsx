import React, { useState } from 'react';
import './TextInputWithSearchIcon.scss';
import { SearchOutlined } from '@ant-design/icons';

const TextInputWithSearchIcon = ({ placeholder, onChange, value }) => {
 const handleChange = e => {
  if (onChange) {
   onChange(e.target.value);
  }
 };

 return (
  <div className='search-container w-full'>
   <input
    type='text'
    className='search-input'
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
   />
   <SearchOutlined className='search-icon' />
   {/* <i className='bi bi-search search-icon' /> */}
  </div>
 );
};

export default TextInputWithSearchIcon;
