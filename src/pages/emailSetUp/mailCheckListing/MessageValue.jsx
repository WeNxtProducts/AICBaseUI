import React from 'react';
import { mailList } from '../../../components/tableComponents/sampleData';

const MessageValue = ({ onSelectValue }) => {
 const handleFocus = (event, value) => {
  const target = event.currentTarget;
  onSelectValue(value);
  target.classList.add('focus-active');

  setTimeout(() => {
   target.classList.remove('focus-active');
  }, 2000);
 };

 return (
  <div className='message_col'>
   {mailList?.map(item => (
    <p
     tabIndex={0}
     onClick={event => handleFocus(event, item?.label)}
     className='key_values'
     key={item?.value}>
     {item?.label}
    </p>
   ))}
  </div>
 );
};

export default MessageValue;
