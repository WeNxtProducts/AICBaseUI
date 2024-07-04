import React, { useState } from 'react';
import { policyDetails } from '../../../components/tableComponents/sampleData';

const OtherPolicies = () => {
 const [currentIndex, setCurrentIndex] = useState(0);

 const handleNext = () => {
  console.log('handleNext');
  setCurrentIndex(currentIndex + 1);
 };

 const handlePrev = () => {
  setCurrentIndex(currentIndex - 1);
  console.log('handlePrev');
 };

 return (
  <div className='other_policies p-3'>
   <p>
    Other Policies / Proposals <span className='counter'>06</span>
   </p>
   <div className='details mt-4 grid grid-cols-12 gap-1'>
    <div className='col-span-1 flex items-center'>
     <i
      className={`bi bi-chevron-left icon_arrow ${
       currentIndex === 0 ? 'arrow_disabled' : ''
      }`}
      onClick={() => handlePrev()}
     />
    </div>

    <div className='col-span-10'>
     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>S.No</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>{currentIndex + 1}</p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Number</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>
         {policyDetails[currentIndex].policy_number}
        </p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Number</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>{policyDetails[currentIndex].fc_sum}</p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Start Date</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>{policyDetails[currentIndex].start_date}</p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Status</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>{policyDetails[currentIndex].status}</p>
       </div>
      </div>
     </>
    </div>

    <div className='col-span-1 flex items-center'>
     <i
      className={`bi bi-chevron-right icon_arrow ${
       currentIndex === policyDetails?.length - 1 ? 'arrow_disabled' : ''
      }`}
      onClick={() => handleNext()}
     />
    </div>
   </div>
  </div>
 );
};

export default OtherPolicies;
