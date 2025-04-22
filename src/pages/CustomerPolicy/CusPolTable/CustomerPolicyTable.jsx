import React from 'react';
import { FileSyncOutlined, SoundOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import './CustomerPolicyTable.scss';

const getStatusBadgeClass = (status) => {
    return `status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`;
};

const CustomerPolicyTable = ({ rowData, handleInstallment, handlePolicySummary, handleSelectedPolicy }) => {
    return (
        <div className="table-container_customer_policy_list">
            <table className="policy-table">
                <thead>
                    <tr>
                        <th>Policy No</th>
                        <th>Assured Name</th>
                        <th>Policy Period</th>
                        <th>Policy Sum Assured</th>
                        <th>Policy Premium</th>
                        <th>Premium Frequency</th>
                        <th>No of Premium Paid</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rowData?.map((policy, index) => (
                        <tr key={index}>
                            <td
                                onClick={() => handlePolicySummary(policy)}
                            >
                                <span className="premium-link">{policy.Policy_No}</span>
                            </td>
                            <td>{policy.Assured_Name || '-'}</td>
                            <td>{policy.Policy_Period || '-'}</td>
                            <td>{policy.sumAssured || '-'}</td>
                            <td>{policy.Policy_SumAssured || '-'}</td>
                            <td>{policy.Premium_Frequency || '-'}</td>
                            <td
                                onClick={() => handleInstallment(policy)}
                            >
                                <span className="premium-link">{policy.premiumsPaid || '-'}</span>
                            </td>
                            <td>
                                <span className={getStatusBadgeClass(policy.status || 'na')}>
                                    {policy.status || '-'}
                                </span>
                            </td>
                            <td>
                                <Tooltip title="Endorsement Request">
                                    <FileSyncOutlined className="icon-style" onClick={() => {
                                        handleSelectedPolicy('/endorsementRequest', policy)
                                    }} />
                                    <i className="fa-regular fa-file"></i>
                                </Tooltip>
                                <Tooltip title="Claim Intimation">
                                    <SoundOutlined className="icon-style" onClick={() => {
                                        handleSelectedPolicy('/claimIntimation', policy)
                                    }} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerPolicyTable;
