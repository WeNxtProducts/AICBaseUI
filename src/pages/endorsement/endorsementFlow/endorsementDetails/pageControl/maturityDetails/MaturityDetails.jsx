import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider } from 'antd';
import MaturityCards from './MaturityCards';
import { CustomDatePicker, CustomSelect } from '../../../../../../components/commonExportsFields/CommonExportsFields';
import { EndorsementContext } from '../../../../Endorsement';
import useMRVListingPayload from '../../../../../../components/mrvListing/useMRVListingPayload';
import dayjs from 'dayjs';
import ConfirmSurrenderModal from './ConfirmSurrenderModal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSurrMatId } from '../../../../../../globalStore/slices/SurrenderMaturityId';
import useApiRequests from '../../../../../../services/useApiRequests';
import showNotification from '../../../../../../components/notification/Notification';

const MaturityDetails = ({ currentTab, dataLoaded }) => {
    const { POL_NO, tranId, policyHistory } = useContext(EndorsementContext);
    const { POL_FM_DT, POL_TO_DT } = policyHistory;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const { rowData = [], columnData, handleMRVListingPayload } = useMRVListingPayload();
    const [addNew, setAddNew] = useState(false)
    const [confirmSurrModal, setConfirmSurrModal] = useState(false)
    const values = {
        inParams: {
            P_POL_NO_FM: POL_NO,
            P_POL_NO_TO: POL_NO,
            P_FM_DT: dayjs(POL_FM_DT).format("YYYY-MM-DD"),
            P_TO_DT: dayjs(POL_TO_DT).format("YYYY-MM-DD"),
            P_SURR_TYPE: 'S',
            P_SURR_DATE: dayjs().format('YYYY-MM-DD'),
        }
    }

    useEffect(() => {
        if (tranId) {
            handleMRVListingPayload({ queryId: 230, tranId });
        }
    }, [tranId]);

    useEffect(() => {
        if (rowData?.length > 0) {
            console.log("rowData : ", rowData)
        }
    }, [rowData]);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    useEffect(() => {
        // if (dataLoaded) console.log('Maturity details ');
    }, [dataLoaded]);

    const handleNavigateToAlterations = () => {
        setAddNew(true)
    };

    const handleSurrenderProcedure = async () => {
        try {
            const response = await invokeClaimsProcedure(values, {
                procedureName: 'CALC_PAIDUP_VALUE',
                packageName: 'WNPKG_SURR_PRCSS',
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setAddNew(false)
                handleMRVListingPayload({ queryId: 230, tranId });
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = (decision) => {
        console.log('decision : ', decision)
        setConfirmSurrModal(false)
        if (decision) {
            handleSurrenderProcedure()
        }
    }

    const proceedTOSurrenderMaturity = (item) => {
        console.log("item : ", item)
        dispatch(setSurrMatId(item?.ID))
        navigate('/surrender_maturity')
    }

    return (
        <div className='alteration alter_maturity'>
            {!addNew ? (
                <div className='mb-5'>
                    <Button
                        onClick={() => handleNavigateToAlterations()}
                        className='add-buttons-edorsement'
                        type='primary'
                        icon={<i className='bi bi-plus icon-style' />}>
                        Add Surrender
                    </Button>
                </div>
            ) : (
                <>
                    <p className='summary_title mt-5'>Surrender/Paid up Processig</p>
                    <div className='mt-2 grid grid-cols-2 items-center gap-y-3 gap-x-5'>
                        <div className='col-span-1'>
                            <div className='col-span-1 grid grid-cols-5 items-center'>
                                <p className='col-span-2 form-label'>Policy Number From</p>
                                <div className='col-span-3'>
                                    <CustomSelect
                                        name={`pol_from`}
                                        options={[{ value: POL_NO, label: POL_NO }]}
                                        showSearch={true}
                                        placeholder='policy No.'
                                        value={values?.inParams?.P_POL_NO_FM}
                                        readOnly={true}
                                        size='large'
                                        onChange={e => {
                                            console.log(e);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='col-span-1 grid grid-cols-5 items-center'>
                                <p className='col-span-1 form-label'>As on date</p>
                                <div className='col-span-3'>
                                    <CustomDatePicker
                                        name='as_on_date'
                                        placeholder='date'
                                        size='large'
                                        value={dayjs(values?.inParams?.P_SURR_DATE)}
                                        disabled={true}
                                        onChange={date => {
                                            console.log("date : ", date)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='col-span-1 grid grid-cols-5 items-center'>
                                <p className='col-span-2 form-label'>Surrender Type</p>
                                <div className='col-span-3'>
                                    <CustomSelect
                                        name={`surr_type`}
                                        options={[{ value: 'S', label: 'Surreder' }]}
                                        showSearch={false}
                                        placeholder='select'
                                        value={values?.inParams?.P_SURR_TYPE}
                                        size='large'
                                        onChange={e => {
                                            console.log(e);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='maturity_btn col-span-2 flex justify-center gap-3 mt-3'>
                            <Button onClick={() => setAddNew(false)}>Cancel</Button>
                            <Button>Print Quote</Button>
                            <Button onClick={() => setConfirmSurrModal(true)}>Process</Button>
                        </div>
                    </div>
                    <Divider />
                </>
            )}

            {hasValidRowData(rowData) &&
                <div className='mt-5'>
                    <MaturityCards rowData={rowData}
                        proceedTOSurrenderMaturity={proceedTOSurrenderMaturity} />
                </div>
            }

            {confirmSurrModal && <ConfirmSurrenderModal open={confirmSurrModal} handleClose={handleClose} />}
        </div>
    );
};

export default MaturityDetails;
