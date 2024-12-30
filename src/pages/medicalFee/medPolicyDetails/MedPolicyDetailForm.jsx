import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { CustomDatePicker, CustomNumberField, CustomSelect, CustomTextArea } from '../../../components/commonExportsFields/CommonExportsFields';

const MedPolicyDetailForm = () => {
    const [initialValues, setInitialValues] = useState({
        po_no: '',
        pol_no: '',
        exam_type: '',
        exam_date: '',
        fees_fc_amoun: '',
        fees_flc_amoun: '',
        remarks: ''
    });

    const onSubmit = async values => {
        console.log("values : ", values);
    }

    return (
        <div className='med_pol_form'>
            <p className='form_title'>Policy Details</p>

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
                                            <p className='label-font'>Proposal No</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.po_no || undefined}
                                                onChange={e => {
                                                    setFieldValue('po_no', e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Policy No</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.pol_no || undefined}
                                                onChange={e => {
                                                    setFieldValue('pol_no', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Exam Type</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.exam_type || undefined}
                                                onChange={e => {
                                                    setFieldValue('exam_type', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Exam Date</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomDatePicker
                                                placeholder='date'
                                                size='medium'
                                                value={values?.exam_date}
                                                onChange={date => {
                                                    setFieldValue('exam_date', date);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Fees FC Amount</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomNumberField
                                                placeholder='.00'
                                                size='medium'
                                                value={values?.fees_fc_amoun}
                                                onChange={e => {
                                                    setFieldValue('fees_fc_amoun', e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Fees LC Amount</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomNumberField
                                                placeholder='.00'
                                                size='medium'
                                                value={values?.fees_lc_amoun}
                                                onChange={e => {
                                                    setFieldValue('fees_lc_amoun', e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Remarks</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomTextArea
                                                placeholder='remarks'
                                                size='medium'
                                                value={values?.remarks}
                                                onChange={e => {
                                                    setFieldValue('remarks', e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>


                                    <div className='col-span-2 mt-3 flex items-center justify-center'>
                                        <button type='submit' className='ok_button w-1/12'>
                                            Save
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

export default MedPolicyDetailForm
