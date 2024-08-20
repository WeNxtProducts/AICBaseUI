import { WarningOutlined } from '@ant-design/icons';
import React from 'react';

const ErrorContent = ({ name }) => {
 return (
  <div className='error_content'>
   <div className='error_title flex items-center'>
    <WarningOutlined className='war_icon' />
    <p className='fix_error'>Fix errors</p>
   </div>
   <ul className='error_list'>
    <li>Description of the first error.</li>
    <li>Description of the second error.</li>
    <li>Description of the third error.</li>
   </ul>
  </div>
 );
};

export default ErrorContent;
