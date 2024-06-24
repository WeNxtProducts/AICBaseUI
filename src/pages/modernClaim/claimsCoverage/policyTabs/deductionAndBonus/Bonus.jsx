import React from 'react';

const Bonus = () => {
 const renderRows = () => (
  <div className='col-span-5 p-2 field_val_style_bonus'>
   <div className='grid grid-cols-7'>
    <p className='col-span-3 bonus_key'>Code</p>
    <p className='col-span-4 bonus_val'>AAAAAA</p>
   </div>
   <div className='grid grid-cols-7'>
    <p className='col-span-3 bonus_key'>Amount FC</p>
    <p className='col-span-4 bonus_val'>10,000</p>
   </div>
   <div className='grid grid-cols-7'>
    <p className='col-span-3 bonus_key'>Amount LC</p>
    <p className='col-span-4 bonus_val'>10,000</p>
   </div>
  </div>
 );

 return (
  <div className='pl-4'>
   <p className='breakup_title'>Bonus</p>
   <div className='breakUpContent p-1'>
    <div className='grid grid-cols-10 items-center gap-y-3 gap-x-3'>
     {renderRows()}
     {renderRows()}
     {renderRows()}
     {renderRows()}
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
