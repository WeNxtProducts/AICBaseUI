import dayjs from 'dayjs';
import React from 'react';

const BeneficiaryDetailsReview = ({ list }) => {

    return (
        <div className='doc_list_upload'>
            <p className="review_title">Beneficiary Details</p>
            <table className="doc_table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Beneficiary Type</th>
                        <th>Relationship</th>
                        <th>DOB</th>
                        <th>share %</th>
                    </tr>
                </thead>
                <tbody>
                    {list?.map((item, index) => (
                        <tr key={item?.QBEN_TRAN_ID}>
                            <td>{index + 1}</td>
                            <td>{item?.QBEN_BNF_NAME}</td>
                            <td>{item?.QBEN_BNF_TYPE}</td>
                            <td>{item?.QBEN_RELATION_CODE}</td>
                            <td>{item?.QBEN_DOB ? dayjs(item.QBEN_DOB).format('DD-MM-YYYY') : ''}</td>
                            <td>{item?.QBEN_PERC}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BeneficiaryDetailsReview;
