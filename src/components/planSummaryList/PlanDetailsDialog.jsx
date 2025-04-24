import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { ArrowLeftOutlined, DownloadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './PlanDetailsDialog.scss';

const PlanDetailsDialog = ({ open, handleClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const onClose = () => {
        setIsOpen(false);
        handleClose();
    };

    const coverItems = [
        {
            id: 1,
            title: 'Death Any Cause',
            gender: 'Male',
            ageBand: '28 - 60 Years',
            totalEmployee: 15,
            sumAssured: '$ 10,00,000',
            totalPremium: '$ 1,00,000'
        },
        {
            id: 2,
            title: 'Death Any Cause',
            gender: 'Male',
            ageBand: '28 - 60 Years',
            totalEmployee: 15,
            sumAssured: '$ 10,00,000',
            totalPremium: '$ 1,00,000'
        },
        {
            id: 3,
            title: 'Death Any Cause',
            gender: 'Male',
            ageBand: '28 - 60 Years',
            totalEmployee: 15,
            sumAssured: '$ 10,00,000',
            totalPremium: '$ 1,00,000'
        }
    ];

    return (
        <Modal
            open={isOpen}
            width={570}
            style={{ top: 60 }}
            onCancel={onClose}
            maskClosable={false}
            className="plan-details-modal"
            footer={null}
            closeIcon={false}
        >
            <div className="plan-details-container">
                <div className="plan-header">
                    <div className="plan-header-left">
                        <ArrowLeftOutlined className="back-icon" onClick={onClose} />
                        <span className="plan-title">Plan A</span>
                    </div>
                    <div className="plan-header-right">
                        <div className="avatar">S</div>
                    </div>
                </div>

                <div className="plan-content">
                    <div className="plan-tabs">
                        <div className="toggle-buttons">
                            <Button type="primary" className="toggle-btn active">Male</Button>
                            <Button className="toggle-btn">Female</Button>
                        </div>
                    </div>

                    <div className="cover-list-header">
                        <span>List of Covers</span>
                        <DownloadOutlined className="download-icon" />
                    </div>

                    <div className="cover-items">
                        {coverItems.map((item) => (
                            <div key={item.id} className="cover-item">
                                <div className="cover-item-header">
                                    <CheckCircleOutlined className="check-icon" />
                                    <span>{item.title}</span>
                                </div>
                                <div className="cover-item-details">
                                    <div className="detail-row">
                                        <div className="detail-label">Gender</div>
                                        <div className="detail-value">{item.gender}</div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Age Band</div>
                                        <div className="detail-value">{item.ageBand}</div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Total Employee</div>
                                        <div className="detail-value">{item.totalEmployee}</div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Sum Assured</div>
                                        <div className="detail-value">{item.sumAssured}</div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-label">Total Premium</div>
                                        <div className="detail-value">{item.totalPremium}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="action-button">
                        <Button type="primary" block>Close</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default PlanDetailsDialog;