import React from 'react';
import ClaimCheckbox from './mainEntry/claimCheckbox/ClaimCheckbox';
import { Button } from 'antd';

const CoverageCheckBox = () => {
 const elements = Array.from({ length: 4 }, (_, i) => i);

 return (
  <div className='grid grid-cols-8 gap-2 mt-3'>
   {elements.map(i => (
    <div key={i} className='col-span-2'>
     <ClaimCheckbox />
    </div>
   ))}
   <div className='flex justify-center mt-2 col-span-8'>
    <Button className='ok_button'>Save</Button>
   </div>
  </div>
 );
};

export default CoverageCheckBox;
