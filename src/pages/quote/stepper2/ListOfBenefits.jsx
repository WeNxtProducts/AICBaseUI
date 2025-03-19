import React from 'react';
import { CustomNumberField } from '../../../components/commonExportsFields/CommonExportsFields';
import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const ListOfBenefits = () => {
    const tableData = [
        { benefit: 'Death any charge', sumAssured: '1000000', term: 10, premium: '500.99', include: true },
        { benefit: 'Permanent Total Disability(Accident & Sickness)', sumAssured: '200000', term: 15, premium: '1,000', include: false },
        { benefit: 'Permanent Total Disability(Accident & Sickness)(Additional)', sumAssured: '100.78', term: 10, premium: '500', include: false },
        { benefit: 'Critical Illness(Accelerated)', sumAssured: '200000', term: 7, premium: '2000.98', include: true },
        { benefit: 'Critical Illness(Additional)', sumAssured: '100000', term: 8, premium: '500', include: true },
        { benefit: 'Terminal Illness(Accelerated)', sumAssured: '200000', term: 9, premium: '1,000', include: false },
        { benefit: 'Passive War Risk', sumAssured: '100000', term: 12, premium: '5000.20', include: false },
    ];

    return (
        <div className="list_of_benefits">
            <p className='head_benefits'>List Of Benefits</p>
            <div className="caption">Quotation No - 101010101010101</div>
            <table className="table">
                <thead>
                    <tr>
                        <th>List of Benefits</th>
                        <th>Sum Assured</th>
                        <th>Term (Years)</th>
                        <th>Cover Premium</th>
                        <th>Include/ Exclude</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.benefit}</td>
                            <td>
                                <CustomNumberField
                                    size='large'
                                    value={row.sumAssured}
                                    placeholder='1,000'
                                    onChange={e => {
                                        console.log('e.target.value : ', e.target.value);
                                    }}
                                />
                            </td>
                            <td>{row.term}</td>
                            <td>{row.premium}</td>
                            <td>
                                {row?.include ?
                                    <CheckCircleOutlined className="check-icon" />
                                    :
                                    <PlusCircleOutlined className="plus-icon" />
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOfBenefits;
