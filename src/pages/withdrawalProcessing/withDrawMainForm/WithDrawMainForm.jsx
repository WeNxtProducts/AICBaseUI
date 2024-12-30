import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomDropDown, CustomNumberField, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';

const WithDrawMainForm = () => {
    const [initValues, setInitValues] = useState({
        policy_no: '',
        product: '',
        emp_id: '',
        type: '',
        date_only: '',
        loss_date: '',
        intm_date: '',
        curr_code: '',
        exch_rate: '',
        tax_basis: '',
        freeze: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='withrawal_form'>
            <div className='flex items-center justify-between pl-2'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Withdrawal Processing`}</p>
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
                                <Form className='col-span-2 grid grid-cols-2 gap-2' onSubmit={handleSubmit}>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Policy No</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='policy_no'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.policy_no || undefined}
                                                onChange={e => setFieldValue('policy_no', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Product</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='product'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.product || undefined}
                                                onChange={e => setFieldValue('product', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Emp ID</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='emp_id'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.emp_id || undefined}
                                                onChange={e => setFieldValue('emp_id', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Type</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='type'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.type || undefined}
                                                onChange={e => setFieldValue('type', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='date_only'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.date_only}
                                                onChange={date => setFieldValue('date_only', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Loss date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='loss_date'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.loss_date}
                                                onChange={date => setFieldValue('loss_date', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Intm date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='intm_date'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.intm_date}
                                                onChange={date => setFieldValue('intm_date', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Curr Code</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='curr_code'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.curr_code || undefined}
                                                onChange={e => setFieldValue('curr_code', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Exch Rate</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='exch_rate'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.exch_rate}
                                                onChange={e => setFieldValue('exch_rate', e?.target?.value)}
                                            />

                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Tax Basis</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='tax_basis'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.tax_basis || undefined}
                                                onChange={e => setFieldValue('tax_basis', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>freeze</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='freeze'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.freeze || undefined}
                                                onChange={e => setFieldValue('freeze', e)}
                                            />
                                        </div>
                                    </div>


                                    {/* <div className='col-span-2 flex items-center justify-center'>
                                        <button className='submit_btn' type='submit'>
                                            Submit
                                        </button>
                                    </div> */}
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default WithDrawMainForm
