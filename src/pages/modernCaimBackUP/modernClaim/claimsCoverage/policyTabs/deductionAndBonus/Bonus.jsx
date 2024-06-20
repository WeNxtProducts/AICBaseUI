import React from 'react';

const Bonus = () => {
 const renderHeader = () => (
  <>
   <div className='col-span-3 content_header'>Bonus Code</div>
   <div className='col-span-3 content_header'>Foriegn Currency</div>
   <div className='col-span-3 content_header'>Local Currency</div>
  </>
 );

 const renderRows = fieldName => (
  <div className='col-span-10 grid grid-cols-10 items-center justify-items-center field_val_style_bonus'>
   <div className='col-span-3'>{fieldName}</div>
   <div className='col-span-3'>10000</div>
   <div className='col-span-3'>20000</div>
  </div>
 );

 return (
  <div className='pl-4'>
   <p className='breakup_title'>Bonus</p>
   <div className='breakUpContent p-1'>
    <div className='grid grid-cols-10 items-center gap-y-3 gap-x-3'>
     {renderHeader()}
     {renderRows('1000GTE')}
     {renderRows('1000GTE')}
     {renderRows('1000GTE')}
     {renderRows('1000GTE')}
    </div>

    <div className='mt-7 field_name_style flex justify-center items-center gap-5'>
     <p>Total Bonus</p>
     <div className='total_value'> </div>
    </div>
   </div>
  </div>
 );
};

export default Bonus;
