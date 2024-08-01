import React from 'react';
import { policyList } from '../../../../components/tableComponents/sampleData';
import { Checkbox } from 'antd';

const PolicyList = () => {
 const selectedPolicy = 'P/90/7789/9876/9877';
 const multiSelect = false;

 return (
  <div className=''>
   <p className='flex items-center justify-center header_list_font'>
    Policy No
   </p>
   <div className='policy_list mt-1 p-2'>
    {policyList?.map((item, index) => (
     <div
      className={`list_policy_style items-center justify-center ${
       selectedPolicy === item?.CLM_POL_NO ? 'list_policy_style_active' : ''
      }`}
      onClick={() => console.log(item?.CLM_POL_NO)}
      key={`${item?.CLM_POL_NO}-${index}`}>
      {multiSelect && (
       <div className='me-1'>
        <Checkbox />
       </div>
      )}
      <p className='list_style'>{item?.CLM_POL_NO}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default PolicyList;
