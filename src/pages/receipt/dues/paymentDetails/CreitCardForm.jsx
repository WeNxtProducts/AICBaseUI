import React, { useEffect } from 'react';
import {
 CustomDatePicker,
 CustomInput,
 CustomNumberField,
 CustomSelect,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { ErrorMessage } from 'formik';

const CreitCardForm = ({ values, setFieldValue, handleOnChange, bankList }) => {
 useEffect(() => {
  return () => {
   setFieldValue('RD_CHQ_BANK_CODE', '');
   setFieldValue('PD_CC_NO', '');
   setFieldValue('PD_CVV_NO', '');
   setFieldValue('PD_CC_EXP_DT', '');
  };
 }, []);

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
    <p className='col-span-1 form-label'>Card Number</p>
    <div className='col-span-3'>
     <CustomNumberField
      name={`PD_CC_NO`}
      format='card'
      size='large'
      maxLength={19}
      placeholder='1234 5678 9012 3456'
      value={values?.PD_CC_NO}
      onChange={e => handleOnChange('PD_CC_NO', e.target.value, setFieldValue)}
     />
     <ErrorMessage name='PD_CC_NO' component='div' className='error-message' />
    </div>
   </div>

   <div className='col-span-1 grid grid-cols-4 mt-1 items-center'>
    <p className='col-span-1 form-label'>Expiry Date</p>
    <div className='col-span-3'>
     <CustomDatePicker
      name={`PD_CC_EXP_DT`}
      size='medium'
      placeholder={'date'}
      value={values?.PD_CC_EXP_DT}
      onChange={date => handleOnChange('PD_CC_EXP_DT', date, setFieldValue)}
     />
     <ErrorMessage name='PD_CC_EXP_DT' component='div' className='error-message' />
    </div>
   </div>

   <div className='col-span-1 grid grid-cols-4 mt-1 items-center'>
    <p className='col-span-1 form-label'>CVV</p>
    <div className='col-span-3'>
     <CustomNumberField
      name={`PD_CVV_NO`}
      maxLength={4}
      format='number'
      size='small'
      placeholder={'CVV'}
      value={values?.PD_CVV_NO}
      onChange={e => handleOnChange('PD_CVV_NO', e.target.value, setFieldValue)}
     />
     <ErrorMessage name='PD_CVV_NO' component='div' className='error-message' />
    </div>
   </div>

   <div className='col-span-1 grid grid-cols-4 items-center'>
    <p className='col-span-1 form-label'>Receipt Txn Ref No</p>
    <div className='col-span-3'>
     <CustomInput
      name={`RD_BANK_REF_NO`}
      size='large'
      placeholder={'Txn no'}
      value={values?.RD_CHQ_BANK_CODE}
      onChange={e => handleOnChange('RD_BANK_REF_NO', e.target.value, setFieldValue)}
     />
     <ErrorMessage name='RD_BANK_REF_NO' component='div' className='error-message' />
    </div>
   </div>
  </>
 );
};

export default CreitCardForm;
