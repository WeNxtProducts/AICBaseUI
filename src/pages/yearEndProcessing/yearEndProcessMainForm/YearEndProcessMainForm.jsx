import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { CustomDatePicker, CustomInput, CustomNumberField, CustomSelect, CustomTextArea } from '../../../components/commonExportsFields/CommonExportsFields';

const YearEndProcessMainForm = () => {
    const [initValues, setInitValues] = useState({
        POLICY_NO: '',
        NAME: '',
        RUN_DT: '',
        PROCESSING_YR: '',
        RATE: '',
        RATE_PER: '',
        TAX_BASIS: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='year_end_form'>
            <div className='flex items-center justify-between pl-2'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Year End Processing`}</p>
                </div>
            </div>
            <div className='mt-3 mb-5'>
                <div className='grid grid-cols-2 items-center p-2'>
                    <Formik
                        initialValues={initValues}
                        values={initValues}
                        onSubmit={onSubmit}
                        enableReinitialize={true}>
                        {({ handleSubmit, values, setFieldValue, resetForm }) => {
                            return (
                                <Form className='col-span-2 grid grid-cols-2 gap-3' onSubmit={handleSubmit}>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Policy number</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='POLICY_NO'
                                                size='medium'
                                                placeholder='policy no.'
                                                readOnly={false}
                                                value={values?.POLICY_NO}
                                                onChange={e => setFieldValue('POLICY_NO', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Customer Name</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='NAME'
                                                size='large'
                                                placeholder='name'
                                                readOnly={false}
                                                value={values?.NAME}
                                                onChange={e => setFieldValue('NAME', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Processing Year</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='PROCESSING_YR'
                                                placeholder='0'
                                                format='number'
                                                size='small'
                                                readOnly={false}
                                                value={values?.PROCESSING_YR}
                                                onChange={e => setFieldValue('PROCESSING_YR', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Run Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='RUN_DT'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.RUN_DT}
                                                onChange={date => setFieldValue('RUN_DT', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Rate</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='RATE'
                                                placeholder='0'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.RATE}
                                                onChange={e => setFieldValue('RATE', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Rate Per</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='RATE_PER'
                                                placeholder='0'
                                                format='amount'
                                                size='small'
                                                readOnly={false}
                                                value={values?.RATE_PER}
                                                onChange={e => setFieldValue('RATE_PER', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Tax Basis</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='TAX_BASIS'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.TAX_BASIS || undefined}
                                                onChange={e => setFieldValue('TAX_BASIS', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-center'>
                                        <button className='submit_btn' type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default YearEndProcessMainForm
