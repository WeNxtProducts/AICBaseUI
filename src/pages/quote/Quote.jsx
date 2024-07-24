import React from 'react';
import QuoteHeader from './quoteHeader/QuoteHeader';
import QuoteStepper from './stepper/Stepper';
import Stepper1 from './stepper1/Stepper1';
import './Quote.scss';
import PdfSample from '../PdfSample/PdfSample';

const Quote = () => {
 return (
  <div className='Quote'>
   <PdfSample />
   {/* <QuoteHeader />
   <div className='content_box p-3'>
    <QuoteStepper />
    <div className='px-5'>
     <Stepper1 />
    </div>
   </div> */}
  </div>
 );
};

export default Quote;
