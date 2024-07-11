import React from 'react';

const MedicalHeader = () => {
 return (
  <div>
   <p className='header_font_medical'>Medical Details</p>
   <div className='mt-2 grid grid-cols-12'>
    <p className='col-span-2 emp_style'>
     Employee No : <span>33</span>
    </p>
    <p className='col-span-7 emp_style'>
     Employee Name : <span>Test</span>
    </p>
   </div>
  </div>
 );
};

export default MedicalHeader;
