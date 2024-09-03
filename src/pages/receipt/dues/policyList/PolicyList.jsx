import React, { useContext, useEffect, useState } from 'react';
import { ReceiptContext } from '../../Receipt';
import { Checkbox } from 'antd';
import useApiRequests from '../../../../services/useApiRequests';

const PolicyListView = () => {
 const { multiSelect, policyList, selectedPolicy, setSelectedPolicy } = useContext(ReceiptContext);

 return (
  <div className=''>
   <p className='flex items-center justify-center header_list_font'>Policy No</p>
   {policyList?.length > 0 && (
    <div className='policy_list mt-1 p-2'>
     {policyList?.map((item, index) => (
      <div
       className={`list_policy_style items-center justify-center ${
        selectedPolicy === item?.RP_POL_NO ? 'list_policy_style_active' : ''
       }`}
       onClick={() => {
        setSelectedPolicy(item?.RP_POL_NO);
       }}
       key={`${item?.RP_POL_NO}-${index}`}>
       {multiSelect && (
        <div className='me-1'>
         <Checkbox />
        </div>
       )}
       <p className='list_style'>{item?.RP_POL_NO}</p>
      </div>
     ))}
    </div>
   )}
  </div>
 );
};

export default PolicyListView;
