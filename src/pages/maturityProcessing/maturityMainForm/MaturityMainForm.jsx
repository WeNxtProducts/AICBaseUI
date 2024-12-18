import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomDropDown, CustomNumberField, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';
import useApiRequests from '../../../services/useApiRequests';
import { maturityCodeFields } from '../../../components/codeDescFieldSet/CodeDescFieldSet';
import { tableColumn, genderOptions } from './../../../components/tableComponents/sampleData';

const MaturityMainForm = () => {
    const saveForm = useApiRequests('maturityProcessSaveFrontForm', 'POST');
    const updateForm = useApiRequests('maturityProcessUpdateFrontForm', 'POST');
    const getForm = useApiRequests('maturityProcessGetFrontForm', 'POST');

    const [initValues, setInitValues] = useState({
        PMPH_POL_NO: '',
        PMPH_POL_NO_DESC: '',
        PMPH_PROD: '',
        PMPH_PROD_DESC: '',
        PMPH_EMP_ID: '',
        PMPH_EMP_ID_DESC: '',
        PMPH_EAR_PENS_YN: '',
        PMPH_ACT_RET_DT: '',
        PMPH_EAR_PENS_REA: '',
        PMPH_EAR_PENS_REA_DESC: '',
        PMPH_NORM_RET_DT: '',
        PMPH_DT: '',
        PMPH_CURR_CODE: '',
        PMPH_CURR_CODE_DESC: '',
        PMPH_EXCH_RATE: '',
        PMPH_COMM_PER: '',
        PMPH_TAX_BASIS: '',
        PMPH_ANN_TYPE: '',
        PMPH_ANN_REPAY_EXCH_FACT: '',
        PMPH_ANN_MOP: '',
        PMPH_GUAR_PER: '',
        PMPH_CUST_CODE: '',
        PMPH_CUST_CODE_DESC: '',
        PMPH_FREEZE_YN: '',
        PMPH_FC_FIN_SAL: '',
        PMPH_lC_FIN_SAL: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    const handleChangeValue = (fieldKey, val, setFieldValue) => {
        console.log("val : ",val)
        setFieldValue(fieldKey, val)
    }

    return (
        <div className='maturity_form'>
            <div className='flex items-center justify-between pl-2'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Maturity Processing`}</p>
                </div>
            </div>
            <div className='mt-1 mb-5'>
                <div className='grid grid-cols-1 items-center p-2'>
                    <Formik
                        initialValues={initValues}
                        values={initValues}
                        onSubmit={onSubmit}
                        enableReinitialize={true}>
                        {({ handleSubmit, values, setFieldValue, resetForm }) => {
                            return (
                                <Form className='col-span-2 grid grid-cols-2 gap-x-3 gap-y-3' onSubmit={handleSubmit}>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Policy No</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='PMPH_POL_NO'
                                                options={tableColumn}
                                                readOnly={false}
                                                value={values?.PMPH_POL_NO || undefined}
                                                onChange={e => handleChangeValue('PMPH_POL_NO', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Product</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='PMPH_PROD'
                                                options={genderOptions}
                                                readOnly={false}
                                                value={values?.PMPH_PROD || undefined}
                                                onChange={e => handleChangeValue('PMPH_PROD', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Emp ID</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='PMPH_EMP_ID'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.PMPH_EMP_ID || undefined}
                                                onChange={e => handleChangeValue('PMPH_EMP_ID', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Early Pension YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_EAR_PENS_YN'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_EAR_PENS_YN || undefined}
                                                onChange={e => handleChangeValue('PMPH_EAR_PENS_YN', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Actual Retirement Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='PMPH_ACT_RET_DT'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PMPH_ACT_RET_DT}
                                                onChange={date => handleChangeValue('PMPH_ACT_RET_DT', date, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Early Pension Reason</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='PMPH_EAR_PENS_REA'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.PMPH_EAR_PENS_REA || undefined}
                                                onChange={e => handleChangeValue('PMPH_EAR_PENS_REA', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Normal Retirement date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='PMPH_NORM_RET_DT'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PMPH_NORM_RET_DT}
                                                onChange={date => handleChangeValue('PMPH_NORM_RET_DT', date, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Date</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='PMPH_DT'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PMPH_DT}
                                                onChange={date => handleChangeValue('PMPH_DT', date, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Curr Code</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='PMPH_CURR_CODE'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.PMPH_CURR_CODE || undefined}
                                                onChange={e => handleChangeValue('PMPH_CURR_CODE', e, setFieldValue)}
                                            />

                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Exch Rate</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='PMPH_EXCH_RATE'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PMPH_EXCH_RATE}
                                                onChange={e => handleChangeValue('PMPH_EXCH_RATE', e?.target?.value, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Comm %</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='PMPH_COMM_PER'
                                                placeholder='0'
                                                format='number'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PMPH_COMM_PER}
                                                onChange={e => handleChangeValue('PMPH_COMM_PER', e?.target?.value, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Tax Basis</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_TAX_BASIS'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_TAX_BASIS || undefined}
                                                onChange={e => handleChangeValue('PMPH_TAX_BASIS', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Annuity Type</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_ANN_TYPE'
                                                size='large'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_ANN_TYPE || undefined}
                                                onChange={e => handleChangeValue('PMPH_ANN_TYPE', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Ann Repay Exch Factor</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_ANN_REPAY_EXCH_FACT'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_ANN_REPAY_EXCH_FACT || undefined}
                                                onChange={e => handleChangeValue('PMPH_ANN_REPAY_EXCH_FACT', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Annuity MOP</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_ANN_MOP'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_ANN_MOP || undefined}
                                                onChange={e => handleChangeValue('PMPH_ANN_MOP', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Guarantee Period</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_GUAR_PER'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_GUAR_PER || undefined}
                                                onChange={e => handleChangeValue('PMPH_GUAR_PER', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Cust Code</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='PMPH_CUST_CODE'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.PMPH_CUST_CODE || undefined}
                                                onChange={e => handleChangeValue('PMPH_CUST_CODE', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>PMPH_FREEZE_YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PMPH_FREEZE_YN'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PMPH_FREEZE_YN || undefined}
                                                onChange={e => handleChangeValue('PMPH_FREEZE_YN', e, setFieldValue)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>FC Final Salary</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='PMPH_FC_FIN_SAL'
                                                placeholder='.00'
                                                format='amount'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PMPH_FC_FIN_SAL}
                                                onChange={e => handleChangeValue('PMPH_FC_FIN_SAL', e?.target?.value, setFieldValue)}
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
                                                onChange={e => handleChangeValue('LC', e?.target?.value, setFieldValue)}
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
