import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';
import LoanCards from './LoanCards';
import LoanDisbursal from './loanDisbursal/LoanDisbursal';
import useMRVListingPayload from '../../../../../../components/mrvListing/useMRVListingPayload';
import { EndorsementContext } from '../../../../Endorsement';
import useApiRequests from '../../../../../../services/useApiRequests';
import showNotification from '../../../../../../components/notification/Notification';

const LoanDetails = ({ currentTab, dataLoaded }) => {
    const { POL_NO, tranId } = useContext(EndorsementContext);
    const getLoanDetails = useApiRequests('getLoanDetails', 'POST');
    const { rowData = [], columnData, handleMRVListingPayload } = useMRVListingPayload();
    const [showDisbursal, setShowDisbursal] = useState(false)
    const [selectedRow, setSelectedRow] = useState('')
    const [loanDetail, setLoanDetail] = useState(null)
    const [swipeToLast, setSwipeToLast] = useState(false)

    useEffect(() => {
        if (dataLoaded) console.log('Loan Details ');
    }, [dataLoaded]);

    useEffect(() => {
        if (tranId) {
            handleMRVListingPayload({ queryId: 235, tranId });
        }
    }, [tranId]);

    const handleNavigateToAlterations = () => {
        setShowDisbursal(true)
    };

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    const handleGetLoanDetails = async (item) => {
        try {
            const response = await getLoanDetails('', {
                tranId: item?.ID
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setSelectedRow(item?.ID)
                setLoanDetail(response?.Data)
            }
        } catch (err) {
            console.log(err)

        }
    }

    const handleUpdateList = () => {
        handleMRVListingPayload({ queryId: 235, tranId });
        setShowDisbursal(false)
        setSwipeToLast(true)
    }

    const renderFields = (label, val) => (
        <div className='col-span-1 grid grid-cols-5 items-center'>
            <p className='col-span-2 form-label'>{label}</p>
            <div className='col-span-2 form-value'>
                <p className='float-right pe-3'>{formatNumber(val)}</p>
            </div>
        </div>
    );

    return (
        <div className='alteration alter_loan'>
            {!showDisbursal ?
                (
                    <>
                        <div className='mb-5'>
                            <Button
                                onClick={() => handleNavigateToAlterations()}
                                className='add-buttons-edorsement'
                                type='primary'
                                icon={<i className='bi bi-plus icon-style' />}>
                                Add Loan
                            </Button>
                        </div>

                        {hasValidRowData(rowData) &&
                            <div className='mt-5'>
                                <LoanCards rowData={rowData} selectedRow={selectedRow}
                                    handleGetLoanDetails={handleGetLoanDetails}
                                    swipeToLast={swipeToLast}
                                />
                            </div>
                        }
                        {loanDetail !== null &&
                            <>
                                <p className='summary_title mt-5'>Summary</p>
                                <div className='claim_small_summary mt-2 grid grid-cols-2 items-center gap-y-3'>
                                    <div className='col-span-1'>{renderFields('Total Outstanding premium', loanDetail?.LOAN_FC_OS_AMOUNT)}</div>
                                    <div className='col-span-1'>{renderFields('Due Premium Interest', loanDetail?.LOAN_FC_UNPAID_PREM_INT)}</div>
                                    <div className='col-span-1'>{renderFields('Excess Deposit', loanDetail?.LOAN_FC_UNPAID_PREM)}</div>
                                </div>
                            </>}
                    </>
                )
                :
                (
                    <LoanDisbursal setShowDisbursal={setShowDisbursal}
                        POL_NO={POL_NO} tranId={tranId}
                        handleUpdateList={handleUpdateList} />
                )
            }

        </div>
    );
};

export default LoanDetails;
