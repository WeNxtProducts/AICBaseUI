import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const CustomTextArea = ({
 value = '',
 onChange,
 placeholder,
 disabled = false,
 size = 'large',
}) => {
 const fieldSize = {
  small: { code: '1/3', desc: '2/3', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };
 return (
  <div className={`custom-text-area w-${fieldSize[size].main}`}>
   <TextArea
    value={value}
    autoSize
    disabled={disabled}
    style={{ height: 40, minHeight: 40, maxHeight: 100 }}
    onChange={onChange}
    placeholder={placeholder}
   />
  </div>
 );
};

export default CustomTextArea;
