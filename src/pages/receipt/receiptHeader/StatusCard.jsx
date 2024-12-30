import React, { useContext } from 'react';
import { ReceiptContext } from '../Receipt';

const StatusCard = () => {
 const { headerStatus } = useContext(ReceiptContext);
 const { RH_REP_RCPT_REF_NO = '', RH_INS_DT = '', RH_APPRV_STATUS = 'P' } = headerStatus;
 const statusMap = {
  S: { class: 'approved', text: 'Approved' },
  P: { class: 'pending', text: 'Pending' },
 };
 const { class: statusClass = 'pending', text: statusText = 'Not Submitted' } =
  statusMap[RH_APPRV_STATUS === 'P' ? 'P' : 'S'] || {};

 const renderStatus = () => (
  <div>
   <p className={`status_notify ${statusClass}`}>{statusText}</p>
  </div>
 );

 return (
  <div className='card_status grid grid-cols-10'>
   <div className='col-span-9 grid grid-cols-2 gap-y-2 mt-2 main_card'>
    <p className='col-span-1 label_font'>Receipt Status</p>
    <p className='col-span-1'>{renderStatus()}</p>

    <p className='col-span-1 label_font'>Receipt Date</p>
    <p className='col-span-1 val_font'>{RH_INS_DT}</p>

    <p className='col-span-1 label_font'>Receipt Refno</p>
    <p className='col-span-1 val_font'>{RH_REP_RCPT_REF_NO}</p>
   </div>
  </div>
 );
};

export default StatusCard;
