import React, { useEffect, useState } from 'react'
import { ErrorMessage, Form, Formik } from 'formik';
import {
    CustomDatePicker, CustomInput,
    CustomNumberField, CustomSelect
} from '../../components/commonExportsFields/CommonExportsFields';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { claimIntimationSchema } from './schemaClaimIntiEndoReq';
import showNotification from '../../components/notification/Notification';
import useApiRequests from '../../services/useApiRequests';
import { setPolNo, setPolTranId } from '../../globalStore/slices/CustPolSlice';
import Loader from '../../components/loader/Loader';
import './ClaimIntimation.scss'

const ClaimIntimation = ({ typeLovId, type, page }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { pol_no, polTranId } = useSelector(state => state.custPol)
    const getParamLov = useApiRequests('getParamLov', 'GET');
    const getLossType = useApiRequests('getLovList', 'GET');
    const getInitialData = useApiRequests('getClaimIntimation', 'POST');
    const saveAPI = useApiRequests('saveClaimIntimation', 'POST');
    const updateAPI = useApiRequests('updateClaimIntimation', 'POST');
    const [loader, setLoader] = useState(false)
    const [dropDown, setDropDown] = useState({})
    const [initValues, setInitValues] = useState({
        CI_POL_NO: pol_no || '',
        CI_INTM_DT: polTranId ? '' : dayjs().format('YYYY-MM-DD'),
        CI_TYPE: '',
        CI_LOSS_DT: '',
        CI_CONTACT_PER: '',
        CI_CONTACT_NO: '',
        CI_EMAIL: '',
        CI_CLM_END: type
    });

    const handleGetPolicyList = async () => {
        setLoader(true)
        Promise.all([
            getParamLov('', { queryId: 274, tranId: 'CUST001' }),
            getLossType('', { queryId: typeLovId }),
        ])
            .then(([policyListData, lossType]) => {
                setDropDown({
                    CI_POL_NO: policyListData?.Data?.policyNumberList,
                    CI_TYPE: lossType?.Data
                })
            })
            .catch((err) => {
                showNotification.WARNING(err?.message || 'Something went wrong');
            })
            .finally(() => {
                setLoader(false)
            })
    };

    useEffect(() => {
        handleGetPolicyList()
        if (polTranId) {
            handleGetInitialData()
        }
    }, [])

    const handleGetInitialData = async () => {
        setLoader(true)
        try {
            const response = await getInitialData('', { tranId: polTranId });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setInitValues(response?.Data)
            }
        } catch (err) {
            showNotification.ERROR(err?.message || 'Something went wrong!');
        } finally {
            setLoader(false)
        }
    };

    const handleUpdateOrSave = async (payload, apiCalls) => {
        setLoader(true)
        try {
            const response = await apiCalls(payload, {}, polTranId && { polTranId });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                if (!polTranId) {
                    dispatch(setPolNo(payload?.claimIntimation?.formFields?.CI_POL_NO));
                    dispatch(setPolTranId(response?.data?.Id));
                }
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong!');
        } finally {
            setLoader(false)
        }
    }

    const onSubmit = values => {
        const payload = {
            claimIntimation: {
                formFields: { ...values }
            }
        }
        handleUpdateOrSave(payload, polTranId ? updateAPI : saveAPI)
    };

    return (
        <div className='claim_intimation'>
            {loader && <Loader />}
            <div className='flex items-center pl-2'>
                <i
                    onClick={() => navigate(page, { replace: true })}
                    className='bi bi-arrow-left back_icon'
                />
                <p className='header-font pl-2'>{`${type === 'C' ? 'Claim Intimation' : 'Endorsement Request'}`}</p>
            </div>
            <div className='mt-3 mb-5'>
                <div className='grid grid-cols-2 items-center p-2'>
                    <Formik
                        initialValues={initValues}
                        values={initValues}
                        validationSchema={claimIntimationSchema(type)}
                        onSubmit={onSubmit}
                        enableReinitialize={true}>
                        {({ handleSubmit, values, setFieldValue, errors }) => {
                            return (
                                <Form className='col-span-2 grid grid-cols-2 gap-5' onSubmit={handleSubmit}>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='label-font select-none'>
                                            Policy Number
                                            <span className='mandatory-symbol'>*</span>
                                        </p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='CI_POL_NO'
                                                placeholder='pol no.'
                                                size='medium'
                                                disabled={pol_no ? true : false}
                                                options={dropDown?.CI_POL_NO}
                                                readOnly={false}
                                                value={values?.CI_POL_NO || undefined}
                                                onChange={e => setFieldValue('CI_POL_NO', e)}
                                            />
                                            <ErrorMessage
                                                name={`CI_POL_NO`}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>

                                    </div>
                                    {type === 'C' &&
                                        <div className='col-span-1 grid grid-cols-4 items-center'>
                                            <p className='label-font select-none'>
                                                Intimation Date
                                                <span className='mandatory-symbol'>*</span>
                                            </p>
                                            <div className='col-span-3'>
                                                <CustomDatePicker
                                                    placeholder='date'
                                                    size='medium'
                                                    disabled={true}
                                                    value={values?.CI_INTM_DT}
                                                    onChange={date => {
                                                        setFieldValue('CI_INTM_DT', date)
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name={`CI_INTM_DT`}
                                                    component='div'
                                                    className='error-message'
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='label-font select-none'>
                                            {type === 'C' ? 'Loss Type' : 'Endorsement Type'}
                                            <span className='mandatory-symbol'>*</span>
                                        </p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='CI_TYPE'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={dropDown?.CI_TYPE}
                                                placeholder='type'
                                                value={values?.CI_TYPE || undefined}
                                                onChange={e => setFieldValue('CI_TYPE', e)}
                                            />
                                            <ErrorMessage
                                                name={`CI_TYPE`}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>
                                    </div>
                                    {type === 'C' &&
                                        <div className='col-span-1 grid grid-cols-4 items-center'>
                                            <p className='label-font select-none'>
                                                Loss Date
                                                <span className='mandatory-symbol'>*</span>
                                            </p>
                                            <div className='col-span-3'>
                                                <CustomDatePicker
                                                    placeholder='date'
                                                    size='medium'
                                                    // disabledDates={values?.CI_INTM_DT}
                                                    value={values?.CI_LOSS_DT}
                                                    onChange={date => {
                                                        setFieldValue('CI_LOSS_DT', date)
                                                    }}
                                                />
                                                <ErrorMessage
                                                    name={`CI_LOSS_DT`}
                                                    component='div'
                                                    className='error-message'
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='label-font select-none'>
                                            Contact Person
                                            <span className='mandatory-symbol'>*</span>
                                        </p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='CI_CONTACT_PER'
                                                size='medium'
                                                placeholder='name'
                                                value={values?.CI_CONTACT_PER || undefined}
                                                onChange={e => setFieldValue('CI_CONTACT_PER', e.target.value)}
                                            />
                                            <ErrorMessage
                                                name={`CI_CONTACT_PER`}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='label-font select-none'>
                                            Contact Number
                                            <span className='mandatory-symbol'>*</span>
                                        </p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                format='number'
                                                placeholder={'number'}
                                                size='medium'
                                                value={values?.CI_CONTACT_NO}
                                                onChange={e => {
                                                    setFieldValue('CI_CONTACT_NO', e.target.value)
                                                }}
                                            />
                                            <ErrorMessage
                                                name={`CI_CONTACT_NO`}
                                                component='div'
                                                className='error-message'
                                            />
                                        </div>
                                    </div>
                                    {type === 'E' &&
                                        <div className='col-span-1 grid grid-cols-4 items-center'>
                                            <p className='label-font select-none'>
                                                Email Id
                                                <span className='mandatory-symbol'>*</span>
                                            </p>
                                            <div className='col-span-3'>
                                                <CustomInput
                                                    name='CI_EMAIL'
                                                    size='medium'
                                                    placeholder='name'
                                                    value={values?.CI_EMAIL || undefined}
                                                    onChange={e => setFieldValue('CI_EMAIL', e.target.value)}
                                                />
                                                <ErrorMessage
                                                    name={`CI_EMAIL`}
                                                    component='div'
                                                    className='error-message'
                                                />
                                            </div>
                                        </div>
                                    }

                                    <div className='col-span-2 flex items-center justify-center'>
                                        <button className='submit_btn' type='submit'>
                                            {polTranId ? 'Update' : 'Submit'}
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

export default ClaimIntimation