import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import { ErrorMessage, Form, Formik } from 'formik';
import { CustomNumberField } from '../../../../components/commonExportsFields/CommonExportsFields';
import ChequeForm from './ChequeForm';
import CreitCardForm from './CreitCardForm';
import BankTransferForm from './BankTransferForm';
import paymentValidaionSchema from './PaymentSchema';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';

const PayForm = ({ options, currentValue, handleSaveOrUpdate, approveReceipt, headerStatus }) => {
    const getLovList = useApiRequests('getLovList', 'GET');
    const savePayDetails = useApiRequests('savePayDetails', 'POST');
    const updatePayDetails = useApiRequests('updatePayDetails', 'POST');
    const [bankList, setBankList] = useState([]);
    const [initValues, setInitValues] = useState(null);

    const handleGetBankList = async () => {
        try {
            const response = await getLovList('', {
                queryId: 215,
            });
            if (response?.status === 'SUCCESS') {
                setBankList(response?.Data);
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        if (currentValue !== null) setInitValues(currentValue);
        handleGetBankList();
    }, [currentValue]);

    const onSubmit = values => {
        handleSaveOrUpdate(values);
    };

    const handleOnChange = (fieldName, val, setFieldValue) => {
        setFieldValue(fieldName, val);
    };

    return (
        <div className='mt-3 grid grid-cols-2 items-center pe-3'>
            {initValues !== null && (
                <Formik
                    initialValues={initValues}
                    validationSchema={paymentValidaionSchema}
                    values={initValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, values, setFieldValue, resetForm }) => {
                        return (
                            <Form className='col-span-2' onSubmit={handleSubmit}>
                                <div className='col-span-1'>
                                    <Radio.Group
                                        value={values?.RD_PAY_MODE}
                                        size='medium'
                                        buttonStyle='solid'
                                        disabled={headerStatus?.RH_APPRV_STATUS === 'A'}
                                        onChange={e => {
                                            resetForm();
                                            handleOnChange('RD_PAY_MODE', e.target.value, setFieldValue);
                                        }}>
                                        {options.map(method => (
                                            <Radio.Button key={method.value} value={method.value}>
                                                {method.label}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </div>
                                <div className='col-span-1' />

                                <div className='fields-error col-span-2 grid grid-cols-2 gap-3 items-center mt-3'>
                                    {values.RD_PAY_MODE === 'C' && (
                                        <ChequeForm
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            handleOnChange={handleOnChange}
                                            readOnly={headerStatus?.RH_APPRV_STATUS === 'A'}
                                        />
                                    )}
                                    {values.RD_PAY_MODE === 'CC' && (
                                        <CreitCardForm
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            handleOnChange={handleOnChange}
                                            bankList={bankList}
                                            readOnly={headerStatus?.RH_APPRV_STATUS === 'A'}
                                        />
                                    )}
                                    {values.RD_PAY_MODE === 'AD' && (
                                        <BankTransferForm
                                            values={values}
                                            setFieldValue={setFieldValue}
                                            handleOnChange={handleOnChange}
                                            bankList={bankList}
                                            readOnly={headerStatus?.RH_APPRV_STATUS === 'A'}
                                        />
                                    )}
                                </div>
                                <div className='fields-error col-span-2 grid grid-cols-2 gap-4 items-center mt-5'>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>FC Amount</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name={`RD_FC_AMT`}
                                                placeholder={'0'}
                                                value={values?.RD_FC_AMT}
                                                readOnly={headerStatus?.RH_APPRV_STATUS === 'A'}
                                                onChange={e => handleOnChange('RD_FC_AMT', e.target.value, setFieldValue)}
                                            />
                                            <ErrorMessage name='RD_FC_AMT' component='div' className='error-message' />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>LC Amount</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                name={`RD_LC_AMT`}
                                                placeholder={'0'}
                                                readOnly={true}
                                                value={values?.RD_LC_AMT}
                                                onChange={e => handleOnChange('RD_LC_AMT', e.target.value, setFieldValue)}
                                            />
                                            <ErrorMessage name='RD_LC_AMT' component='div' className='error-message' />
                                        </div>
                                    </div>
                                </div>
                                {headerStatus?.RH_APPRV_STATUS !== 'A' &&
                                    <div className='flex justify-center'>
                                        <button className='sub_btn' type='submit' onClick={() => setTimeout(() => {
                                            resetForm()
                                        }, 100)}>
                                            Pay
                                        </button>
                                        <button className='approve_btn' type='button' onClick={() => approveReceipt()}>
                                            Approve
                                        </button>
                                    </div>
                                }
                            </Form>
                        );
                    }}
                </Formik>
            )
            }
        </div >
    );
};

export default PayForm;
