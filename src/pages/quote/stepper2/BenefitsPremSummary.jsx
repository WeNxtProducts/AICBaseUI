import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'antd'
import { setComQuote, setListOfBenefits, setPremiumSummary } from '../../../globalStore/slices/QuoteSlice';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';

export const BenefitsPremSummary = ({ handleGetListOfBenefits }) => {
    const dispatch = useDispatch();
    const LTQuoteUpdateCoverData = useApiRequests('LTQuoteUpdateCoverData', 'POST');
    const benefitsList = useSelector(state => state?.quote?.listOfBenefits);
    const premiumSummary = useSelector(state => state?.quote?.premiumSummary);

    useEffect(() => {
        const totalMonthlyPrem = benefitsList?.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.QQAC_FC_PREM;
        }, 0);
        const totalSumAssured = benefitsList.find(item => item.QQAC_BASIC_YN === 'Y')?.QQAC_FC_SA;
        dispatch(setPremiumSummary({ totalMonthlyPrem, totalSumAssured }))
    }, [benefitsList])

    const handleReCalc = async () => {
        const extractedData = benefitsList.map(({ QQAC_TRAN_ID, QQAC_FC_SA, QQAC_SELECT_YN }) => ({
            QQAC_TRAN_ID,
            QQAC_FC_SA,
            QQAC_SELECT_YN
        }));
        console.log(extractedData)
        try {
            const response = await LTQuoteUpdateCoverData(extractedData);
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                handleGetListOfBenefits()
                console.log("Response : ", response)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='benefits_prem_summary mt-3'>
            <div className='re_calc_box'>
                <p className='head_benefits'>Premium Summary</p>
                <Button
                    onClick={() => {
                        handleReCalc()
                    }}
                    className='re-btn ml-9'>
                    Re-Calculate
                </Button>
            </div>
            <div className='summary_box'>
                <div className='flex justify-between'>
                    <p className='sum_name'>Sum Assured</p>
                    <p className='sum_val'>{`AED ${formatNumber(premiumSummary?.totalSumAssured)}`}</p>
                </div>
                <div className='flex justify-between mt-3'>
                    <p className='sum_name'>Total monthly premium</p>
                    <p className='sum_val'>{`AED ${formatNumber(premiumSummary?.totalMonthlyPrem)}`}</p>
                </div>
            </div>

            <div className='btn-grp'>
                <Button className='oth_btn'>Modify Quote</Button>
                <Button className='oth_btn'>View Illustration</Button>
                <Button
                    onClick={() => {
                        dispatch(setComQuote(true))
                    }}
                    className='oth_btn'>Compare Quote</Button>
                <Button className='acc_btn'>Accept</Button>
            </div>
        </div>
    )
}
