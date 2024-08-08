import React from 'react';
import { Button } from 'antd';
import {
 CustomSelect,
 CustomTextArea,
} from '../../../components/commonExportsFields/CommonExportsFields';

const DecisionDetails = () => {
 return (
  <div className='decision_details mt-5 mb-7'>
   <div className='grid grid-cols-2 items-center gap-y-2'>
    <div className='col-span-1 grid grid-cols-4 items-center'>
     <p className='col-span-1 label-style'>Decision</p>
     <div className='col-span-3'>
      <CustomSelect
       name={`decision`}
       placeholder={'select'}
       size='medium'
       onChange={e => {
        console.log('e.target.value : ', e);
       }}
      />
     </div>
    </div>

    <div className='col-span-1' />

    <div className='col-span-1 grid grid-cols-4 items-center'>
     <p className='col-span-1 label-style'>Reason</p>
     <div className='col-span-3'>
      <CustomTextArea
       placeholder={'Reason'}
       onChange={e => {
        console.log('e.target.value : ', e.target.value);
       }}
      />
     </div>
    </div>
   </div>
   <div className='mt-4 flex justify-center'>
    <Button className='sub_btn'>Submit</Button>
   </div>
  </div>
 );
};

export default DecisionDetails;
