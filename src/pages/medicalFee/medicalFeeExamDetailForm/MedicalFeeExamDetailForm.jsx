import React, { useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import { CustomDatePicker, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';
import { medicalFeeFormSchema } from '../MedicalShema';

const MedicalFeeExamDetailForm = () => {
    const [initialValues, setInitialValues] = useState({
        medicalFee: {
            formFields: { pay_to: '', clinic_code: '', pol_from_date: '', pol_end_date: '' }
        }
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
                    validationSchema={medicalFeeFormSchema}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, values, setFieldValue, errors }) => {
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
                                                value={values?.medicalFee?.formFields?.pay_to || undefined}
                                                onChange={e => {
                                                    setFieldValue('medicalFee.formFields.pay_to', e);
                                                }}
                                            />
                                            <ErrorMessage
                                                name={'medicalFee.formFields.pay_to'}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Clinic Code</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.medicalFee?.formFields?.clinic_code || undefined}
                                                onChange={e => {
                                                    setFieldValue('medicalFee.formFields.clinic_code', e);
                                                }}
                                            />
                                            <ErrorMessage
                                                name={'medicalFee.formFields.clinic_code'}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>From Date</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomDatePicker
                                                placeholder='date'
                                                size='medium'
                                                value={values?.medicalFee?.formFields?.pol_from_date}
                                                onChange={date => {
                                                    setFieldValue('medicalFee.formFields.pol_from_date', date);
                                                }}
                                            />
                                            <ErrorMessage
                                                name={'medicalFee.formFields.pol_from_date'}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>End Date</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomDatePicker
                                                placeholder='date'
                                                size='medium'
                                                disabledDates={values?.medicalFee?.formFields?.pol_from_date}
                                                value={values?.medicalFee?.formFields?.pol_end_date}
                                                onChange={date => {
                                                    setFieldValue('medicalFee.formFields.pol_end_date', date);
                                                }}
                                            />
                                            <ErrorMessage
                                                name={'medicalFee.formFields.pol_end_date'}
                                                component='div'
                                                className='error-message'
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
