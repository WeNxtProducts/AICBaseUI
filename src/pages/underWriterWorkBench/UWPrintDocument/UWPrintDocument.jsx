import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { CustomDatePicker, CustomNumberField, CustomSelect, CustomTextArea } from '../../../components/commonExportsFields/CommonExportsFields';

const UWPrintDocument = ({ open, handleClose }) => {
    const [Open, setOpen] = useState(false);
    const [initialValues, setInitialValues] = useState({
        type: '',
        proposal_no: '',
        schdule: '',
        print_type: '',
        alteration_number: '',
        report_type: '',
    });

    const onSubmit = async values => {
        console.log("values : ", values);
    }

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const onClose = (decision) => {
        setOpen(false);
        handleClose(decision);
    };

    return (
        <Modal
            open={Open}
            width={1100}
            title='Document Print'
            onCancel={() => onClose(false)}
            maskClosable={false}
            className='UW_print_doc'
            footer={null}
        >
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className='pl-1 mt-4 grid grid-cols-2 gap-5 items-start'>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>
                                                Type
                                            </p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.type || undefined}
                                                onChange={e => {
                                                    setFieldValue('type', e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Propsal No<span className='mandatory-symbol'>*</span></p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.proposal_no || undefined}
                                                onChange={e => {
                                                    setFieldValue('proposal_no', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Schedule<span className='mandatory-symbol'>*</span></p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.schdule || undefined}
                                                onChange={e => {
                                                    setFieldValue('schdule', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Print Type<span className='mandatory-symbol'>*</span></p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.print_type || undefined}
                                                onChange={e => {
                                                    setFieldValue('print_type', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Alteration Number</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.alteration_number || undefined}
                                                onChange={e => {
                                                    setFieldValue('alteration_number', e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                        <div className='col-span-2'>
                                            <p className='label-font'>Report Type</p>
                                        </div>
                                        <div className='col-span-7'>
                                            <CustomSelect
                                                options={[]}
                                                placeholder='select'
                                                size='medium'
                                                value={values?.report_type || undefined}
                                                onChange={e => {
                                                    setFieldValue('report_type', e);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-2 mt-3 flex items-center justify-center'>
                                        <button type='submit' className='ok_button w-1/12'>
                                            Print
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Modal>
    )
}

export default UWPrintDocument
