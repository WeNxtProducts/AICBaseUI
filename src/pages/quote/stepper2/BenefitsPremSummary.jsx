import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'antd'
import { setComQuote, setListOfBenefits, setLoader, setPremiumSummary, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import { useSelector } from 'react-redux';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { handleFileDownloadOrView } from '../../../components/mediaHelper/mediaHelper64';

export const BenefitsPremSummary = ({ handleGetListOfBenefits }) => {
    const dispatch = useDispatch();
    const LTQuoteUpdateCoverData = useApiRequests('LTQuoteUpdateCoverData', 'POST');
    const DMSFileGenerate = useApiRequests('DMSFileGenerateDocument', 'POST');
    const benefitsList = useSelector(state => state?.quote?.listOfBenefits);
    const premiumSummary = useSelector(state => state?.quote?.premiumSummary);
    const tranId = useSelector(state => state?.quote?.tranId);

    useEffect(() => {
        if (benefitsList?.length > 0) handleReCalc(false);
    }, [])

    const handleReCalc = async (isReCalc) => {
        dispatch(setLoader(true));
        const extractedData = benefitsList.map(({ QQAC_TRAN_ID, QQAC_FC_SA, QQAC_SELECT_YN, FC_SA_prev }) => ({
            QQAC_TRAN_ID,
            QQAC_FC_SA: QQAC_SELECT_YN === 'Y' ? QQAC_FC_SA : FC_SA_prev,
            QQAC_SELECT_YN,
            id: tranId
        }));
        try {
            const response = await LTQuoteUpdateCoverData(extractedData);
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                if (isReCalc) {
                    handleGetListOfBenefits()
                    showNotification.SUCCESS(response?.status_msg);
                }
                const totalMonthlyPrem = response?.Data;
                const totalSumAssured = benefitsList.find(item => item.QQAC_BASIC_YN === 'Y')?.QQAC_FC_SA;
                dispatch(setPremiumSummary({ totalMonthlyPrem, totalSumAssured }))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    }

    const handleIllustration = async () => {
        dispatch(setLoader(true));
        const payload = {
            docTemplateName: "Term_Plan", genType: ".pdf",
            docParms: { tranId }
        }
        try {
            const response = await DMSFileGenerate(payload);
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg)
            }
            if (response?.status === 'SUCCESS') {
                const updatedItem = {
                    filename: `${payload?.docTemplateName}${payload?.genType}`,
                    base64String: response?.Data?.attachment,
                    genType: payload?.genType
                };
                console.log("updatedItem : ", updatedItem)
                handleFileDownloadOrView(updatedItem);
                console.log("response : ", response)
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Error on Viewing file');
        } finally {
            dispatch(setLoader(false));
        }
    }

    return (
        <div className='benefits_prem_summary mt-3'>
            <div className='re_calc_box'>
                <p className='head_benefits'>Premium Summary</p>
                <Button
                    onClick={() => {
                        handleReCalc(true)
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
                <Button
                    onClick={() => {
                        dispatch(setStepperIndex(0))
                    }}
                    className='oth_btn'>Modify Quote</Button>
                <Button
                    onClick={() => handleIllustration()}
                    className='oth_btn'>View Illustration</Button>
                <Button
                    onClick={() => {
                        dispatch(setComQuote(true))
                    }}
                    className='oth_btn'>Compare Quote</Button>
                <Button
                    onClick={() => {
                        dispatch(setStepperIndex(2));
                    }}
                    className='acc_btn'>Accept
                </Button>
            </div>
        </div>
    )
}
