import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuoteHeader from './quoteHeader/QuoteHeader';
import QuoteStepper from './stepper/Stepper';
import Stepper1 from './stepper1/Stepper1';
import Stepper2 from './stepper2/stepper2';
import Stepper3 from './stepper3/Stepper3';
import Stepper4 from './stepper4/Stepper4';
import Stepper5 from './stepper5/Stepper5';
import QuoteContext from './QuoteContext';
import Stepper6 from './stepper6/Stepper6';
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
                        {stepperIndex === 2 && <Stepper3 />}
                        {stepperIndex === 3 && <Stepper4 />}
                        {stepperIndex === 4 && <Stepper5 />}
                        {stepperIndex === 5 && <Stepper6 />}
                    </div>
                </div>
            </div>
        </QuoteContext.Provider>
    );
};

export default Quote;
