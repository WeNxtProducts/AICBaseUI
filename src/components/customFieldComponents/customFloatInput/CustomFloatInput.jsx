import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './CustomFloatInput.scss';

const CustomFloatInput = ({ value, onChange, id, label }) => {
 const [showPassword, setShowPassword] = useState(false);

 const handleTogglePassword = () => setShowPassword(!showPassword);

 return (
  <div className='float-label-input'>
   <input
    value={value}
    type={showPassword ? 'text' : 'password'}
    id={id}
    placeholder=' '
    onChange={onChange}
   />
   <label for={id}>{label}</label>
   <button type='button' onClick={() => handleTogglePassword()}>
    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
   </button>
  </div>
 );
};

export default CustomFloatInput;
