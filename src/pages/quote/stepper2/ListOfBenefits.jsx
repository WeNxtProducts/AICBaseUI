import React, { useEffect } from 'react';
import { CustomNumberField } from '../../../components/commonExportsFields/CommonExportsFields';
import { ArrowLeftOutlined, ArrowRightOutlined, CheckCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import { useDispatch, useSelector } from 'react-redux';
import { setBenefitsSA, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';

const ListOfBenefits = () => {
    const dispatch = useDispatch();
    const benefitsList = useSelector(state => state?.quote?.listOfBenefits);
    const tranId = useSelector(state => state?.quote?.tranId);
    const quotationNo = useSelector(state => state?.quote?.quotationNo);
    const quoteSteps = useSelector(state => state?.quote?.quoteSteps);
    const isStepComplete = quoteSteps.find(step => step.id === 2)?.status;

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
            <div className="relative grid items-center">
                <div
                    onClick={() => dispatch(setStepperIndex(0))}
                    className="absolute left-0 flex items-center space-x-2 group cursor-pointer">
                    <ArrowLeftOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Back</span>
                </div>
                <p className="head_benefits">List Of Benefits</p>
                {isStepComplete &&
                    <div
                        onClick={() => dispatch(setStepperIndex(2))}
                        className="absolute right-0 flex items-center space-x-2 group cursor-pointer">
                        <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Next</span>
                        <ArrowRightOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    </div>
                }
            </div>
            {hasValidRowData(benefitsList) ? (
                <>
                    <div className="caption">Quotation No - {quotationNo}</div>
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
