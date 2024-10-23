import React, { createContext, useState } from 'react';
import QuoteHeader from './quoteHeader/QuoteHeader';
import QuoteStepper from './stepper/Stepper';
import Stepper1 from './stepper1/Stepper1';
import PdfSample from '../PdfSample/PdfSample';
import './Quote.scss';

export const QuoteContext = createContext();

const Quote = () => {
    const [stepperIndex, setStepperIndex] = useState(1);

    const data = {
        stepperIndex,
        setStepperIndex
    }

    return (
        <QuoteContext.Provider value={data}>
            <div className='Quote'>
                <QuoteHeader />
                <div className='content_box p-3'>
                    {/* <QuoteStepper /> */}
                    <div className='px-5'>
                        <Stepper1 />
                    </div>
                </div>
            </div>
        </QuoteContext.Provider>
    );
};

export default Quote;
