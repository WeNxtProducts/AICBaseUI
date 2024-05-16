import React, { useState } from 'react';
import './TextInputWithSearchIcon.scss';

const TextInputWithSearchIcon = ({ placeholder, onChange, value }) => {
 const handleChange = e => {
  if (onChange) {
   onChange(e.target.value);
  }
 };

 return (
  <div className='search-container'>
   <input
    type='text'
    className='search-input'
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
   />
   <i className='bi bi-search search-icon' />
  </div>
 );
};

export default TextInputWithSearchIcon;
