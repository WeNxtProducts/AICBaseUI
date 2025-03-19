import React, { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import ListOfBenefits from './ListOfBenefits';
import { BenefitsPremSummary } from './BenefitsPremSummary';
import CompareQuotes from './compareQuotes/CompareQuotes';

const Stepper2 = () => {
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);
    const compQuote = useSelector(state => state?.quote?.compQuote)

    return (
        <div className='stepper_2 mt-3'>
            {!compQuote ?
                <>
                    <ListOfBenefits />
                    <BenefitsPremSummary />
                </>
                :
                <CompareQuotes />
            }
        </div>
    );
};

export default Stepper2;
