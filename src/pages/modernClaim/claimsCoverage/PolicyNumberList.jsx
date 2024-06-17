import React from 'react';
import { policy_list } from '../../../components/tableComponents/sampleData';

const PolicyNumberList = () => {
 const selectedPolicy = '2';
 return (
  <div className=''>
   <p className='flex items-center justify-center p-2 header_list_font'>
    Policy No
   </p>
   <div className='policy_list mt-1'>
    {policy_list?.map(item => (
     <div
      className={`list_policy_style ${
       selectedPolicy === item?.value ? 'list_policy_style_active' : ''
      }`}
      key={item?.key}>
      <p className='list_style'>{item?.label}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PolicyNumberList;
