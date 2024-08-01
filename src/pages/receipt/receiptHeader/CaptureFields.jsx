import React, { useState } from 'react';
import { Button } from 'antd';
import {
 CustomInput,
 CustomSelect,
} from '../../../components/commonExportsFields/CommonExportsFields';
import { notification_options } from '../../../components/tableComponents/sampleData';

const CaptureFields = () => {
 const [values, setValues] = useState({
  cust_code: '',
  currency_code: '',
 });

 return (
  <div className='cap_fields mt-5'>
   <div className='col-span-4'>
    <p className='field_label'>Customer Code/ Loan no/ Pol no/ Proposal</p>
    <CustomInput
     name={`customer_code`}
     placeholder={'enter code'}
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
