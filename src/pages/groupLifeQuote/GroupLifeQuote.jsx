import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import QuoteHeader from '../../components/quoteHeader/QuoteHeader';
import useApiRequests from '../../services/useApiRequests';
import { clearGroupQuote, setBasicInfoForm, setDropDown, setLoader, setStepperIndex } from '../../globalStore/slices/GroupQuoteSlice';
import { sortObjectByPFDSeqNo } from '../../components/commonHelper/SortBySequence';
import './GroupLifeQuote.scss';
import Loader from '../../components/loader/Loader';
import StepperComponent from '../../components/stepper/Stepper';
import { grpSteps } from '../quote/QuoteConstant';
import GStepper1 from './GStepper1/GStepper1';
import GStepper2 from './GStepper2/GStepper2';

const GroupLifeQuote = () => {
    const dispatch = useDispatch();
    const getFieldList = useApiRequests('LTQuoteBasicFieldList', 'POST');
    const LTLovJson = useApiRequests('lovToJson', 'GET');
    const { tranId, stepperIndex, loader, basicInfoForm, dropDown } = useSelector((state) => state.grpQuote);
    const { prodCode, planCode } = useSelector((state) => state?.quoteProdPlanCode);

    useEffect(() => {
        console.log("basicInfoForm : ", basicInfoForm, dropDown)
        if (basicInfoForm === null) {
            fetchFieldAndLovList();
        }

        return () => {
            dispatch(clearGroupQuote());
        }
    }, []);

    const fetchFieldAndLovList = async () => {
        dispatch(setLoader(true));
        try {
            const [lovResponse, fieldResponse] = await Promise.all([
                LTLovJson('', {
                    screenName: prodCode,
                    screenCode: 'GETQUOTE'
                }),
                getFieldList('', {
                    screenName: prodCode,
                    screenCode: 'GETQUOTE',
                    serviceName: 'getfield',
                })
            ]);

            if (lovResponse?.status === 'SUCCESS') {
                dispatch(setDropDown(lovResponse?.Data));
            }

            if (fieldResponse) {
                const orderedData = sortObjectByPFDSeqNo(fieldResponse);
                dispatch(setBasicInfoForm({ frontForm: orderedData?.frontForm || {} }));
            }
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleStepClick = (index) => {
        dispatch(setStepperIndex(index));
    }

    return (
        <div className='group-life-quote'>
            {loader && <Loader />}
            <QuoteHeader />
            <div className='content_box p-3'>
                <StepperComponent quoteSteps={grpSteps}
                    stepperChange={handleStepClick}
                    stepperIndex={stepperIndex}
                />
                <div className='px-5'>
                    {stepperIndex === 0 && <GStepper1 />}
                    {stepperIndex === 1 && <GStepper2 />}
                </div>
            </div>
        </div>
    )
}

export default GroupLifeQuote