import React from 'react';

const StatusCard = () => {
 const renderStatus = () => (
  <div>
   <p className={`status_notify ${'pending'}`}>PENDING</p>
  </div>
 );

 return (
  <div className='card_status grid grid-cols-10'>
   <div className='col-span-9 grid grid-cols-2 gap-y-2 mt-2 main_card'>
    <p className='col-span-1 label_font'>Receipt Status</p>
    <p className='col-span-1'>{renderStatus()}</p>

    <p className='col-span-1 label_font'>Receipt Date</p>
    <p className='col-span-1 val_font'>10/10/2024</p>

    <p className='col-span-1 label_font'>Receipt Refno</p>
    <p className='col-span-1 val_font'>11111111111</p>
   </div>
  </div>
 );
};

export default StatusCard;
