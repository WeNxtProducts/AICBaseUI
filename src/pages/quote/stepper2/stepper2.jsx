import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListOfBenefits from './ListOfBenefits';
import { BenefitsPremSummary } from './BenefitsPremSummary';
import CompareQuotes from './compareQuotes/CompareQuotes';
import useApiRequests from '../../../services/useApiRequests';
import { setListOfBenefits } from '../../../globalStore/slices/QuoteSlice';
import showNotification from '../../../components/notification/Notification';

const Stepper2 = () => {
    const dispatch = useDispatch();
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);
    const compQuote = useSelector(state => state?.quote?.compQuote)
    const benefitsList = useSelector(state => state?.quote?.listOfBenefits);
    const tranId = useSelector(state => state?.quote?.tranId);
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');

    const handleGetListOfBenefits = async () => {
        try {
            const response = await getMapQuery(
                { queryParams: { tranId } },
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


    const hasValidRowData = (rowData) => {
        return Array.isArray(rowData) &&
            rowData.length > 0 &&
            rowData.every(item => typeof item === 'object' && item !== null && Object.keys(item).length > 0);
    };

    useEffect(() => {
        handleGetListOfBenefits()
    }, [tranId])

    return (
        <div className='stepper_2 mt-3'>
            {!compQuote ?
                <>
                    <ListOfBenefits />
                    {hasValidRowData(benefitsList) ? <BenefitsPremSummary handleGetListOfBenefits={handleGetListOfBenefits} /> : null}
                </>
                :
                <CompareQuotes />
            }
        </div>
    );
};

export default Stepper2;
