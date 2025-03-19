import React, { useState } from 'react';
import QuoteHeader from './quoteHeader/QuoteHeader';
import QuoteStepper from './stepper/Stepper';
import Stepper1 from './stepper1/Stepper1';
import Stepper2 from './stepper2/stepper2';
import QuoteContext from './QuoteContext';
import { useDispatch, useSelector } from 'react-redux';
import './Quote.scss';

const Quote = () => {
    const dispatch = useDispatch();
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);

    const data = {}

    return (
        <QuoteContext.Provider value={data}>
            <div className='Quote'>
                <QuoteHeader />
                <div className='content_box p-3'>
                    <QuoteStepper />
                    <div className='px-5'>
                        {stepperIndex === 0 && <Stepper1 />}
                        {stepperIndex === 1 && <Stepper2 />}
                    </div>
                </div>
            </div>
        </QuoteContext.Provider>
    );
};

export default Quote;
