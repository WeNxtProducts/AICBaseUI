import React, { createContext, useContext, useState } from 'react';
import BasicInformation from './BasicInformation';
import { useSelector } from 'react-redux';

export const BenefitDetailsStep = createContext();

const Stepper1 = () => {
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);

    return (
        <div className='stepper_1 mt-3'>
            <BasicInformation />
        </div>
    );
};

export default Stepper1;
