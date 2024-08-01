import React from 'react';
import CaptureFields from './CaptureFields';
import StatusCard from './StatusCard';

const ReceiptHeader = () => {
 return (
  <div className='receipt_header'>
   <div className='header_align'>
    <div className='fields_container'>
     <p className='title_header'>Reciept Processing</p>
     <CaptureFields />
    </div>
    <div className='recipt_status'>
     <StatusCard />
    </div>
   </div>
  </div>
 );
};

export default ReceiptHeader;
