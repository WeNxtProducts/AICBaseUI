import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Button } from 'antd';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import Loader from '../../../components/loader/Loader';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import './PolSummaryModal.scss';

const modalStyles = {
    top: 60,
};

const MessageTitle = ({ title }) => (
    <p className="modal_msg_title_installment select-none">{title}</p>
);

const PolSummaryModal = ({ open, handleClose, tranId, policyDetails }) => {
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [Open, setOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [benefitsData, setBenefitsData] = useState(null)

    const handleGetListOfBenefits = async () => {
        setLoader(true)
        try {
            const response = await getMapQuery(
                { queryParams: { tranId: policyDetails?.ID } },
                { queryId: 406 },
            );
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                if (Array.isArray(response?.Data) && response.Data.length > 0) {
                    const filteredData = response.Data.filter(item => item.QQAC_SELECT_YN === 'Y');
                    setBenefitsData(filteredData);
                } else {
                    setBenefitsData(null);
                }
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            setLoader(false)
        }
    };

    useEffect(() => {
        handleGetListOfBenefits()
        setOpen(open);
    }, [open]);

    const onClose = () => {
        setOpen(false);
        handleClose();
    };

    const totalSumAssured = useMemo(() => {
        if (!Array.isArray(benefitsData)) return 0;
        return benefitsData.reduce((sum, item) => sum + item.QQAC_FC_SA, 0);
    }, [benefitsData]);

    const totalPremium = useMemo(() => {
        if (!Array.isArray(benefitsData)) return 0;
        return benefitsData.reduce((sum, item) => sum + item.QQAC_FC_PREM, 0);
    }, [benefitsData]);

    return (
        <Modal
            open={Open}
            width={900}
            title={<MessageTitle title={`Policy Summary`} />}
            style={modalStyles}
            onCancel={onClose}
            maskClosable={false}
            className="policy_summary_modal_style"
            footer={null}
        >
            <div className="summary_modal_container">
                {loader && <Loader />}
                <div className="summary_modal_header">
                    <span>Assured Name: {policyDetails?.Assured_Name || ''}</span>
                    <span>Policy No.: {policyDetails?.Policy_No || ''}</span>
                </div>

                <div className="summary_modal_table">
                    {benefitsData !== null ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Cover</th>
                                    <th>Sum Assured</th>
                                    <th>Premium</th>
                                </tr>
                            </thead>
                            <tbody>
                                {benefitsData.map((item) => (
                                    <tr key={item.QQAC_TRAN_ID}>
                                        <td>{item.COVER_DESC}</td>
                                        <td>${formatNumber(item.QQAC_FC_SA)}</td>
                                        <td>${formatNumber(item.QQAC_FC_PREM)}</td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td>Total</td>
                                    <td>${formatNumber(totalSumAssured)}</td>
                                    <td>${formatNumber(totalPremium)}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>No Data Available</p>
                    )}
                </div>

                <div className="summary_modal_footer">
                    <Button type="outlined" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default PolSummaryModal;
