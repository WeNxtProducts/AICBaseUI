import React, { createContext } from 'react';
import './GroupLife.scss';
import CustomStepper from '../../components/customStepper/CustomStepper';
import useStepper from '../../components/customStepper/useStepper';
import GroupLifeMainForm from './groupLifeMainForm/GroupLifeMainForm';

export const GroupLifeContext = createContext();

const GroupLife = () => {
    const stepperId = 0
    const groupLifeStepper = [
        { key: 0, title: 'Group Life Entry', status: 'inprogress', },
        { key: 1, title: 'Life Assured Details', status: 'todo' },
        { key: 2, title: 'Beneficiary', status: 'todo' },
        { key: 3, title: 'Broker/Agent', status: 'todo' },
        { key: 4, title: 'Chrgs/Dis-Load/Cond', status: 'todo' },
        { key: 5, title: 'Checklist', status: 'todo' },
    ];
    const { currentStep, stepperData, handleNext, handlePrevious, handleSkip, getNextKey } =
        useStepper(groupLifeStepper, stepperId);

    const handleSkipStep = index => {
        handleSkip(index);
    };

    const data = {}

    return (
        <GroupLifeContext.Provider value={data}>
            <div className='group_life'>
                <div className='stepper'>
                    <CustomStepper
                        currentStep={currentStep}
                        stepperData={stepperData}
                        handleSkip={handleSkipStep}
                    />
                    <div className='main-screen mt-0'>
                        <GroupLifeMainForm />
                    </div>
                </div>
            </div>
        </GroupLifeContext.Provider>
    )
}

export default GroupLife
