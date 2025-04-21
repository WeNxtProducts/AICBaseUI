import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import './PolSummaryModal.scss';

const modalStyles = {
    top: 60,
};

const tableData = [
    {
        id: 1,
        cover: 'Life Cover',
        sun_assured: 100000000,
        premium: 78000,
    },
    {
        id: 2,
        cover: 'OCB',
        sun_assured: 100000000,
        premium: 78000,
    },
    {
        id: 3,
        cover: 'WOP',
        sun_assured: 100000000,
        premium: 78000,
    },
];

const MessageTitle = ({ title }) => (
    <p className="modal_msg_title_installment select-none">{title}</p>
);

const PolSummaryModal = ({ open, handleClose, tranId, policyDetails }) => {
    const [Open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const onClose = () => {
        setOpen(false);
        handleClose();
    };

    const totalSumAssured = tableData.reduce((sum, item) => sum + item.sun_assured, 0);
    const totalPremium = tableData.reduce((sum, item) => sum + item.premium, 0);

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
                <div className="summary_modal_header">
                    <span>Assured Name: {policyDetails?.assuredName || ''}</span>
                    <span>Policy No.: {policyDetails?.policyNo}</span>
                </div>

                <div className="summary_modal_table">
                    <table>
                        <thead>
                            <tr>
                                <th>Cover</th>
                                <th>Sum Assured</th>
                                <th>Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.cover}</td>
                                    <td>${item.sun_assured.toLocaleString()}</td>
                                    <td>${item.premium.toLocaleString()}</td>
                                </tr>
                            ))}
                            <tr className="total-row">
                                <td>Total</td>
                                <td>${totalSumAssured.toLocaleString()}</td>
                                <td>${totalPremium.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
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
