import React, { useEffect } from 'react';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';

const ListOfBenefitsReview = ({ list, premiumSummary }) => {

    return (
        <div className='doc_list_upload'>
            <p className="review_title">Benefit Details</p>
            <table className="doc_table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Cover Name</th>
                        <th>Cover Code</th>
                        <th>Sum Assured</th>
                        <th>Term(Year)</th>
                        <th>Premium</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((item, index) => (
                        <tr key={item?.QQAC_TRAN_ID}>
                            <td>{index + 1}</td>
                            <td>{item?.COVER_DESC}</td>
                            <td>{item?.QQAC_COVER_CODE}</td>
                            <td>{formatNumber(item?.QQAC_FC_SA)}</td>
                            <td>{item?.QQAC_PERIOD}</td>
                            <td>{formatNumber(item?.QQAC_FC_PREM)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='total_prem_box'>
                <p>Total monthly premium
                    <span>{formatNumber(premiumSummary?.totalMonthlyPrem)}</span></p>
            </div>
        </div>
    );
};

export default ListOfBenefitsReview;
