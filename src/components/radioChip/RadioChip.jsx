import React, { useEffect, useState } from 'react';
import './RadioChip.scss';

const RadioChip = ({ items, selectedValue, onSelectionChange, type, main }) => {
 return (
  <div className='container'>
   <div className='list'>
    {items?.map(item => (
     <div className='form-element' key={item?.value}>
      <input
       type='radio'
       name={`${main}-${type}`}
       value={item.value}
       id={item.value}
       checked={selectedValue === item.value}
       onChange={() => onSelectionChange(item.value, type, main)}
      />
      <label htmlFor={item.value}>
       <div className='title'>{item.label}</div>
       <div className='checkmark'></div>
      </label>
     </div>
    ))}
   </div>
  </div>
 );
};

export default RadioChip;
