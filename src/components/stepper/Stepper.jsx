import React from 'react';
import { Step, Stepper } from 'react-form-stepper';
import './Stepper.scss';

const StepperComponent = ({ quoteSteps, stepperChange, stepperIndex }) => {

    const handleStepClick = (index) => {
        stepperChange(index);
    };

    return (
        <div className='stepper'>
            <Stepper
                nonLinear={true}
                connectorStateColors={true}
                connectorStyleConfig={{
                    completedColor: '#0382C8',
                    activeColor: '#ffbd13',
                    disabledColor: '#eee',
                    stepSize: '2.1em',
                    size: 4,
                    style: 'solid'
                }}
                styleConfig={{
                    labelFontSize: '.75rem',
                    borderRadius: '50%',
                    fontWeight: 600,
                }}
                className='custom_stepper'
                activeStep={2}
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

export default StepperComponent;
