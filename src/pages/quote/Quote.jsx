import React from 'react';
import QuoteHeader from './quoteHeader/QuoteHeader';
import QuoteStepper from './stepper/Stepper';
import './Quote.scss';

const Quote = () => {
 return (
  <div className='Quote'>
   <QuoteHeader />
   <div className='content_box p-3'>
    <QuoteStepper />
   </div>
  </div>
 );
};

export default Quote;
