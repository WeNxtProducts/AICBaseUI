import React, { useEffect } from 'react';
import { ErrorMessage } from 'formik';
import { CustomDatePicker, CustomInput } from '../../../../../components/commonExportsFields/CommonExportsFields';

const ChequeForm = ({ values, setFieldValue, handleOnChange, readOnly }) => {
    useEffect(() => {
        return () => {
            setFieldValue('RD_CHQ_NO', '');
            setFieldValue('RD_CHQ_DT', '');
            setFieldValue('RD_BANK_REF_NO', '');
        };
    }, []);

    return (
        <>
            <div className='col-span-1 grid grid-cols-4 items-center'>
                <p className='col-span-1 form-label'>Cheque No</p>
                <div className='col-span-3'>
                    <CustomInput
                        name={`RD_CHQ_NO`}
                        size='large'
                        placeholder={'Cheque No.'}
                        readOnly={readOnly}
                        value={values?.RD_CHQ_NO}
                        onChange={e => handleOnChange('RD_CHQ_NO', e.target.value, setFieldValue)}
                    />
                    <ErrorMessage name='RD_CHQ_NO' component='div' className='error-message' />
                </div>
            </div>

            <div className='col-span-1 grid grid-cols-4 items-center'>
                <p className='col-span-1 form-label'>Cheque Date</p>
                <div className='col-span-3'>
                    <CustomDatePicker
                        name={`RD_CHQ_DT`}
                        size='large'
                        placeholder={'date'}
                        readOnly={readOnly}
                        value={values?.RD_CHQ_DT}
                        onChange={date => handleOnChange('RD_CHQ_DT', date, setFieldValue)}
                    />
                    <ErrorMessage name='RD_CHQ_DT' component='div' className='error-message' />
                </div>
            </div>

            <div className='col-span-1 grid grid-cols-4 mt-1 items-center'>
                <p className='col-span-1 form-label'>Txn Ref No</p>
                <div className='col-span-3'>
                    <CustomInput
                        name={`RD_BANK_REF_NO`}
                        size='large'
                        readOnly={readOnly}
                        value={values?.RD_BANK_REF_NO}
                        placeholder={'Txn Ref No'}
                        onChange={e => handleOnChange('RD_BANK_REF_NO', e.target.value, setFieldValue)}
                    />
                    <ErrorMessage name='RD_BANK_REF_NO' component='div' className='error-message' />
                </div>
            </div>
        </>
    );
};

export default ChequeForm;
