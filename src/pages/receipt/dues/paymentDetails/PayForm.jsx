import { Radio } from 'antd';
import React, { useState } from 'react';
import {
 CustomDatePicker,
 CustomInput,
 CustomNumberField,
 CustomSelect,
} from '../../../../components/commonExportsFields/CommonExportsFields';

const PayForm = ({ options }) => {
 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('a');

 const handlePaymentMethodChange = e => {
  setSelectedPaymentMethod(e.target.value);
 };

 return (
  <div className='mt-3 grid grid-cols-2 items-center pe-3'>
   <div className='col-span-1'>
    <Radio.Group
     value={selectedPaymentMethod}
     size='medium'
     buttonStyle='solid'
     onChange={handlePaymentMethodChange}>
     {options.map(method => (
      <Radio.Button key={method.value} value={method.value}>
       {method.label}
      </Radio.Button>
     ))}
    </Radio.Group>
   </div>
   <div className='col-span-1' />

   <div className='col-span-2 grid grid-cols-2 gap-3 items-center mt-3'>
    {selectedPaymentMethod === 'b' && (
     <>
      <div className='col-span-1 grid grid-cols-4 items-center'>
       <p className='col-span-1 form-label'>Cheque No</p>
       <div className='col-span-3'>
        <CustomInput
         name={`cheque_no`}
         placeholder={'Cheque No.'}
         onChange={e => {
          console.log('e.target.value : ', e.target.value);
         }}
        />
       </div>
      </div>

      <div className='col-span-1 grid grid-cols-4 items-center'>
       <p className='col-span-1 form-label'>Cheque Date</p>
       <div className='col-span-3'>
        <CustomDatePicker
         name={`cheque_dt`}
         placeholder={'date'}
         onChange={date => {
          console.log('date : ', date);
         }}
        />
       </div>
      </div>

      <div className='col-span-1 grid grid-cols-4 items-center'>
       <p className='col-span-1 form-label'>Txn Ref No</p>
       <div className='col-span-3'>
        <CustomInput
         name={`txn_ref_no`}
         placeholder={'Txn Ref No'}
         onChange={e => {
          console.log('e.target.value : ', e.target.value);
         }}
        />
       </div>
      </div>
     </>
    )}
   </div>
   <div className='col-span-2 grid grid-cols-2 gap-3 items-center mt-5'>
    <div className='col-span-1 grid grid-cols-4 items-center'>
     <p className='col-span-1 form-label'>FC Amount</p>
     <div className='col-span-3'>
      <CustomNumberField
       name={`fc_amount`}
       placeholder={'0'}
       onChange={e => {
        console.log('e.target.value : ', e.target.value);
       }}
      />
     </div>
    </div>
    <div className='col-span-1 grid grid-cols-4 items-center'>
     <p className='col-span-1 form-label'>LC Amount</p>
     <div className='col-span-3'>
      <CustomNumberField
       name={`lc_amount`}
       placeholder={'0'}
       onChange={e => {
        console.log('e.target.value : ', e.target.value);
       }}
      />
     </div>
    </div>
    <div className='col-span-1 grid grid-cols-4 items-center'>
     <p className='col-span-1 form-label'>Paid for</p>
     <div className='col-span-3'>
      <CustomSelect
       name={`paid_for`}
       placeholder={'select'}
       value={undefined}
       onChange={e => {
        console.log('e : ', e);
       }}
      />
     </div>
    </div>
    <div className='col-span-1 grid grid-cols-4 items-center'>
     <p className='col-span-1 form-label'>Paid Amount</p>
     <div className='col-span-3'>
      <CustomNumberField
       name={`lc_amount`}
       placeholder={'0'}
       onChange={e => {
        console.log('e.target.value : ', e.target.value);
       }}
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default PayForm;
