import React, { useEffect } from 'react';
import { CustomNumberField } from '../../../components/commonExportsFields/CommonExportsFields';
import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { setBenefitsSA } from '../../../globalStore/slices/QuoteSlice';

const ListOfBenefits = () => {
    const dispatch = useDispatch();
    const benefitsList = useSelector(state => state?.quote?.listOfBenefits);
    const tranId = useSelector(state => state?.quote?.tranId);

    const handleChangeVal = (index) => (e) => {
        const newDescription = e.target.value;
        dispatch(setBenefitsSA({ index, newDescription, key: 'listOfBenefits' }));
    };

    const handleIE = (status, val, index) => {
        if (val?.QQAC_BASIC_YN === 'Y') return;
        dispatch(setBenefitsSA({ index, val, key: 'QQAC_SELECT_YN' }));
    }

    const hasValidRowData = (rowData) => {
        return Array.isArray(rowData) &&
            rowData.length > 0 &&
            rowData.every(item => typeof item === 'object' && item !== null && Object.keys(item).length > 0);
    };

    return (
        <div className="list_of_benefits">
            <p className='head_benefits'>List Of Benefits</p>
            {hasValidRowData(benefitsList) ? (
                <>
                    <div className="caption">Quotation No - {tranId}</div>
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
                            {benefitsList.map((row, index) => (
                                <tr key={index}>
                                    <td>{row?.COVER_DESC}</td>
                                    <td>
                                        {row?.QQAC_EDIT_YN === 'Y' && row?.QQAC_SELECT_YN === 'N' ?
                                            (<CustomNumberField
                                                size='large'
                                                value={row.QQAC_FC_SA}
                                                placeholder='1,000'
                                                onChange={handleChangeVal(index)}
                                            />)
                                            : (
                                                formatNumber(row.QQAC_FC_SA)
                                            )
                                        }
                                    </td>
                                    <td>{row.QQAC_PERIOD}</td>
                                    <td>{formatNumber(row.QQAC_FC_PREM)}</td>
                                    <td>
                                        {row?.QQAC_SELECT_YN === 'Y' ?
                                            <CheckCircleOutlined
                                                onClick={() => {
                                                    handleIE(true, row, index)
                                                }}
                                                className="check-icon" />
                                            :
                                            <PlusCircleOutlined
                                                onClick={() => {
                                                    handleIE(false, row, index)
                                                }}
                                                className="plus-icon" />
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="flex items-center justify-center mt-6">
                    <p className="text-center font-light">No List available</p>
                </div>
            )}
        </div>
    );
};

export default ListOfBenefits;
