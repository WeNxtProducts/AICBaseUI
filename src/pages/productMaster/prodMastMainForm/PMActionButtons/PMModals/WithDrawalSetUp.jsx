import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { Form, Formik } from 'formik';
import { CustomInput, CustomNumberField, CustomSelect } from '../../../../../components/commonExportsFields/CommonExportsFields';
import { withdrawalMethod } from '../../../../../components/tableComponents/sampleData';

const modalStyles = {
    topPosition: { top: 100 },
};

const MessageTitle = ({ title }) => <p className='modal_msg_delete select-none'>{title}</p>;

const WithDrawalSetUp = ({ open, handleClose }) => {
    const [Open, setOpen] = useState(false);
    const [initValues, setInitValues] = useState({
        WITHDRAWAL_CALC_METHOD: '',
        REFUND_FACTOR_FOR_COMPLETED_YEARS: '',
        REFUND_FACTOR_FOR_BROKEN_YEARS: '',
        MINIMUM_WITHDRAWAL_MONTHS: '',
    });

    useEffect(() => {
        setOpen(open)
    }, [])

    const onClose = status => {
        setOpen(false);
        handleClose(status);
    };

    const onSubmit = values => {
        console.log("Values : ", values);
    };


    return (
        <Modal
            open={Open}
            width={900}
            title={<MessageTitle title='Withdrawal Setup' />}
            style={modalStyles?.topPosition}
            onCancel={() => onClose(false)}
            maskClosable={false}
            className='withdrawal_setup_modal'
            footer={null}>
            <div className='grid grid-cols-2 items-center mt-5'>
                <Formik
                    initialValues={initValues}
                    values={initValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, values, setFieldValue, resetForm }) => {
                        return (
                            <Form className='col-span-2 grid grid-cols-5 gap-3' onSubmit={handleSubmit}>
                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Withdrawal Calc Method</p>
                                    <div className='col-span-2'>
                                        <CustomSelect
                                            name='WITHDRAWAL_CALC_METHOD'
                                            size='large'
                                            showSearch={false}
                                            readOnly={false}
                                            options={withdrawalMethod}
                                            placeholder='select'
                                            value={values?.WITHDRAWAL_CALC_METHOD || undefined}
                                            onChange={e => setFieldValue('WITHDRAWAL_CALC_METHOD', e)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Refund Factor for completed Years</p>
                                    <div className='col-span-2'>
                                        <CustomInput
                                            name='REFUND_FACTOR_FOR_COMPLETED_YEARS'
                                            size='large'
                                            placeholder='0'
                                            readOnly={false}
                                            value={values?.REFUND_FACTOR_FOR_COMPLETED_YEARS}
                                            onChange={e => setFieldValue('REFUND_FACTOR_FOR_COMPLETED_YEARS', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Refund Factor for Broken Period</p>
                                    <div className='col-span-2'>
                                        <CustomInput
                                            name='REFUND_FACTOR_FOR_BROKEN_YEARS'
                                            size='large'
                                            placeholder='0'
                                            readOnly={false}
                                            value={values?.REFUND_FACTOR_FOR_BROKEN_YEARS}
                                            onChange={e => setFieldValue('REFUND_FACTOR_FOR_BROKEN_YEARS', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Minimum Withdrawal Months</p>
                                    <div className='col-span-2'>
                                        <CustomNumberField
                                            name='MINIMUM_WITHDRAWAL_MONTHS'
                                            format='number'
                                            placeholder='0'
                                            size='large'
                                            readOnly={false}
                                            value={values?.MINIMUM_WITHDRAWAL_MONTHS}
                                            onChange={e => setFieldValue('MINIMUM_WITHDRAWAL_MONTHS', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-5 flex items-center justify-center'>
                                    <button className='submit_btn' type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Modal>

    )
}

export default WithDrawalSetUp
