import React from 'react';

const AlterCard = ({ rowData }) => {
 return (
  <div className='endorsement_cards'>
   <div className='e_card grid grid-cols-12 gap-3'>
    {rowData?.map((item, index) => (
     <div key={item?.alterNo} className='alter_card col-span-4 pb-4'>
      <div className='header'>
       <p className='title_style'>Alteration - {index + 1}</p>
      </div>
      <div className='e_content mt-2'>
       <div className='grid grid-cols-5 mt-2'>
        <p className='col-span-2 content_label'>Alteration No</p>
        <p className='col-span-3 content_value'>{item?.alterNo}</p>
       </div>
       <div className='grid grid-cols-5 mt-2'>
        <p className='col-span-2 content_label'>End code-desc</p>
        <p className='col-span-3 content_value'>{item?.endCodeDesc}</p>
       </div>
       <div className='grid grid-cols-5 mt-2'>
        <p className='col-span-2 content_label'>Alteration Date</p>
        <p className='col-span-3 content_value'>{item?.alterDate}</p>
       </div>
      </div>

      <div className='e_card_footer mt-4'>
       <div className='status_item'>
        <p className='content_label'>Status</p>
        <p className='content_value'>Success</p>
       </div>
       <div className='status_item'>
        <p className='content_label'>Alter Fm Dt</p>
        <p className='content_value'>{item?.fm_date}</p>
       </div>
       <div className='status_item'>
        <p className='content_label'>Alter To Dt</p>
        <p className='content_value'>{item?.to_date}</p>
       </div>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default AlterCard;
