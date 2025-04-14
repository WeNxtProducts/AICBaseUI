import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stepper1 from './stepper1/Stepper1';
import Stepper2 from './stepper2/stepper2';
import Stepper3 from './stepper3/Stepper3';
import Stepper4 from './stepper4/Stepper4';
import Stepper5 from './stepper5/Stepper5';
import Stepper6 from './stepper6/Stepper6';
import QuoteContext from './QuoteContext';
import useApiRequests from '../../services/useApiRequests';
import { sortObjectByPFDSeqNo } from '../../components/commonHelper/SortBySequence';
import {
    clearQuote as clearQuoteIL, setBasicInfoForm, setComQuote, setCurrentAddress,
    setCustAssuredDetails, setDropDown, setLoader, setNomineeDetails, setResidenceAddress,
    setStepper3,
    setStepperIndex
} from '../../globalStore/slices/QuoteSlice';
import Loader from '../../components/loader/Loader';
import PaymentStepper from './paymentStepper/PaymentStepper';
import PaymentConfirmPage from './paymentStepper/PaymentConfirmPage';
import QuoteHeader from '../../components/quoteHeader/QuoteHeader';
import StepperComponent from '../../components/stepper/Stepper';
import { useNavigate } from 'react-router-dom';
import { clearQuote as clearQuoteProdPlan } from '../../globalStore/slices/QuoteProdPlanSlice';
import './Quote.scss';

const Quote = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getFieldList = useApiRequests('LTQuoteBasicFieldList', 'POST');
    const LTLovJson = useApiRequests('lovToJson', 'GET');
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);
    const basicInfoForm = useSelector(state => state?.quote?.basicInfoForm);
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);
    const loader = useSelector(state => state?.quote?.loader);
    const payFinish = useSelector(state => state?.quote?.payFinish);
    const quotationNo = useSelector(state => state?.quote?.quotationNo);
    const { QUOT_FIRST_NAME: { PFD_FLD_VALUE: Fname } = {},
        QUOT_MIDDLE_NAME: { PFD_FLD_VALUE: Mname } = {},
        QUOT_LAST_NAME: { PFD_FLD_VALUE: Lname } = {} }
        = useSelector(state => state?.quote?.basicInfoForm?.frontForm?.formFields || {});
    const quoteSteps = useSelector(state => state?.quote?.quoteSteps);

    const name = `${Fname} ${Mname} ${Lname}`.trim();

    useEffect(() => {
        if (basicInfoForm === null) {
            fetchFieldAndLovList();
        }

        return () => {
            dispatch(clearQuoteIL());
            dispatch(clearQuoteProdPlan());
            navigate('/quoteSelect')
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
                // dispatch(setCustAssuredDetails({ QuotAssuredDtls: orderedData?.QuotAssuredDtls || {} }))
                // dispatch(setCurrentAddress({ CurrentAddress: orderedData?.CurrentAddress || {} }))
                // dispatch(setResidenceAddress({ ResidenceAddress: orderedData?.ResidenceAddress || {} }))
                // dispatch(setNomineeDetails({ Nominee: orderedData?.Nominee || {} }))
            }
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleStepClick = (index) => {
        dispatch(setStepper3(''))
        dispatch(setComQuote(false))
        dispatch(setStepperIndex(index));
    }

    const data = {}

    return (
        <QuoteContext.Provider value={data}>
            {loader && <Loader />}
            <div className='Quote'>
                <QuoteHeader id={quotationNo} name={name} />
                {payFinish ? <PaymentConfirmPage /> : (
                    <div className='content_box p-3'>
                        <StepperComponent quoteSteps={quoteSteps}
                            stepperChange={handleStepClick}
                            stepperIndex={stepperIndex}
                        />
                        <div className='px-5'>
                            {stepperIndex === 0 && <Stepper1 />}
                            {stepperIndex === 1 && <Stepper2 />}
                            {stepperIndex === 2 && <Stepper3 />}
                            {stepperIndex === 3 && <Stepper4 />}
                            {stepperIndex === 4 && <Stepper5 />}
                            {stepperIndex === 5 && <Stepper6 />}
                            {stepperIndex === 6 && <PaymentStepper />}
                        </div>
                    </div>
                )}
            </div>
        </QuoteContext.Provider>
    );
};

export default Quote;
