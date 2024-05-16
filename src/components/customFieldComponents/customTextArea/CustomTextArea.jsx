import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const CustomTextArea = ({
 value = '',
 onChange,
 placeholder,
 disabled = false,
}) => {
 return (
  <div className='custom-text-area'>
   <TextArea
    value={value}
    autoSize
    disabled={disabled}
    style={{ minHeight: 60, maxHeight: 100 }}
    onChange={onChange}
    placeholder={placeholder}
   />
  </div>
 );
};

export default CustomTextArea;
