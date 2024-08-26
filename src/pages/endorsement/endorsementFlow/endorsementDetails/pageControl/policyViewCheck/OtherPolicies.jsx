import React, { useState } from 'react';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { proposalList } from '../../../../../../components/tableComponents/sampleData';

const OtherPolicies = () => {
 const policyNumber = 'PEND2024002';
 const [currentIndex, setCurrentIndex] = useState(0);

 const handleNext = () => {
  setCurrentIndex(currentIndex + 1);
 };

 const handlePrev = () => {
  setCurrentIndex(currentIndex - 1);
 };

 return (
  <div className='other_policies p-3'>
   <div className='flex items-center justify-between'>
    <p className='box_head'>
     Other Policies / Proposals <span className='counter'>{proposalList?.length}</span>
    </p>
    <div>
     <Button
      className={
       policyNumber !== proposalList[currentIndex]?.Policy_Number
        ? `view_policy`
        : `view_policy_dis`
      }>
      {policyNumber !== proposalList[currentIndex]?.Policy_Number ? 'View' : 'Viewing'}
     </Button>
    </div>
   </div>
   <div className='details mt-4 grid grid-cols-12 gap-1'>
    <div className='col-span-1 flex items-center'>
     <i
      className={`bi bi-chevron-left icon_arrow ${currentIndex === 0 ? 'arrow_disabled' : ''}`}
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
        <p className='value-style'>{proposalList[currentIndex]?.SNo || ''}</p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Number</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>{proposalList[currentIndex]?.Policy_Number || ''}</p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Start Date</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>
         {dayjs(proposalList[currentIndex]?.Start_Date).format('YYYY-MM-DD') || ''}
        </p>
       </div>
      </div>
     </>

     <>
      <div className='w-full flex mt-2'>
       <div className='w-3/5 flex items-center'>
        <p className='label-style ml-4'>Policy Status</p>
       </div>
       <div className='w-2/5 flex items-center'>
        <p className='value-style'>{proposalList[currentIndex]?.Status || ''}</p>
       </div>
      </div>
     </>
    </div>

    <div className='col-span-1 flex items-center'>
     <i
      className={`bi bi-chevron-right icon_arrow ${
       currentIndex === proposalList?.length - 1 ? 'arrow_disabled' : ''
      }`}
      onClick={() => handleNext()}
     />
    </div>
   </div>
  </div>
 );
};

export default OtherPolicies;
