import React, { useContext } from 'react';
import { ClaimContext } from '../ModernClaim';

const PolicyNumberList = () => {
 const {
  id: tranId,
  policyList,
  selectedPolicy,
  setelectedPolicy,
 } = useContext(ClaimContext);

 return (
  <div className=''>
   <p className='flex items-center justify-center p-2 header_list_font'>
    Policy No
   </p>
   <div className='policy_list mt-1'>
    {policyList?.map((item, index) => (
     <div
      className={`list_policy_style ${
       selectedPolicy === item ? 'list_policy_style_active' : ''
      }`}
      onClick={() => setelectedPolicy(item)}
      key={`${item}-${index}`}>
      <p className='list_style'>{item}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PolicyNumberList;
