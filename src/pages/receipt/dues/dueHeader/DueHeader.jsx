import React, { useContext } from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { ReceiptContext } from '../../Receipt';

const DueHeader = () => {
 const { setMultiSelect } = useContext(ReceiptContext);
 const isMultiSelect = false;

 return (
  <div className='due_header'>
   {isMultiSelect && (
    <div className='head-container'>
     <Checkbox onChange={e => setMultiSelect(e.target.checked)} />
     <span className='header_label'>Multi-select</span>
    </div>
   )}
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
