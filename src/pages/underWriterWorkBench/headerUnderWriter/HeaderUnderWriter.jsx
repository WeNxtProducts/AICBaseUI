import React, { useContext } from 'react';
import { UWContext } from '../UnderWriterWorkBench';

const HeaderUnderWriter = () => {
 const { policyNumber } = useContext(UWContext);

 return (
  <div className='header-details flex items-center justify-between'>
   <p>
    <span>Product -</span> <span>Life insurance</span>
   </p>
   <p>
    <span>Policy Number - </span> <span>{policyNumber}</span>
   </p>
  </div>
 );
};

export default HeaderUnderWriter;
