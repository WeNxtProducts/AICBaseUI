import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import {
 CustomInput,
 CustomSelect,
} from '../../../components/commonExportsFields/CommonExportsFields';
import { notification_options } from '../../../components/tableComponents/sampleData';

const serchMethods = [
 { value: 'a', label: 'Customer Code' },
 { value: 'b', label: 'Loan No' },
 { value: 'c', label: 'Policy No' },
 { value: 'd', label: 'Proposal No' },
];

const CaptureFields = () => {
 const [values, setValues] = useState({
  cust_code: '',
  currency_code: '',
 });
 const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('a');

 const handlePaymentMethodChange = e => {
  setSelectedPaymentMethod(e.target.value);
 };

 const findLabelByValue = value => {
  const method = serchMethods?.find(method => method.value === value);
  return method ? method.label : 'Label not found';
 };

 return (
  <div className='cap_fields mt-5'>
   <div className='col-span-10'>
    <Radio.Group
     value={selectedPaymentMethod}
     size='medium'
     buttonStyle='solid'
     onChange={handlePaymentMethodChange}>
     {serchMethods.map(method => (
      <Radio.Button key={method.value} value={method.value}>
       {method.label}
      </Radio.Button>
     ))}
    </Radio.Group>
   </div>
   <div className='col-span-4'>
    <p className='field_label'>{findLabelByValue(selectedPaymentMethod)}</p>
    <CustomInput
     name={`customer_code`}
     placeholder={'enter code'}
     size='large'
     value={values?.cust_code}
     onChange={e => {
      setValues(pre => ({ ...pre, cust_code: e.target.value }));
     }}
    />
   </div>
   <div className='col-span-4'>
    <p className='field_label'>Currency Code</p>
    <CustomSelect
     options={notification_options}
     name={`currency`}
     placeholder={'enter code'}
     value={values?.currency_code || undefined}
     onChange={e => {
      setValues(pre => ({ ...pre, currency_code: e }));
     }}
    />
   </div>
   <div className='col-span-4'>
    <Button className='fetch_btn'>Fetch</Button>
   </div>
  </div>
 );
};

export default CaptureFields;
