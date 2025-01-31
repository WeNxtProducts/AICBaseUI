import React, { createContext, useState } from 'react';
import CustomStepper from '../../components/customStepper/CustomStepper';
import useStepper from '../../components/customStepper/useStepper';
import GroupLifeMainForm from './groupLifeMainForm/GroupLifeMainForm';
import GroupLifeJSON from '../../getFormFields/GLQUOTATIONENTRY_getFieldList.json';
import GroupLifeLov from '../../getFormFields/QUOTATIONENTRY_getLOVList.json';
import { useSelector } from 'react-redux';
import GroupLifePanels from './groupLifePanels/GroupLifePanels';
import './GroupLife.scss';

export const GroupLifeContext = createContext();

const GroupLife = () => {
    const stepperId = 6
    const id = useSelector(state => state?.id?.id);
    const groupLifeStepper = [
        { key: 0, title: 'Proposal Entry', status: 'inprogress', },
        { key: 1, title: 'Life Assured Details', status: 'todo' },
        { key: 2, title: 'Beneficiary', status: 'todo' },
        { key: 3, title: 'Broker/Agent', status: 'todo' },
        { key: 4, title: 'Chrgs/Dis-Load/Cond', status: 'todo' },
        { key: 5, title: 'Checklist', status: 'todo' },
    ];
    const { currentStep, stepperData, handleNext, handlePrevious, handleSkip, getNextKey } =
        useStepper(groupLifeStepper, stepperId);
    const [dropDown, setDropDown] = useState(GroupLifeLov);

    const handleSkipStep = index => {
        handleSkip(index);
    };

    const data = {
        dropDown, setDropDown, GroupLifeJSON, currentStep
        , stepperData, handleNext, handlePrevious, handleSkip, id
    }

    return (
        <GroupLifeContext.Provider value={data}>
            <div className='group_life'>
                <div className='stepper'>
                    <CustomStepper
                        currentStep={currentStep}
                        stepperData={stepperData}
                        handleSkip={handleSkipStep}
                    />
                </div>
                <div className='main-screen mt-0'>
                    <GroupLifeMainForm />
                    <div className='mt-3'>
                        <GroupLifePanels />
                    </div>
                </div>
            </div>
        </GroupLifeContext.Provider>
    )
}

export default GroupLife
