import React, { useContext, useEffect, useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDatePicker, CustomInput, CustomNumberField, CustomSelect, CustomTextArea } from '../../../components/commonExportsFields/CommonExportsFields';
import useApiRequests from '../../../services/useApiRequests';
import { productType } from '../../../contants/productMasterDropDown';
import showNotification from '../../../components/notification/Notification';
import { ProductMasterContext } from '../ProductMaster';
import { useDispatch } from 'react-redux';
import { setProdMastId } from '../../../globalStore/slices/ProdMastSlice';

const ProdMastEntryForm = () => {
    const dispatch = useDispatch()
    const { id: tranId } = useContext(ProductMasterContext);
    const productMasterGetById = useApiRequests('productMasterGetById', 'POST');
    const productMasterCreate = useApiRequests('productMasterCreate', 'POST');
    const productMasterUpdate = useApiRequests('productMasterUpdate', 'POST');

    const [loader, setLoader] = useState(false);
    const [initValues, setInitValues] = useState({
        PROD_CODE: '',
        PROD_DESC: '',
        PROD_SHORT_DESC: '',
        PROD_LONG_DESC: '',
        PROD_TYPE: '',
        PROD_SUB_TYPE: '',
        CONTRIBUTION_FROM: '',
        SPOUSE_PENSION: '',
        NORMAL_TAX: '',
        EXTRA_TAX: '',
        COMMUTATIVE_TAX: '',
        WITHDRAWAL_TAX: '',
        ANNUITY_TAX: '',
        INTEREST_CALC: '',
        PENSION_PURCHASE: '',
        SUM_ASSURED: '',
        SUM_ASSURED_AMT: '',
        PROD_EFF_FM_DT: '',
        PROD_EFF_TO_DT: ''
    });

    const handleGetData = async () => {
        try {
            const response = await productMasterGetById('', { tranId: tranId });
            if (response?.status === 'FAILURE') {
                setLoader(false)
                showNotification.ERROR(response?.status_msg)
            }
            if (response?.status === 'SUCCESS') {
                setInitValues(response?.Data)
                showNotification.SUCCESS(response?.status_msg)
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('SomeTing Went Wrong!!');
        }
    };

    useEffect(() => {
        if (tranId) {
            console.log(tranId)
            handleGetData()
        }
    }, [tranId])

    const handleCreateOrUpdate = async (values, apiCalls) => {
        const payload = {
            productMaster: {
                formFields: values
            }
        }
        try {
            const response = await apiCalls(payload, {}, tranId && { tranId });
            if (response?.status === 'FAILURE') {
                setLoader(false)
                showNotification.ERROR(response?.status_msg)
            }
            if (response?.status === 'SUCCESS') {
                if (!tranId)
                    dispatch(setProdMastId(response?.data?.Id))
                setLoader(false)
                showNotification.SUCCESS(response?.status_msg)
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('SomeTing Went Wrong!!');
        }
    };

    const onSubmit = values => {
        handleCreateOrUpdate(values, tranId ? productMasterUpdate : productMasterCreate)
    }

    return (
        <div>
            <div className='flex items-center justify-between pl-1'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Product Master`}</p>
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
                                        <p className='col-span-1 form-label'>Product Code</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='PROD_CODE'
                                                size='medium'
                                                placeholder='product code'
                                                readOnly={false}
                                                value={values?.PROD_CODE}
                                                onChange={e => setFieldValue('PROD_CODE', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Descrption</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='PROD_DESC'
                                                size='large'
                                                placeholder='description'
                                                readOnly={false}
                                                value={values?.DESC}
                                                onChange={e => setFieldValue('PROD_DESC', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Short Description</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='PROD_SHORT_DESC'
                                                size='large'
                                                placeholder='short description'
                                                readOnly={false}
                                                value={values?.PROD_SHORT_DESC}
                                                onChange={e => setFieldValue('PROD_SHORT_DESC', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Long Description</p>
                                        <div className='col-span-3'>
                                            <CustomTextArea
                                                value={values?.PROD_LONG_DESC}
                                                placeholder='long description'
                                                readOnly={false}
                                                onChange={e => {
                                                    setFieldValue('PROD_LONG_DESC', e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className='col-span-1' /> */}
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Product Type</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PROD_TYPE'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={productType}
                                                placeholder='select'
                                                value={values?.PROD_TYPE || undefined}
                                                onChange={e => setFieldValue('PROD_TYPE', e)}
                                            />
                                        </div>
                                    </div>
                                    {/* 
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Product Sub Type</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PROD_SUB_TYPE'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PROD_SUB_TYPE || undefined}
                                                onChange={e => setFieldValue('PROD_SUB_TYPE', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Contribution From</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='CONTRIBUTION_FROM'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.CONTRIBUTION_FROM || undefined}
                                                onChange={e => setFieldValue('CONTRIBUTION_FROM', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Spouse Pension</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='SPOUSE_PENSION'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.SPOUSE_PENSION || undefined}
                                                onChange={e => setFieldValue('SPOUSE_PENSION', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Normal Int Tax</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='NORMAL_TAX'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.NORMAL_TAX || undefined}
                                                onChange={e => setFieldValue('NORMAL_TAX', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Extra Int Tax</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='EXTRA_TAX'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.EXTRA_TAX || undefined}
                                                onChange={e => setFieldValue('EXTRA_TAX', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center gap-1'>
                                        <p className='col-span-1 form-label'>Commutation Tax YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='COMMUTATIVE_TAX'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.COMMUTATIVE_TAX || undefined}
                                                onChange={e => setFieldValue('COMMUTATIVE_TAX', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Withdrawal Tax YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='WITHDRAWAL_TAX'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.WITHDRAWAL_TAX || undefined}
                                                onChange={e => setFieldValue('WITHDRAWAL_TAX', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Annuity Tax YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='ANNUITY_TAX'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.ANNUITY_TAX || undefined}
                                                onChange={e => setFieldValue('ANNUITY_TAX', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Interest Calc Required YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='INTEREST_CALC'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.INTEREST_CALC || undefined}
                                                onChange={e => setFieldValue('INTEREST_CALC', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Pension Purchase YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='PENSION_PURCHASE'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.PENSION_PURCHASE || undefined}
                                                onChange={e => setFieldValue('PENSION_PURCHASE', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Sum Assured YN</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='SUM_ASSURED'
                                                size='small'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.SUM_ASSURED || undefined}
                                                onChange={e => setFieldValue('SUM_ASSURED', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Sum Assured Amount</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name='SUM_ASSURED_AMT'
                                                placeholder='.00'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.SUM_ASSURED_AMT}
                                                onChange={e => setFieldValue('SUM_ASSURED_AMT', e.target.value)}
                                            />
                                        </div>
                                    </div> */}

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Effective date from</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='PROD_EFF_FM_DT'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PROD_EFF_FM_DT}
                                                onChange={date => setFieldValue('PROD_EFF_FM_DT', date)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Effective date to</p>
                                        <div className='col-span-3'>
                                            <CustomDatePicker
                                                name='PROD_EFF_TO_DT'
                                                placeholder='date'
                                                size='medium'
                                                readOnly={false}
                                                value={values?.PROD_EFF_TO_DT}
                                                onChange={date => setFieldValue('PROD_EFF_TO_DT', date)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-2 flex items-center justify-center'>
                                        <button className='submit_btn' type='submit'>
                                            {tranId ? 'Update' : 'Submit'}
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

export default ProdMastEntryForm
