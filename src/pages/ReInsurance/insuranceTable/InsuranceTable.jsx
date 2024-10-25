import React, { useState } from 'react';
import './InsuranceTable.scss';

const InsuranceTable = ({ rowSelectable = false }) => {
    const data = [
        { id: 1, plan: 'Basic Plan', coverage: '$100,000', premium: '$50/month', deductible: '$1,000' },
        { id: 2, plan: 'Standard Plan', coverage: '$250,000', premium: '$75/month', deductible: '$750' },
        { id: 3, plan: 'Premium Plan', coverage: '$500,000', premium: '$100/month', deductible: '$500' }
    ];

    const [selectedRow, setSelectedRow] = useState(null);

    const handleSelectRow = (id) => {
        setSelectedRow(id);
    };

    return (
        <div className="insurance-table-container">
            <table className="insurance-table">
                <thead>
                    <tr>
                        <th>Plan Type</th>
                        <th>Coverage</th>
                        <th>Premium</th>
                        <th>Deductible</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            className={`${selectedRow === row.id && rowSelectable ? 'selected' : ''} ${!rowSelectable ? 'hoverable' : ''}`}
                        >
                            <td
                                className={`plan-type ${rowSelectable ? 'clickable' : ''}`}
                                onClick={() => rowSelectable && handleSelectRow(row.id)}
                            >
                                {row.plan}
                            </td>
                            <td>{row.coverage}</td>
                            <td>{row.premium}</td>
                            <td>{row.deductible}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InsuranceTable;
