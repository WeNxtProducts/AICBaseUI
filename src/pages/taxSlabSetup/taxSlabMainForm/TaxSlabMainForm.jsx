import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomInput, CustomTextArea } from '../../../components/commonExportsFields/CommonExportsFields';

const TaxSlabMainForm = () => {
    const [initValues, setInitValues] = useState({
        TAX_CODE: '',
        DESC: '',
        SHORT_DESC: '',
        LONG_DESC: '',
        EFF_DATE_FM: '',
        EFF_DATE_TO: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='tax_slab_form'>
            <div className='flex items-center justify-between pl-2'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Tax Slab Setup`}</p>
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
                                        <p className='col-span-1 form-label'>Tax Slab Code</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='TAX_CODE'
                                                size='medium'
                                                placeholder='tax code'
                                                readOnly={false}
                                                value={values?.TAX_CODE}
                                                onChange={e => setFieldValue('TAX_CODE', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Descrption</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='DESC'
                                                size='large'
                                                placeholder='description'
                                                readOnly={false}
                                                value={values?.DESC}
                                                onChange={e => setFieldValue('DESC', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Short Description</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='SHORT_DESC'
                                                size='large'
                                                placeholder='short description'
                                                readOnly={false}
                                                value={values?.SHORT_DESC}
                                                onChange={e => setFieldValue('SHORT_DESC', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Long Description</p>
                                        <div className='col-span-3'>
                                            <CustomTextArea
                                                value={values?.LONG_DESC}
                                                placeholder='long description'
                                                readOnly={false}
                                                onChange={e => {
                                                    setFieldValue('LONG_DESC', e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Eff date from</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='EFF_DATE_FM'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.EFF_DATE_FM}
                                                onChange={date => setFieldValue('EFF_DATE_FM', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Eff date to</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='EFF_DATE_TO'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.EFF_DATE_TO}
                                                onChange={date => setFieldValue('EFF_DATE_TO', date)}
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

export default TaxSlabMainForm
