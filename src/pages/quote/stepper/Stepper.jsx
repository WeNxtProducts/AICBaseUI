import React, { useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import './Stepper.scss';

const QuoteStepper = () => {
 const [activeStep, setActiveStep] = useState(3);
 const quoteStep = [
  { label: 'Benefit Details' },
  { label: 'Assured/Cust Details' },
  { label: 'Questions' },
  { label: 'Upload Docs' },
  { label: 'Review' },
 ];

 return (
  <div className='stepper'>
   <Stepper
    connectorStateColors={true}
    connectorStyleConfig={{
     completedColor: '#0382C8',
     activeColor: '#ffbd13',
     disabledColor: '#eee',
     stepSize: '2.1em',
     size: 5,
    }}
    styleConfig={{
     labelFontSize: '.8rem',
     borderRadius: '50%',
     fontWeight: 600,
    }}
    className='custom_stepper'
    activeStep={activeStep}>
    {quoteStep?.map((item, index) => (
     <Step className='custom_steps' key={item?.label} label={item?.label} />
    ))}
   </Stepper>
   <button onClick={() => setActiveStep(activeStep - 1)}>-</button>
   <button onClick={() => setActiveStep(activeStep + 1)}>+</button>
  </div>
 );
};

export default QuoteStepper;
