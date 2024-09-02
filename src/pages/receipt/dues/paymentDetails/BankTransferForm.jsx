import React from 'react';
import {
 CustomInput,
 CustomNumberField,
 CustomSelect,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { ErrorMessage } from 'formik';

const BankTransferForm = ({ values, setFieldValue, handleOnChange, bankList }) => {
 return (
  <>
   <div className='col-span-1 grid grid-cols-4 items-center'>
    <p className='col-span-1 form-label'>Bank Code</p>
    <div className='col-span-3'>
     <CustomSelect
      name={`RD_CHQ_BANK_CODE`}
      size='large'
      showSearch={false}
      options={bankList || []}
      placeholder={'Bank code'}
      value={values?.RD_CHQ_BANK_CODE || undefined}
      onChange={e => handleOnChange('RD_CHQ_BANK_CODE', e, setFieldValue)}
     />
     <ErrorMessage name='RD_CHQ_BANK_CODE' component='div' className='error-message' />
    </div>
   </div>

   <div className='col-span-1 grid grid-cols-4 items-center'>
    <p className='col-span-1 form-label'>Account No</p>
    <div className='col-span-3'>
     <CustomNumberField
      name={`acc_no`}
      format='card'
      size='large'
      maxLength={20}
      placeholder='Account no'
      onChange={e => {
       //    console.log('e.target.value : ', e.target.value);
      }}
     />
    </div>
   </div>

   <div className='col-span-1 grid grid-cols-4 items-center'>
    <p className='col-span-1 form-label'>Account Name</p>
    <div className='col-span-3'>
     <CustomInput
      name={`account_name`}
      size='large'
      placeholder={'Name'}
      onChange={e => {
       console.log('e.target.value : ', e.target.value);
      }}
     />
    </div>
   </div>
   <div className='col-span-1 grid grid-cols-4 items-center'>
    <p className='col-span-1 form-label'>IFSC Code</p>
    <div className='col-span-3'>
     <CustomInput
      name={`ifsc_code`}
      size='large'
      placeholder={'IFSC code'}
      onChange={e => {
       console.log('e.target.value : ', e.target.value);
      }}
     />
    </div>
   </div>

   <div className='col-span-1 grid grid-cols-4 items-center'>
    <p className='col-span-1 form-label'>Receipt Txn Ref No</p>
    <div className='col-span-3'>
     <CustomInput
      name={`RD_BANK_REF_NO`}
      size='large'
      placeholder={'Txn no'}
      value={values?.PD_BANK_NAME}
      onChange={e => handleOnChange('RD_BANK_REF_NO', e.target.value, setFieldValue)}
     />
     <ErrorMessage name='RD_BANK_REF_NO' component='div' className='error-message' />
    </div>
   </div>
  </>
 );
};

export default BankTransferForm;
