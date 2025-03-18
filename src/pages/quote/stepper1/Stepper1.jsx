import React, { createContext, useContext, useState } from 'react';
import BasicInformation from './BasicInformation';
import ListOfBenefits from './listOfBenefits/ListOfBenefits';
import { useSelector } from 'react-redux';

export const BenefitDetailsStep = createContext();

const Stepper1 = () => {
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);

    return (
        <div className='stepper_1 mt-3'>
            {stepperIndex === 0 && <BasicInformation />}
            {stepperIndex === 1 && <ListOfBenefits />}
            {stepperIndex === 2 && <p>Question</p>}
            {stepperIndex === 3 && <p>Docs</p>}
            {stepperIndex === 4 && <p>Review</p>}
        </div>
    );
};

export default Stepper1;
