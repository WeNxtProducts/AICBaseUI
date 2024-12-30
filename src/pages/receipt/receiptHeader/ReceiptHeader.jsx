import React, { useContext } from 'react';
import CaptureFields from './CaptureFields';
import StatusCard from './StatusCard';
import { ReceiptContext } from '../Receipt';

const ReceiptHeader = () => {
 const { id: tranId, headerStatus } = useContext(ReceiptContext);

 return (
  <div className='receipt_header'>
   <div className='header_align'>
    <div className='fields_container'>
     <p className='title_header'>Reciept Processing</p>
     <CaptureFields />
    </div>
    <div className='recipt_status'>{tranId && headerStatus !== null && <StatusCard />}</div>
   </div>
  </div>
 );
};

export default ReceiptHeader;
