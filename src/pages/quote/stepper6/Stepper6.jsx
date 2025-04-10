import React, { useEffect, useState } from 'react'
import ReviewHeader from './ReviewHeader'
import ReviewCustOcc from './ReviewCustOcc'
import ReviewFooter from './ReviewFooter'
import useApiRequests from '../../../services/useApiRequests'
import { useSelector, useDispatch } from 'react-redux'
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence'
import ReviewQuestionaire from './ReviewQuestionaire'
import UploadDocListReview from './UploadDocListReview'
import showNotification from '../../../components/notification/Notification'
import BeneficiaryDetailsReview from './BeneficiaryDetailsReview'
import ListOfBenefitsReview from './ListOfBenefitsReview'
import ListOfConcernSelect from './ListOfConcernSelect'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { setStepperIndex } from '../../../globalStore/slices/QuoteSlice'

const Stepper6 = () => {
    const dispatch = useDispatch()
    const tranId = useSelector(state => state?.quote?.tranId)
    const custDetailId = useSelector(state => state?.quote?.custDetailId)
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode)
    const premiumSummary = useSelector(state => state?.quote?.premiumSummary)
    const showSignBox = useSelector(state => state?.quote?.showSignBox)
    const LTQuoteBasicInfo = useApiRequests('LTQuoteBasicInfoGet', 'GET');
    const LTQuoteListOfBenefits = useApiRequests('getPreClaimDate', 'POST');
    const LTQuoteAssuredDtails = useApiRequests('LTQuoteAssuredDtlsGet', 'GET');
    const LTQuoteNomineeDetails = useApiRequests('getPreClaimDate', 'POST');
    const LTQuoteQuestionaireDetails = useApiRequests('LTQuoteQuestionaireGet', 'POST');
    const LTQuoteDocDetails = useApiRequests('getPreClaimDate', 'POST');
    const [data, setData] = useState(null);

    useEffect(() => {
        const LTQuoteBasicInfoParams = { tranId, screenName: prodCode, screenCode: 'GETQUOTE' }
        const LTQuoteAssuredDtailsParams = { tranId: custDetailId, screenName: prodCode, screenCode: 'GETQUOTE' }
        const nomineePayload = { queryParams: { tranId } }
        const payloadQuestions = {
            queryParams: { DTL_DS_TYPE: 1, DTL_DS_CODE: "PRO", DTL_DTG_GROUP_CODE: "UWQUEST", tranId }
        }
        const payloadChecklist = { queryParams: { tranId, groupCode: "CHKLST" } };
        const payloadDoc = { queryParams: { tranId: tranId.toString() } };

        Promise.all([
            LTQuoteBasicInfo('', LTQuoteBasicInfoParams),
            LTQuoteListOfBenefits(
                { queryParams: { tranId } },
                { queryId: 406 },
            ),
            LTQuoteAssuredDtails('', LTQuoteAssuredDtailsParams),
            LTQuoteNomineeDetails(nomineePayload, { queryId: 266 }),
            LTQuoteQuestionaireDetails(payloadQuestions),
            LTQuoteDocDetails(payloadChecklist, { queryId: 265 }),
            LTQuoteDocDetails(payloadDoc, { queryId: 195 })
        ])
            .then(([basicInfo, benefits, assuredDetails, nomineeDetails, questionnaireDetails, docDetails, fileList]) => {
                const updatedDocs = docDetails?.Data?.map(data => {
                    const check = fileList?.Data?.find(doc =>
                        doc?.DocType === data?.DTL_TODO_LIST_ITEM && doc?.dms_status === 'Y'
                    );
                    return {
                        ...data, ...check
                    }
                })
                const unOrderedData = {
                    basicInfo: {
                        label: 'Basic Info',
                        formFields: {
                            ...basicInfo?.Data?.frontForm?.formFields,
                            ...assuredDetails?.Data?.QuotAssuredDtls?.formFields
                        }
                    },
                    QuotAssuredDtls: assuredDetails?.Data?.QuotAssuredDtls,
                    CurrentAddress: assuredDetails?.Data?.CurrentAddress,
                    ResidenceAddress: assuredDetails?.Data?.ResidenceAddress
                };
                const orderedData = sortObjectByPFDSeqNo(unOrderedData);
                setData({
                    ...orderedData,
                    benefits: benefits?.Data,
                    questionnaireDetails: questionnaireDetails?.Data,
                    docDetails: updatedDocs,
                    Nominee: nomineeDetails?.Data
                });
            })
            .catch((err) => {
                showNotification.WARNING(err?.message || 'Something went wrong');
            });
    }, []);

    return (
        <div className='Stepper6'>
            <div className="relative grid items-center">
                <div
                    onClick={() => dispatch(setStepperIndex(4))}
                    className="absolute left-0 flex items-center space-x-2 group cursor-pointer">
                    <ArrowLeftOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Back</span>
                </div>
                <p className='head_review'>Review Application Details</p>
            </div>

            {data !== null &&
                <div className='review_form'>
                    <ReviewHeader />
                    <div className='mt-2'>
                        <ReviewCustOcc title='Customer Details' data={data?.basicInfo} />
                    </div>
                    <div className='mt-5'>
                        <ReviewCustOcc title='Current Address' data={data?.CurrentAddress} />
                    </div>
                    <div className='mt-5'>
                        <ReviewCustOcc title='Residence Address' data={data?.ResidenceAddress} />
                    </div>
                    <div className='mt-5'>
                        <ReviewQuestionaire list={data?.questionnaireDetails} />
                    </div>
                    <div className='mt-5'>
                        <UploadDocListReview list={data?.docDetails} />
                    </div>
                    <div className='mt-5'>
                        <BeneficiaryDetailsReview list={data?.Nominee} />
                    </div>
                    <div className='mt-5'>
                        <ListOfBenefitsReview list={data?.benefits} premiumSummary={premiumSummary} />
                    </div>
                    <div className='mt-5'>
                        <ListOfConcernSelect />
                    </div>
                    {showSignBox &&
                        <div className='mt-5 review_footer'>
                            <ReviewFooter />
                        </div>
                    }

                </div>
            }
        </div>
    )
}

export default Stepper6