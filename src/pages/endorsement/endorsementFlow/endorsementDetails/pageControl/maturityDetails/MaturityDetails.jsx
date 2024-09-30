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

const MaturityDetails = ({ currentTab, dataLoaded }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { POL_NO, tranId } = useContext(EndorsementContext);
    const { rowData = [], columnData, handleMRVListingPayload } = useMRVListingPayload();
    const [addNew, setAddNew] = useState(false)
    const [confirmSurrModal, setConfirmSurrModal] = useState(false)

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

    const handleClose = (decision) => {
        console.log('decision : ', decision)
        setConfirmSurrModal(false)
        if (decision) {
            setAddNew(false)
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
                        Add New
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
                                        options={[]}
                                        showSearch={true}
                                        placeholder='policy No.'
                                        value={POL_NO}
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
                                        value={dayjs()}
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
                                        options={[]}
                                        showSearch={true}
                                        placeholder='select'
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
                            <Button onClick={() => setConfirmSurrModal(true)}>Ok</Button>
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
