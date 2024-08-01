import React from 'react';
import { premiumdetails } from '../../../components/tableComponents/sampleData';

const PremiumDetails = () => {
 return (
  <div className='premiumDetails p-3'>
   <p>Premium Details</p>
   <div className='details'>
    <div className='w-full flex'>
     <div className='w-5/12'></div>
     <div className='w-1/5'>
      <p className='fc_lc-style'>FC</p>
     </div>
     <div className='w-1/5'>
      <p className='fc_lc-style'>LC</p>
     </div>
    </div>
    {premiumdetails?.map(item => (
     <div key={item?.label} className='w-full flex mt-2'>
      <div className='w-5/12'>
       <p className='label-style'>{item?.label}</p>
      </div>
      <div className='w-1/5'>
       <p className='value-style pre_style'>{item?.fc}</p>
      </div>
      <div className='w-1/5'>
       <p className='value-style pre_style'>{item?.fc}</p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PremiumDetails;
