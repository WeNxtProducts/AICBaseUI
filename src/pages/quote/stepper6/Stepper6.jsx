import React, { useEffect, useState } from 'react'
import ReviewHeader from './ReviewHeader'
import ReviewCustOcc from './ReviewCustOcc'
import { custDetails } from '../QuoteConstant'
import ReviewCustAddress from './ReviewCustAddress'
import ReviewFooter from './ReviewFooter'
import useApiRequests from '../../../services/useApiRequests'
import { useSelector } from 'react-redux'
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence'

const Stepper6 = () => {
    const tranId = useSelector(state => state?.quote?.tranId);
    const custDetailId = useSelector(state => state?.quote?.custDetailId);
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);
    const nomineeId = useSelector(state => state?.quote?.nomineeId);
    const LTQuoteBasicInfo = useApiRequests('LTQuoteBasicInfoGet', 'GET');
    const LTQuoteListOfBenefits = useApiRequests('getPreClaimDate', 'POST');
    const LTQuoteAssuredDtails = useApiRequests('LTQuoteAssuredDtlsGet', 'GET');
    const LTQuoteNomineeDetails = useApiRequests('LTQuoteBeneficiaryGet', 'GET');
    const LTQuoteQuestionaireDetails = useApiRequests('LTQuoteQuestionaireGet', 'POST');
    const LTQuoteDocDetails = useApiRequests('getPreClaimDate', 'POST');
    const [data, setData] = useState(null);

    useEffect(() => {
        const LTQuoteBasicInfoParams = { tranId, screenName: prodCode, screenCode: 'GETQUOTE' }
        const LTQuoteAssuredDtailsParams = { tranId: custDetailId, screenName: prodCode, screenCode: 'GETQUOTE' }
        const nomineeParams = { tranId: nomineeId, screenName: prodCode, screenCode: 'GETQUOTE' }
        const payloadQuestions = {
            queryParams: { DTL_DS_TYPE: 1, DTL_DS_CODE: "PRO", DTL_DTG_GROUP_CODE: "UWQUEST", tranId }
        }
        const payloadChecklist = { queryParams: { tranId, groupCode: "CHKLST" } };

        Promise.all([
            LTQuoteBasicInfo('', LTQuoteBasicInfoParams),
            LTQuoteListOfBenefits(
                { queryParams: { tranId } },
                { queryId: 406 },
            ),
            LTQuoteAssuredDtails('', LTQuoteAssuredDtailsParams),
            LTQuoteNomineeDetails('', nomineeParams),
            LTQuoteQuestionaireDetails(payloadQuestions),
            LTQuoteDocDetails(payloadChecklist, { queryId: 265 })
        ])
            .then(([basicInfo, benefits, assuredDetails, nomineeDetails, questionnaireDetails, docDetails]) => {
                const unOrderedData = {
                    basicInfo: basicInfo?.Data?.frontForm,
                    QuotAssuredDtls: assuredDetails?.Data?.QuotAssuredDtls,
                    Nominee: nomineeDetails?.Data?.Nominee
                };
                const orderedData = sortObjectByPFDSeqNo(unOrderedData);
                setData({
                    ...orderedData,
                    benefits: benefits?.Data,
                    questionnaireDetails: questionnaireDetails?.Data,
                    docDetails: docDetails?.Data
                });
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, []);

    // useEffect(() => {
    //     if (data !== null) {
    //         console.log("useEffect : ", data)
    //     }
    // }, [data])

    return (
        <div className='Stepper6'>
            <p className='head_review'>Review Application Details</p>
            {data !== null &&
                <div className='review_form'>
                    <ReviewHeader />
                    <div className='mt-2'>
                        <ReviewCustOcc title='Customer Details' details={custDetails} data={data?.basicInfo} />
                    </div>
                    <div className='mt-5'>
                        <ReviewCustAddress title='Customer Details' details={custDetails} data={data} />
                    </div>
                    <div className='mt-5 review_footer'>
                        <ReviewFooter />
                    </div>
                </div>
            }
        </div>
    )
}

export default Stepper6