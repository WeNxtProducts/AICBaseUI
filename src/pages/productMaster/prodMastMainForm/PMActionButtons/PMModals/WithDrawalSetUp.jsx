import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { Form, Formik } from 'formik';
import { CustomInput, CustomNumberField, CustomSelect } from '../../../../../components/commonExportsFields/CommonExportsFields';
import { withdrawalMethod } from '../../../../../components/tableComponents/sampleData';
import useApiRequests from '../../../../../services/useApiRequests';

const modalStyles = {
    topPosition: { top: 100 },
};

const MessageTitle = ({ title }) => <p className='modal_msg_delete select-none'>{title}</p>;

const WithDrawalSetUp = ({ open, handleClose }) => {
    const [id, setId] = useState('')
    const withdrawSetupGetById = useApiRequests('withdrawSetupGetById', 'POST');
    const withdrawSetupCreate = useApiRequests('withdrawSetupCreate', 'POST')
    const withdrawSetupUpdate = useApiRequests('withdrawSetupUpdate', 'POST')

    const [Open, setOpen] = useState(false);
    const [initValues, setInitValues] = useState({
        WDRA_CLAC_MET: '',
        WDRA_REF_COMP_YRS: '',
        WDRA_REF_BRO_PER: '',
        WDRA_MIN_MON: '',
    });

    useEffect(() => {
        setOpen(open)
        if (id) {
            console.log(id)
            handleGetData()
        }
    }, [id])


    const onClose = status => {
        setOpen(false);
        handleClose(status);
    };

    const handleCreateOrUpdate = async (values, apiCalls) => {
        const payload = {
            withdrawalSetup: {
                formFields: values
            }
        }
        try {
            const response = await apiCalls(payload, {}, id && { id });
            if (response?.status === 'FAILURE') {
                setLoader(false)
                showNotification.ERROR(response?.status_msg)
            }
            if (response?.status === 'SUCCESS') {
                if (!id)
                    setId(response?.data?.Id)
                setLoader(false)
                showNotification.SUCCESS(response?.status_msg)
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('SomeTing Went Wrong!!');
        }
    };

    const handleGetData = async () => {
        try {
            const response = await withdrawSetupGetById('', { tranId: id });
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
    const onSubmit = values => {
        console.log("Values : ", values);
        handleCreateOrUpdate(values, id ? withdrawSetupUpdate : withdrawSetupCreate)
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
                                            name='WDRA_CLAC_MET'
                                            size='large'
                                            showSearch={false}
                                            readOnly={false}
                                            options={withdrawalMethod}
                                            placeholder='select'
                                            value={values?.WDRA_CLAC_MET || undefined}
                                            onChange={e => setFieldValue('WDRA_CLAC_MET', e)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Refund Factor for completed Years</p>
                                    <div className='col-span-2'>
                                        <CustomNumberField
                                            name='WDRA_REF_COMP_YRS'
                                            format='number'
                                            placeholder='0'
                                            size='large'
                                            readOnly={false}
                                            value={values?.WDRA_REF_COMP_YRS}
                                            onChange={e => setFieldValue('WDRA_REF_COMP_YRS', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Refund Factor for Broken Period</p>
                                    <div className='col-span-2'>
                                        <CustomNumberField
                                            name='WDRA_REF_BRO_PER'
                                            format='number'
                                            placeholder='0'
                                            size='large'
                                            readOnly={false}
                                            value={values?.WDRA_REF_BRO_PER}
                                            onChange={e => setFieldValue('WDRA_REF_BRO_PER', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-3 grid grid-cols-4 items-center'>
                                    <p className='col-span-2 form-label'>Minimum Withdrawal Months</p>
                                    <div className='col-span-2'>
                                        <CustomNumberField
                                            name='WDRA_MIN_MON'
                                            format='number'
                                            placeholder='0'
                                            size='large'
                                            readOnly={false}
                                            value={values?.WDRA_MIN_MON}
                                            onChange={e => setFieldValue('WDRA_MIN_MON', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-span-5 flex items-center justify-center'>
                                    <button className='submit_btn' type='submit'>
                                        {id ? 'Update' : 'Submit'}
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
