import React from 'react';
import { Step, Stepper } from 'react-form-stepper';
import { useSelector, useDispatch } from 'react-redux';
import { setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import './Stepper.scss';

const QuoteStepper = () => {
    const dispatch = useDispatch();
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);
    const quoteSteps = [
        { label: 'Benefit Details' },
        { label: 'Assured/Cust Details' },
        { label: 'Questions' },
        { label: 'Upload Docs' },
        { label: 'Review' },
    ];

    const handleStepClick = (index) => {
        dispatch(setStepperIndex(index));
    };

    return (
        <div className='stepper'>
            <Stepper
                nonLinear={true} // Enable non-linear navigation
                connectorStateColors={true}
                connectorStyleConfig={{
                    completedColor: '#0382C8',
                    activeColor: '#ffbd13',
                    disabledColor: '#eee',
                    stepSize: '2.1em',
                    size: 4,
                }}
                styleConfig={{
                    labelFontSize: '.75rem',
                    borderRadius: '50%',
                    fontWeight: 600,
                }}
                className='custom_stepper'
                activeStep={stepperIndex}
            >
                {quoteSteps.map((item, index) => {
                    let stepClass = 'upcoming';
                    if (index < stepperIndex) {
                        stepClass = 'completed';
                    } else if (index === stepperIndex) {
                        stepClass = 'current';
                    }
                    return (
                        <Step
                            className={`custom_steps ${stepClass}`}
                            key={item.label}
                            label={item.label}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleStepClick(index)}
                        />
                    );
                })}
            </Stepper>
            {/* <button onClick={() => dispatch(setStepperIndex(stepperIndex - 1))}>-</button>
            <button onClick={() => dispatch(setStepperIndex(stepperIndex + 1))}>+</button> */}
        </div>
    );
};

export default QuoteStepper;
