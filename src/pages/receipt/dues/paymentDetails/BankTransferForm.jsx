import React from 'react';
import {
    CustomInput,
    CustomNumberField,
    CustomSelect,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { ErrorMessage } from 'formik';

const BankTransferForm = ({ values, setFieldValue, handleOnChange, bankList, readOnly }) => {
    return (
        <>
            <div className='col-span-1 grid grid-cols-4 items-center'>
                <p className='col-span-1 form-label'>Bank Code</p>
                <div className='col-span-3'>
                    <CustomSelect
                        name={`RD_CHQ_BANK_CODE`}
                        size='large'
                        showSearch={false}
                        readOnly={readOnly}
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
                        name={`RD_CUST_BANK_ACNT_NO`}
                        format='number'
                        size='large'
                        maxLength={20}
                        readOnly={readOnly}
                        placeholder='Account no'
                        value={values?.RD_CUST_BANK_ACNT_NO}
                        onChange={e => handleOnChange('RD_CUST_BANK_ACNT_NO', e.target.value, setFieldValue)}
                    />
                    <ErrorMessage name='RD_CUST_BANK_ACNT_NO' component='div' className='error-message' />
                </div>
            </div>

            <div className='col-span-1 grid grid-cols-4 items-center'>
                <p className='col-span-1 form-label'>Account Name</p>
                <div className='col-span-3'>
                    <CustomInput
                        name={`RD_BANK_ACNT_NAME`}
                        size='large'
                        placeholder={'Name'}
                        readOnly={readOnly}
                        value={values?.RD_BANK_ACNT_NAME}
                        onChange={e => handleOnChange('RD_BANK_ACNT_NAME', e.target.value, setFieldValue)}
                    />
                    <ErrorMessage name='RD_BANK_ACNT_NAME' component='div' className='error-message' />
                </div>
            </div>
            <div className='col-span-1 grid grid-cols-4 items-center'>
                <p className='col-span-1 form-label'>IFSC Code</p>
                <div className='col-span-3'>
                    <CustomInput
                        name={`RD_BANK_IFSC_CODE`}
                        size='large'
                        placeholder={'IFSC code'}
                        readOnly={readOnly}
                        value={values?.RD_BANK_IFSC_CODE}
                        onChange={e => handleOnChange('RD_BANK_IFSC_CODE', e.target.value, setFieldValue)}
                    />
                    <ErrorMessage name='RD_BANK_IFSC_CODE' component='div' className='error-message' />
                </div>
            </div>

            <div className='col-span-1 grid grid-cols-4 items-center'>
                <p className='col-span-1 form-label'>Receipt Txn Ref No</p>
                <div className='col-span-3'>
                    <CustomInput
                        name={`RD_BANK_REF_NO`}
                        size='large'
                        placeholder={'Txn no'}
                        readOnly={readOnly}
                        value={values?.RD_BANK_REF_NO}
                        onChange={e => handleOnChange('RD_BANK_REF_NO', e.target.value, setFieldValue)}
                    />
                    <ErrorMessage name='RD_BANK_REF_NO' component='div' className='error-message' />
                </div>
            </div>
        </>
    );
};

export default BankTransferForm;
