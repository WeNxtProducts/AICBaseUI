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
   <p className='flex items-center justify-center header_list_font'>
    Policy No
   </p>
   <div className='policy_list mt-1 p-2'>
    {policyList?.map((item, index) => (
     <div
      className={`list_policy_style ${
       selectedPolicy === item?.pol_no ? 'list_policy_style_active' : ''
      }`}
      onClick={() => setelectedPolicy(item?.pol_no)}
      key={`${item?.pol_no}-${index}`}>
      <p className='list_style'>{item?.pol_no}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PolicyNumberList;
