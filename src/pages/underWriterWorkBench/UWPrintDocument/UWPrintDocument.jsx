import { Modal } from 'antd';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { handleFileDownloadOrView } from '../../../components/mediaHelper/MediaHelper';
import Loader from '../../../components/loader/Loader';
import { checkPageType } from '../UWHelper';

const UWPrintDocument = ({ open, handleClose, policyDetails, tranId, POL_NO }) => {
    const { POL_PLAN_CODE, POL_CONVERT_YN } = policyDetails
    const pageType = checkPageType(POL_NO)
    const getLovList = useApiRequests('getLovList', 'GET');
    const DMSFileGenerate = useApiRequests('DMSFileGenerateDocument', 'POST');
    const getParamLov = useApiRequests('getParamLov', 'GET');
    const [Open, setOpen] = useState(false);
    const [dropDown, setDropDown] = useState(null);
    const [loader, setLoader] = useState(false);
    const [fieldName, setFieldName] = useState(`${pageType} No`)
    const [initialValues, setInitialValues] = useState({
        POL_ENDT: pageType,
        tranId: POL_NO,
        REP_POST: 'PREVIEW',
        PRINTYPE: 'Original',
        alteration_number: '',
        docTemplateName: '',
    });
    const lovQueryId = [
        { id: 401, label: 'POL_ENDT' },
        { id: 402, label: 'PRINTYPE' },
        { id: 403, label: 'REP_POST' }
    ]

    const handleGetReportType = async (dropDownData) => {
        try {
            const response = await getParamLov('', {
                queryId: 404,
                DPS_PROD_CODE: POL_PLAN_CODE,
                DPS_SCREEN_NAME: POL_CONVERT_YN === 'Y' ? 'POL' : 'PRO',
                DPS_TRAN_STS: POL_CONVERT_YN,
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                if (response?.Data?.['template name']?.length > 0) {
                    setInitialValues((prev) => ({
                        ...prev,
                        docTemplateName: response?.Data?.['template name']?.[0]?.value,
                    }));
                }
                const newDropDown = {
                    ...dropDownData,
                    docTemplateName: response?.Data?.['template name']
                }
                setDropDown(newDropDown)
            }
        } catch (err) {
            return null;
        }
    };

    const apiCallsGetLov = () => {
        const promises = lovQueryId?.map(async item => {
            const queryParams = { queryId: item.id };
            const response = await getLovList('', queryParams);
            return ({
                [item.label]: response?.Data
            });
        });

        Promise.all(promises)
            .then(responses => {
                const transformedData = responses.reduce((acc, item) => {
                    const [key, value] = Object.entries(item)[0];
                    acc[key] = value;
                    return acc;
                }, {});
                handleGetReportType(transformedData)
                // setDropDown(transformedData)
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        apiCallsGetLov()
        setOpen(open);
    }, [open]);

    const onClose = (decision) => {
        setOpen(false);
        handleClose(decision);
    };

    const onSubmit = async values => {
        handleGetAndView(values);
    }

    const handleGetAndView = async (values) => {
        console.log("values : ", values)
        setLoader(true)
        const payload = {
            docTemplateName: values?.docTemplateName,
            tranId: tranId.toString(), genType: '.pdf'
        }
        try {
            const response = await DMSFileGenerate(payload);
            if (response?.status === 'FAILURE') {
                setLoader(false)
                showNotification.ERROR(response?.status_msg)
            }
            if (response?.status === 'SUCCESS') {
                const updatedItem = {
                    filename: `${payload?.docTemplateName}.${payload?.genType}`,
                    byteArray: response?.Data?.attachment
                };
                handleFileDownloadOrView(updatedItem);
                setLoader(false)
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('Error on Viewing file');
        }
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
                {loader && <Loader />}
                {dropDown !== null &&
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
                                                    options={dropDown?.POL_ENDT}
                                                    placeholder='select'
                                                    size='medium'
                                                    showSearch={false}
                                                    value={values?.POL_ENDT || undefined}
                                                    onChange={e => {
                                                        console.log("POL_ENDT : ", e)
                                                        setFieldName(e === 'Quotation' ? 'Quotation No' : 'Policy No')
                                                        setFieldValue('POL_ENDT', e);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                            <div className='col-span-2'>
                                                <p className='label-font'>{fieldName}<span className='mandatory-symbol'>*</span></p>
                                            </div>
                                            <div className='col-span-7'>
                                                <CustomSelect
                                                    options={[]}
                                                    readOnly={true}
                                                    disabled={true}
                                                    placeholder='select'
                                                    size='medium'
                                                    value={values?.tranId || undefined}
                                                    onChange={e => {
                                                        setFieldValue('tranId', e);
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
                                                    options={dropDown?.REP_POST}
                                                    placeholder='select'
                                                    showSearch={false}
                                                    size='medium'
                                                    value={values?.REP_POST || undefined}
                                                    onChange={e => {
                                                        setFieldValue('REP_POST', e);
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
                                                    options={dropDown?.PRINTYPE}
                                                    placeholder='select'
                                                    showSearch={false}
                                                    size='medium'
                                                    value={values?.PRINTYPE || undefined}
                                                    onChange={e => {
                                                        setFieldValue('PRINTYPE', e);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
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
                                        </div> */}

                                        <div className='col-span-1 grid grid-cols-9 gap-3 items-center'>
                                            <div className='col-span-2'>
                                                <p className='label-font'>Report Type</p>
                                            </div>
                                            <div className='col-span-7'>
                                                <CustomSelect
                                                    options={dropDown?.docTemplateName}
                                                    placeholder='select'
                                                    showSearch={false}
                                                    size='medium'
                                                    value={values?.docTemplateName || undefined}
                                                    onChange={e => {
                                                        setFieldValue('docTemplateName', e);
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
                }
            </div>
        </Modal>
    )
}

export default UWPrintDocument
