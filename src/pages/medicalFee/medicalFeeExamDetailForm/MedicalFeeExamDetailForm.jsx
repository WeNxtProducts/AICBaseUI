import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';

const MedicalFeeExamDetailForm = () => {
    const [initialValues, setInitialValues] = useState({
        pay_to: '',
        pay_code: '',
        pol_from_date: '',
        pol_end_date: '',
    });

    const onSubmit = async values => {
        console.log("values : ", values);
    }

    return (
        <div className='medical_fee_exam_detail_form'>
            <p className='form_title'>Medical Fee Exam Details</p>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className='pl-1 mt-4 grid grid-cols-2 gap-5 items-start'>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Pay to</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.select || undefined}
                                                onChange={e => {
                                                    setFieldValue('pay_to', e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Pay to code</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.pay_code || undefined}
                                                onChange={e => {
                                                    setFieldValue('pay_code', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Policy From Date</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomDatePicker
                                                placeholder='date'
                                                size='medium'
                                                value={values?.pol_from_date}
                                                onChange={date => {
                                                    setFieldValue('pol_from_date', date);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Policy End Date</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomDatePicker
                                                placeholder='date'
                                                size='medium'
                                                value={values?.pol_end_date}
                                                onChange={date => {
                                                    setFieldValue('pol_end_date', date);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-2 mt-3 flex items-center justify-center'>
                                        <button type='submit' className='ok_button w-1/12'>
                                            Process
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default MedicalFeeExamDetailForm
