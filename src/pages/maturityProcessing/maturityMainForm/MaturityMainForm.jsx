import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomDropDown, CustomNumberField, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';

const MaturityMainForm = () => {
    const [initValues, setInitValues] = useState({
        policy_no: '',
        product: '',
        emp_id: '',
        early_pension_YN: '',
        actual_retirement_date: '',
        early_pension_reason: '',
        normal_retirement_date: '',
        main_date: '',
        curr_code: '',
        exch_rate: '',
        comm_percentage: '',
        tax_basis: '',
        annuity_type: '',
        ann_repay_exch_factor: '',
        annuity_mop: '',
        guarantee_period: '',
        cust_code: '',
        freeze: '',
        FC_final_salary: '',
        lc: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='maturity_form'>
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
                                        <p className='col-span-1 form-label'>Early Pension YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='early_pension_YN'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.early_pension_YN || undefined}
                                                onChange={e => setFieldValue('early_pension_YN', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Actual Retirement Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='actual_retirement_date'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.actual_retirement_date}
                                                onChange={date => setFieldValue('actual_retirement_date', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Early Pension Reason</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='early_pension_reason'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.early_pension_reason || undefined}
                                                onChange={e => setFieldValue('early_pension_reason', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Normal Retirement date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='normal_retirement_date'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.normal_retirement_date}
                                                onChange={date => setFieldValue('normal_retirement_date', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='main_date'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.main_date}
                                                onChange={date => setFieldValue('main_date', date)}
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
                                        <p className='col-span-1 form-label'>Comm %</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='comm_percentage'
                                                placeholder='0'
                                                format='number'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.comm_percentage}
                                                onChange={e => setFieldValue('comm_percentage', e?.target?.value)}
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
                                        <p className='col-span-1 form-label'>Annuity Type</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='annuity_type'
                                                size='large'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.annuity_type || undefined}
                                                onChange={e => setFieldValue('annuity_type', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Ann Repay Exch Factor</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='ann_repay_exch_factor'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.ann_repay_exch_factor || undefined}
                                                onChange={e => setFieldValue('ann_repay_exch_factor', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Annuity MOP</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='annuity_mop'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.annuity_mop || undefined}
                                                onChange={e => setFieldValue('annuity_mop', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Guarantee Period</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='guarantee_period'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.guarantee_period || undefined}
                                                onChange={e => setFieldValue('guarantee_period', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Cust Code</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='cust_code'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.cust_code || undefined}
                                                onChange={e => setFieldValue('cust_code', e)}
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

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>FC Final Salary</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='FC_final_salary'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.FC_final_salary}
                                                onChange={e => setFieldValue('FC_final_salary', e?.target?.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>LC</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='LC'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.LC}
                                                onChange={e => setFieldValue('LC', e?.target?.value)}
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

export default MaturityMainForm
