import React from 'react';
import './CustomerPolicyTable.scss';

const policies = [
    {
        "policyNo": "PL00001",
        "assuredName": "Sathish",
        "policyPeriod": "2020–2025",
        "sumAssured": "$5,00,000",
        "premium": "$10,000",
        "frequency": "Annual",
        "premiumsPaid": "3",
        "status": "Referel Submitted"
    },
    {
        "policyNo": "PL00002",
        "assuredName": "Mouli",
        "policyPeriod": "2021–2026",
        "sumAssured": "$5,50,000",
        "premium": "$10,500",
        "frequency": "Quarterly",
        "premiumsPaid": "2",
        "status": "Lapsed"
    },
    {
        "policyNo": "PL00003",
        "assuredName": "Dinesh",
        "policyPeriod": "2022–2027",
        "sumAssured": "$6,00,000",
        "premium": "$11,000",
        "frequency": "Monthly",
        "premiumsPaid": "8",
        "status": "Matured"
    },
    {
        "policyNo": "PL00004",
        "assuredName": "Kamali",
        "policyPeriod": "2023–2028",
        "sumAssured": "$6,50,000",
        "premium": "$11,500",
        "frequency": "Annual",
        "premiumsPaid": "24",
        "status": "Active"
    },
    {
        "policyNo": "PL00005",
        "assuredName": "Prakash",
        "policyPeriod": "2024–2029",
        "sumAssured": "$7,00,000",
        "premium": "$12,000",
        "frequency": "Quarterly",
        "premiumsPaid": "12",
        "status": "Claim Intimated"
    },
    {
        "policyNo": "PL00006",
        "assuredName": "Siddarth",
        "policyPeriod": "2025–2030",
        "sumAssured": "$7,50,000",
        "premium": "$12,500",
        "frequency": "Monthly",
        "premiumsPaid": "5",
        "status": "Endorsement Requested"
    },
    {
        "policyNo": "PL00007",
        "assuredName": "Vignesh",
        "policyPeriod": "2026–2031",
        "sumAssured": "$8,00,000",
        "premium": "$13,000",
        "frequency": "Annual",
        "premiumsPaid": "10",
        "status": "Surrendered"
    }
]



const getStatusBadgeClass = (status) => {
    return `status-badge status-${status.toLowerCase().replace(/\s+/g, '-')}`;
};

const CustomerPolicyTable = ({ handleInstallment }) => {
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
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy, index) => (
                        <tr key={index}>
                            <td>{policy.policyNo}</td>
                            <td>{policy.assuredName}</td>
                            <td>{policy.policyPeriod}</td>
                            <td>{policy.sumAssured}</td>
                            <td>{policy.premium}</td>
                            <td>{policy.frequency}</td>
                            <td
                                onClick={() => handleInstallment(policy)}
                            >
                                <span className="premium-link">{policy.premiumsPaid}</span>
                            </td>
                            <td>
                                <span className={getStatusBadgeClass(policy.status)}>
                                    {policy.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerPolicyTable;
