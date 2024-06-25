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
       selectedPolicy === item?.CLM_POL_NO ? 'list_policy_style_active' : ''
      }`}
      onClick={() => setelectedPolicy(item?.CLM_POL_NO)}
      key={`${item?.CLM_POL_NO}-${index}`}>
      <p className='list_style'>{item?.CLM_POL_NO}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PolicyNumberList;
