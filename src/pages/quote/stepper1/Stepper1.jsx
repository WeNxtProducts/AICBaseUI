import React, { createContext, useContext, useState } from 'react';
import BasicInformation from './BasicInformation';
import ListOfBenefits from './listOfBenefits/ListOfBenefits';
import { QuoteContext } from '../Quote';

export const BenefitDetailsStep = createContext();

const Stepper1 = () => {
    const { stepperIndex, setStepperIndex } = useContext(QuoteContext);

    return (
        <div className='stepper_1 mt-3'>
            {stepperIndex === 1 && <BasicInformation />}
            {stepperIndex === 2 && <ListOfBenefits />}
        </div>
    );
};

export default Stepper1;
