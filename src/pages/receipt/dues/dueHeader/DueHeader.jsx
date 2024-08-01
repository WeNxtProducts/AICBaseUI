import React from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

const DueHeader = () => {
 return (
  <div className='due_header'>
   <div className='head-container'>
    <Checkbox />
    <span className='header_label'>Multi-select</span>
   </div>
   <div className='head-container'>
    <span className='header_label'>Overview print</span>
    <PrinterOutlined className='printer_icon' />
   </div>
   <div className='head-container'>
    <span className='header_label'>Detailed print</span>
    <PrinterOutlined className='printer_icon' />
   </div>
  </div>
 );
};

export default DueHeader;
