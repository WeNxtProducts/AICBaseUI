import React, { useEffect, useState } from 'react';
import { CustomNumberField } from '../../../components/commonExportsFields/CommonExportsFields';
import { CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { setBenefitsSA, setListOfBenefits } from '../../../globalStore/slices/QuoteSlice';

const ListOfBenefits = () => {
    const dispatch = useDispatch();
    const benefitsList = useSelector(state => state?.quote?.listOfBenefits);
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');

    const handleGetListOfBenefits = async () => {
        try {
            const response = await getMapQuery(
                { queryParams: { tranId: 1 } },
                { queryId: 406 },
            );
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                dispatch(setListOfBenefits(response?.Data))
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        handleGetListOfBenefits()
    }, [])

    const handleChangeVal = (index) => (e) => {
        const newDescription = e.target.value;
        dispatch(setBenefitsSA({ index, newDescription, key: 'listOfBenefits' }));
    };

    const handleIE = (status, val, index) => {
        if (val?.QQAC_BASIC_YN === 'Y') return;
        dispatch(setBenefitsSA({ index, val, key: 'QQAC_SELECT_YN' }));
    }

    return (
        <div className="list_of_benefits">
            <p className='head_benefits'>List Of Benefits</p>
            <div className="caption">Quotation No - 101010101010101</div>
            {benefitsList?.length > 0 ? (
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
                                        />
                                        ) : (
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
            ) : (
                <p>No List</p>
            )}
        </div>
    );
};

export default ListOfBenefits;
