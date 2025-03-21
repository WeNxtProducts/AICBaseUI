import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../Quotation';
import {
    CustomDropDown,
    CustomNumberField,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { FieldArray, Form, Formik, ErrorMessage } from 'formik';
import { brokerValidationSchema } from '../../../../components/commonHelper/SchemaGenerator';
import { DeleteOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import Loader from '../../../../components/loader/Loader';
import BrokerTree from './brokerTree/BrokerTree';
import { Popover } from 'antd';
import BrokerRates from './BrokerRates';

const BrokerAgent = () => {
    const {
        formValues,
        freeze,
        handleNext,
        rules,
        isPremCalc,
        id: tranId,
    } = useContext(StepperContext);
    const getParamLov = useApiRequests('getParamLov', 'GET');
    const updateBrokers = useApiRequests('updateBrokers', 'POST');
    const getBrokerList = useApiRequests('getBrokerList', 'POST');
    const deleteBroker = useApiRequests('deleteBroker', 'POST');
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const brokerTypeShared =
        formValues?.frontForm?.formFields?.POL_AGENT_COMM_BASIS?.PFD_FLD_VALUE === 'S';
    const brokerCodeChange =
        formValues?.frontForm?.formFields?.POL_AGENT_CODE?.PFD_FLD_VALUE;
    const [agentList, setAgentList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [collapsedBrokers, setCollapsedBrokers] = useState({});

    const handleGetBrokerList = async () => {
        try {
            const response = await getBrokerList('', { tranId });
            if (response?.status === 'SUCCESS') {
                // if (response?.Data?.polBrokerDetails?.length > 0) {
                setInitialValues(response?.Data);
                const agentList = response?.Data?.polBrokerDetails.reduce((acc, broker, index) => {
                    acc[index] = [
                        { label: broker.formFields.PBRK_BRK_NAME, value: broker.formFields.PBRK_BRK_CODE },
                    ];
                    return acc;
                }, {});
                setAgentList(agentList);
                // } else {
                //     setInitialValues(null)
                // }
            } else if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            setLoader(false);
        } catch (err) {
            setLoader(false);
            showNotification.ERROR(`Can't able to get broker list`);
        }
    };

    useEffect(() => {
        handleGetBrokerList();
    }, [brokerCodeChange]);

    const onHandleSearch = async (val, index) => {
        try {
            const response = await getParamLov('', {
                queryId: 206,
                searchTerm: val,
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setAgentList(prevList => ({
                    ...prevList,
                    [index]: response?.Data?.PBRK_BRK_CODE,
                }));
            }
        } catch (err) {
            return null;
        }
    };

    const onBlurHandler = async (label, path, setFieldValue) => {
        setFieldValue(path, label);
    };

    const validateBrokerPercentages = vals => {
        const totalPercentage = vals?.polBrokerDetails?.reduce((acc, broker) => {
            const percentage = parseFloat(broker.formFields.PBRK_BRK_PERC) || 0;
            return acc + percentage;
        }, 0);
        return totalPercentage <= 100;
    };

    const procedureCall = async (newBroker, modifiedBroker, values) => {
        setLoader(true);
        const payload = { inParams: newBroker[0] };
        try {
            const response = await invokeClaimsProcedure(payload, {
                procedureName: 'P_INS_BROK',
                packageName: 'WNPKG_POLICY',
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                // if (modifiedBroker?.length > 0) {

                values?.polBrokerDetails.forEach(detail => {
                    // if (detail.formFields?.children) {
                    //     delete detail.formFields.children;
                    // }
                    if (!detail.formFields.PBRK_TRAN_ID) {
                        detail.formFields.PBRK_TRAN_ID = response?.Data?.P_BROK_ID;
                    }
                });

                updateBrokerPercentage(values)
                // } else if (modifiedBroker?.length === 0) {
                //     showNotification.SUCCESS(response?.status_msg);
                // }
            }
        } catch (err) {
            setLoader(false);
        } finally {
            setLoader(false);
        }
    };

    const updateBrokerPercentage = async (modifiedBroker) => {
        try {
            const response = await updateBrokers(modifiedBroker);
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                handleGetBrokerList()
                showNotification.SUCCESS(response?.status_msg);
            }
        } catch (err) {
            return null;
        }
    }

    const onSubmit = async values => {
        const isValid = validateBrokerPercentages(values);

        if (!isValid) {
            showNotification.WARNING('Percentage should not exceed 100');
        } else if (isValid) {
            const noPolTranId = values?.polBrokerDetails.filter(item => !item?.formFields?.PBRK_TRAN_ID);

            const modifiedPercentage = values?.polBrokerDetails.filter(newItem => {
                const oldItem = initialValues?.polBrokerDetails.find(old => old.formFields.PBRK_BRK_CODE === newItem.formFields.PBRK_BRK_CODE);
                return oldItem && newItem.formFields.PBRK_BRK_PERC != oldItem.formFields.PBRK_BRK_PERC;
            });

            values?.polBrokerDetails.forEach(detail => {
                if (detail.formFields?.children) {
                    delete detail.formFields.children;
                }
            });

            if (noPolTranId?.length > 0) {
                const transformedData = noPolTranId.map(item => ({
                    P_POL_TRAN_ID: tranId,
                    P_POL_AGENT_CODE: item.formFields.PBRK_BRK_CODE
                }));
                procedureCall(transformedData, modifiedPercentage, values)
            } else if (noPolTranId?.length === 0) {
                if (modifiedPercentage?.length > 0) {
                    updateBrokerPercentage(values)
                }
            }
        }
    };

    const extractBrokerIds = (node) => [
        ...(node.PBRK_TRAN_ID ? [node.PBRK_TRAN_ID] : []),
        ...(node.children?.flatMap(extractBrokerIds) || [])
    ];

    const handleDeleteBroker = async (mainBroker) => {
        const brokerIds = extractBrokerIds(mainBroker.formFields);
        try {
            const response = await deleteBroker({ polBrokerIds: brokerIds });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                handleGetBrokerList()
                showNotification.SUCCESS(response?.status_msg);
            }
        } catch (err) {
            return null;
        }
    }

    const toggleCollapse = (brokerId) => {
        setCollapsedBrokers(prevState => ({
            ...prevState,
            [brokerId]: !prevState[brokerId] // Toggle the collapse state
        }));
    };

    const renderBrokers = (brokers, level = 0, parentId) => {
        return (
            <div className='sub-broker-list col-span-6'>
                {brokers.map((broker, index) => {
                    const brokerId = `${broker.PBRK_BRK_CODE}-${level}`;
                    const isCollapsed = collapsedBrokers[brokerId] ?? false;

                    return (
                        <div key={`${brokerId}-${level}-${index}-child`} className='broker-wrapper'>
                            <div
                                className='broker-card mt-2 grid grid-cols-12 gap-x-1 col-span-11'
                                style={{ marginLeft: `${level * 15}px` }}
                            >

                                <div className='broker-details col-span-11 grid grid-cols-6 items-center pe-4'>
                                    <p className='m-0 col-span-2'><strong>Name:</strong> {broker.PBRK_BRK_NAME}</p>
                                    <p className='m-0 col-span-2 mx-auto'><strong>Code:</strong> {broker.PBRK_BRK_CODE}</p>
                                    <p className='m-0 col-span-2 mx-auto'><strong>Percentage:</strong> {broker.PBRK_BRK_PERC}%</p>
                                </div>

                                <div className='col-span-1 action-sub'>
                                    <div className='flex items-center justify-between'>
                                        <div className='mt-1 m-auto'>
                                            <Popover
                                                overlayClassName={'broker_details_Popover'}
                                                content={<BrokerRates brokerId={broker?.PBRK_TRAN_ID}
                                                    code={broker?.PBRK_BRK_CODE}
                                                    brokerName={broker?.PBRK_BRK_NAME} />}
                                                trigger='hover'>
                                                <InfoCircleOutlined className='info-icon' />
                                            </Popover>
                                        </div>
                                        <div>
                                            {broker?.children && broker?.children.length > 0 && (
                                                <button
                                                    type='button'
                                                    className={`collapse-icon ${isCollapsed ? 'rotate-icon' : ''}`}
                                                    onClick={() => toggleCollapse(brokerId)}
                                                >
                                                    <RightOutlined />
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </div>

                            </div>

                            {/* <div className='ml-5 col-span-1 flex items-center'>
                                {!freeze && (
                                    <button type='button' onClick={() => {
                                        handleDeleteBroker(broker?.PBRK_TRAN_ID, parentId)
                                    }}>
                                        <DeleteOutlined className='delete-button' />
                                    </button>
                                )}
                            </div> */}


                            {/* Render Children */}
                            {isCollapsed && broker.children && broker.children.length > 0 && (
                                <div className='children'>
                                    {renderBrokers(broker.children, level + 1, parentId)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className='broker_agent p-3'>
            {loader && <Loader />}
            {initialValues !== null ? (
                <Formik
                    initialValues={initialValues}
                    validationSchema={brokerValidationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ values, setFieldValue, errors }) => {
                        return (
                            <Form>
                                <FieldArray name='polBrokerDetails'>
                                    {({ push, remove, insert }) => (
                                        <div className='grid grid-cols-8'>
                                            {brokerTypeShared && (
                                                <div className='col-span-6 flex justify-end'>
                                                    {!freeze && (
                                                        <button
                                                            type='button'
                                                            className='add-buttons-broker'
                                                            onClick={() => {
                                                                insert(0, { formFields: { PBRK_BRK_CODE: '', PBRK_BRK_NAME: '', PBRK_BRK_PERC: '' } })
                                                                // push({ formFields: { PBRK_BRK_CODE: '', PBRK_BRK_NAME: '', PBRK_BRK_PERC: '' } })
                                                            }}>
                                                            <div className='flex items-center'>
                                                                <i className='bi bi-plus icon-style' />
                                                                <p>Add New</p>
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            {values?.polBrokerDetails?.length > 0 &&
                                                <div className='col-span-8'>
                                                    {values?.polBrokerDetails?.map((broker, index) => {
                                                        const hasChildren = broker?.formFields?.children?.length > 0;
                                                        return (
                                                            <div className='grid grid-cols-2 gap-x-7 mt-3'
                                                                data-id={`${index}-parent`} key={`${index}-parent`}>
                                                                <div className='col-span-1'>
                                                                    <div className='flex items-center'>
                                                                        <div className='w-2/12'>
                                                                            <p className='label-font select-none'>
                                                                                Agent Code <span className='mandatory-symbol'>*</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className='w-8/12 fields-error'>
                                                                            <CustomDropDown
                                                                                name={`polBrokerDetails.${index}.formFields.PBRK_BRK_CODE`}
                                                                                options={agentList[index] || []}
                                                                                readOnly={freeze}
                                                                                value={broker?.formFields?.PBRK_BRK_CODE || undefined}
                                                                                onSearch={e => {
                                                                                    onHandleSearch(e, index);
                                                                                }}
                                                                                onChange={e =>
                                                                                    setFieldValue(`polBrokerDetails.${index}.formFields.PBRK_BRK_CODE`, e)
                                                                                }
                                                                                onBlur={(e, label) =>
                                                                                    onBlurHandler(
                                                                                        label,
                                                                                        `polBrokerDetails.${index}.formFields.PBRK_BRK_NAME`,
                                                                                        setFieldValue,
                                                                                    )
                                                                                }
                                                                                format='codedescsearch'
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`polBrokerDetails.${index}.formFields.PBRK_BRK_CODE`}
                                                                                component='div'
                                                                                className='error-message'
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className='col-span-1'>
                                                                    <div className='flex items-center'>
                                                                        <div className='w-2/12'>
                                                                            <p className='label-font select-none'>
                                                                                Percentage <span className='mandatory-symbol'>*</span>
                                                                            </p>
                                                                        </div>
                                                                        <div className='w-8/12 fields-error flex items-center'>
                                                                            <CustomNumberField
                                                                                name={`polBrokerDetails.${index}.formFields.PBRK_BRK_PERC`}
                                                                                placeholder='0'
                                                                                format='number'
                                                                                size='small'
                                                                                readOnly={freeze}
                                                                                value={broker?.formFields?.PBRK_BRK_PERC}
                                                                                onChange={e => {
                                                                                    setFieldValue(
                                                                                        `polBrokerDetails.${index}.formFields.PBRK_BRK_PERC`,
                                                                                        e.target.value,
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`polBrokerDetails.${index}.formFields.PBRK_BRK_PERC`}
                                                                                component='div'
                                                                                className='error-message'
                                                                            />
                                                                            {broker?.formFields?.PBRK_TRAN_ID &&
                                                                                <div className='ml-3'>
                                                                                    <Popover
                                                                                        overlayClassName={'broker_details_Popover'}
                                                                                        content={<BrokerRates brokerId={broker?.formFields?.PBRK_TRAN_ID}
                                                                                            code={broker?.formFields?.PBRK_BRK_CODE}
                                                                                            brokerName={broker?.formFields?.PBRK_BRK_NAME}
                                                                                        />
                                                                                        }
                                                                                        trigger='hover'>
                                                                                        <InfoCircleOutlined className='info-icon' />
                                                                                    </Popover>
                                                                                </div>
                                                                            }

                                                                            {brokerTypeShared && (
                                                                                <div className='ml-5'>
                                                                                    {!freeze && (
                                                                                        <button type='button' onClick={() => {
                                                                                            if (broker?.formFields?.PBRK_TRAN_ID) {
                                                                                                handleDeleteBroker(broker)
                                                                                            } else if (!broker?.formFields?.PBRK_TRAN_ID) {
                                                                                                remove(index)
                                                                                            }
                                                                                        }}>
                                                                                            <DeleteOutlined className='delete-button' />
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='col-span-2 grid grid-cols-8'>
                                                                    {hasChildren &&
                                                                        renderBrokers(broker?.formFields?.children, 1, broker?.formFields?.PBRK_TRAN_ID)
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    )}
                                </FieldArray>
                                <div className='col-span-6 flex justify-center w-full mt-5 mb-3 broker-submit-button-form'>
                                    {brokerTypeShared && !freeze && (
                                        <button disabled={freeze} type='submit' className='save me-5'>
                                            Submit
                                        </button>
                                    )}

                                    <button type='button' onClick={() => handleNext()} className='next-btn ml-5'>
                                        Next
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            ) : (
                <p className='text-base font-medium hover:font-bold cursor-default'>No Broker Found</p>
            )
            }
        </div >
    );
};

export default BrokerAgent;
