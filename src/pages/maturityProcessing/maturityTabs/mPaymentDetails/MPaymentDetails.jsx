import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomDropDown, CustomInput, CustomNumberField, CustomSelect, CustomTextArea } from '../../../../components/commonExportsFields/CommonExportsFields';

const MPaymentDetails = () => {
    const [initValues, setInitValues] = useState({
        payment_date: '',
        payment_mode: '',
        curr_code: '',
        curr_exch_rate: '',
        paid_fc_amt: '',
        paid_lc_amt: '',
        draft_cheque_no: '',
        draft_cheque_dt: '',
        bank_name: '',
        branch_name: '',
        cust_name: '',
        cust_add_1: '',
        cust_add_2: '',
        cust_add_3: '',
        remarks: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='withrawal_form'>
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
                                        <p className='col-span-1 form-label'>Payment Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='payment_date'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.payment_date}
                                                onChange={date => setFieldValue('payment_date', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Payment Mode</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='payment_mode'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.payment_mode || undefined}
                                                onChange={e => setFieldValue('payment_mode', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Currency Code</p>
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
                                        <p className='col-span-1 form-label'>Exchange Rate</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='curr_exch_rate'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.curr_exch_rate}
                                                onChange={e => setFieldValue('curr_exch_rate', e?.target?.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Paid FC Amouunt</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='paid_fc_amt'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.paid_fc_amt}
                                                onChange={e => setFieldValue('paid_fc_amt', e?.target?.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Paid LC Amouunt</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='paid_lc_amt'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.paid_lc_amt}
                                                onChange={e => setFieldValue('paid_lc_amt', e?.target?.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Draft/Cheque No</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='draft_cheque_no'
                                                placeholder='Draft/Cheque No'
                                                format='number'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.draft_cheque_no}
                                                onChange={e => setFieldValue('draft_cheque_no', e?.target?.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Draft/Cheque Dt</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='draft_cheque_dt'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.draft_cheque_dt}
                                                onChange={date => setFieldValue('draft_cheque_dt', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Bank Name</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='bank_name'
                                                size='large'
                                                placeholder='Bank Name'
                                                readOnly={false}
                                                value={values?.bank_name}
                                                onChange={e => setFieldValue('bank_name', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Branch Name</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='branch_name'
                                                size='large'
                                                placeholder='Branch Name'
                                                readOnly={false}
                                                value={values?.branch_name}
                                                onChange={e => setFieldValue('branch_name', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Customer Name</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='cust_name'
                                                size='large'
                                                placeholder='Customer Name'
                                                readOnly={false}
                                                value={values?.cust_name}
                                                onChange={e => setFieldValue('cust_name', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Customer Address 1</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='cust_add_1'
                                                size='large'
                                                placeholder='Address 1'
                                                readOnly={false}
                                                value={values?.cust_add_1}
                                                onChange={e => setFieldValue('cust_add_1', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Customer Address 2</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='cust_add_2'
                                                size='large'
                                                placeholder='Address 2'
                                                readOnly={false}
                                                value={values?.cust_add_2}
                                                onChange={e => setFieldValue('cust_add_2', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Customer Address 3</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='cust_add_3'
                                                size='large'
                                                placeholder='Address 3'
                                                readOnly={false}
                                                value={values?.cust_add_3}
                                                onChange={e => setFieldValue('cust_add_3', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Remarks</p>
                                        <div className='col-span-3'>
                                            <CustomTextArea
                                                value={values?.remarks}
                                                placeholder='Remarks'
                                                readOnly={false}
                                                onChange={e => {
                                                    setFieldValue('remarks', e.target.value);
                                                }}
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

export default MPaymentDetails
