import React, { useContext, useEffect, useState } from 'react';
import PayForm from './PayForm';
import DueMrvListing from '../../dueMrvListing/DueMrvListing';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import { ReceiptContext } from '../../Receipt';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import { Button } from 'antd';
import Loader from '../../../../components/loader/Loader';

const paymentMethods = [
    { value: 'P', label: 'Cash' },
    { value: 'C', label: 'Cheque' },
    { value: 'CC', label: 'Credit Card' },
    { value: 'AD', label: 'Bank Transfer' },
];

const initialForm = {
    RD_PAY_MODE: 'P',
    RD_FC_AMT: '',
    RD_LC_AMT: '',

    RD_BANK_REF_NO: '',
    RD_CHQ_BANK_CODE: '',

    RD_CHQ_NO: '',
    RD_CHQ_DT: '',

    PD_BANK_NAME: '',
    PD_CC_NO: '',
    PD_CVV_NO: '',
    PD_CC_EXP_DT: '',

    RD_CUST_BANK_ACNT_NO: '',
    RD_BANK_IFSC_CODE: '',
    RD_BANK_ACNT_NAME: '',
};

const PaymentDetails = () => {
    const { id: tranId, amountSummary, setHeaderStatus, headerStatus } = useContext(ReceiptContext);
    const getPayDetails = useApiRequests('getPayDetails', 'POST');
    const savePayDetails = useApiRequests('savePayDetails', 'POST');
    const updatePayDetails = useApiRequests('updatePayDetails', 'POST');
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const { rowData, columnData, handleMRVListing } = useMRVListing();
    const [editMRVId, setEditMRVId] = useState('');
    const [mainValue, setMainValue] = useState(null);
    const [loader, setLoader] = useState(false)

    const MRVListing = () => {
        handleMRVListing(214, tranId);
    };

    useEffect(() => {
        if (tranId) {
            setMainValue(initialForm);
            MRVListing();
        }
    }, [tranId]);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    const handleEdit = async item => {
        setLoader(true)
        try {
            const response = await getPayDetails('', {
                tranId: item?.ID,
            });
            if (response?.status === 'SUCCESS') {
                setEditMRVId(item?.ID);
                setMainValue(response?.Data);
                setLoader(false)
            } else if (response?.status === 'FAILURE') {
                setLoader(false)
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('Something went Wrong!!!');
        }
    };

    const addOrUpdate = async (apiCall, payload) => {
        setLoader(true)
        try {
            const params = editMRVId ? { editMRVId } : { tranId };
            const response = await apiCall(payload, {}, params);
            if (response?.status === 'SUCCESS') {
                setLoader(false)
                MRVListing();
                showNotification.SUCCESS(response?.status_msg);
            } else if (response?.status === 'FAILURE') {
                setLoader(false)
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('Something went Wrong!!!');
        }
    };

    const checkTotalAll = (totalAmount, currentAmount) => {
        const totalFCAmount = rowData.reduce((acc, item) => {
            return item.ID === editMRVId ? acc : acc + item.FC_Amount;
        }, 0);
        const mainAmount = totalFCAmount + Number(currentAmount);
        if (mainAmount === totalAmount) return true;
        else if (mainAmount > totalAmount) {
            showNotification.WARNING('Amount Should not exceed the Amount to be Paid');
            return false;
        } else return true;
    };

    const handleSaveOrUpdate = values => {
        const { RH_LC_AMT } = amountSummary.receiptHeader.formFields;
        const { RD_FC_AMT } = values;
        const checkTotal = checkTotalAll(RH_LC_AMT, RD_FC_AMT);
        if (checkTotal) {
            const payload = { receiptDetails: { formFields: values } };
            if (editMRVId) {
                addOrUpdate(updatePayDetails, payload);
            } else if (!editMRVId) {
                addOrUpdate(savePayDetails, payload);
            }
        }
    };

    const handleNewPay = () => {
        setEditMRVId('');
        setMainValue(initialForm);
    };

    const approveReceipt = async () => {
        setLoader(true)
        const payload = { inParams: { P_RH_TRAN_ID: tranId } };
        try {
            const response = await invokeClaimsProcedure(payload, {
                procedureName: 'P_RCPT_APPRV',
                packageName: 'WNPKG_RECEIPT',
            });
            setLoader(false)
            if (response?.Data?.P_SUCC_YN === 'Y') {
                showNotification.SUCCESS(response?.Data?.P_ERR_MSG);
                setHeaderStatus(prevState => ({
                    ...prevState,
                    RH_APPRV_STATUS: 'A',
                }));
            } else if (response?.Data?.P_SUCC_YN === 'N') {
                showNotification.ERROR(response?.Data?.P_ERR_MSG);
            }
            if (response?.status === 'SUCCESS') {
                if (response?.status_msg)
                    showNotification.SUCCESS(response?.status_msg);
            } else if (response?.status === 'FAILURE') {
                if (response?.status_msg)
                    showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            setLoader(false)
            showNotification.ERROR('Something went Wrong!!!');
        }
    };

    return (
        <div className='pay_details mt-10'>
            {loader && <Loader />}
            <div className='grid grid-cols-8'>
                <div className='col-span-6'>
                    <div className='flex items-center justify-between mt-3'>
                        <p className='pay_title'>Payment Details</p>
                        {!!editMRVId && headerStatus?.RH_APPRV_STATUS !== 'A' && (
                            <Button
                                onClick={() => handleNewPay()}
                                className='add-buttons me-4'
                                type='primary'
                                icon={<i className='bi bi-plus icon-style' />}>
                                Add Pay
                            </Button>
                        )}
                    </div>

                    <PayForm
                        options={paymentMethods}
                        currentValue={mainValue}
                        handleSaveOrUpdate={handleSaveOrUpdate}
                        selectedRow={editMRVId}
                        approveReceipt={approveReceipt}
                        headerStatus={headerStatus}
                    />
                </div>
                <div className='col-span-2 mrv_col'>
                    {hasValidRowData(rowData) && (
                        <DueMrvListing
                            tableColumn={columnData}
                            tableData={rowData}
                            handleEdit={handleEdit}
                            selectedRow={editMRVId}
                            headerStatus={headerStatus}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
