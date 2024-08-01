import React from 'react';
import { personaldetails } from '../../../components/tableComponents/sampleData';

const PersonalDetailsUnderWriter = () => {
 return (
  <div className='personal-details mt-4 p-3'>
   <p>Personal Details</p>
   <div className='details mt-2'>
    {personaldetails?.map(item => (
     <div key={item?.label} className='w-full flex items-center'>
      <div className='w-2/5'>
       <p className='label-style'>{item?.label}</p>
      </div>
      <div className='w-3/5'>
       <p className='value-style'>{item?.value}</p>
      </div>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PersonalDetailsUnderWriter;
