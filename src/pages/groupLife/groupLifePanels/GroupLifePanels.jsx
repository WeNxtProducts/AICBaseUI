import React, { useContext, useEffect, useState } from 'react'
import { Collapse } from 'antd';
import { GroupLifeContext } from '../GroupLife';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import EmployeeUpload from './employeeUpload/EmployeeUpload';
import PlanDetails from './planDetails/PlanDetails';

const { Panel } = Collapse;

const GroupLifePanels = () => {
    const { currentStep, stepperData, handleNext, handlePrevious,
        handleSkip, id: tranId } = useContext(GroupLifeContext);
    const [activePanal, setActivePanel] = useState(['0']);
    const [isAllCompleted, setIsAllCompleted] = useState(false);


    useEffect(() => {
        if (!isAllCompleted) {
            const condition = allStepsCompleted();
            setIsAllCompleted(condition);
        }
    }, [currentStep]);

    const allStepsCompleted = () => stepperData.every(item => item.status === 'completed');

    const determinePanelClassName = index => {
        if (isAllCompleted) {
            return 'active-panel';
        } else if (
            stepperData[index]?.status === 'completed' ||
            stepperData[index]?.status === 'inprogress'
        ) {
            return 'active-panel';
        } else {
            return 'inactive-panel';
        }
    };

    const callback = key => {
        const lastElement = key[key.length - 1];
        const lastElementAsNumber = parseInt(lastElement, 10);
        if (!isAllCompleted) {
            if (
                stepperData[lastElement]?.status === 'completed' ||
                stepperData[lastElement]?.status === 'inprogress'
            )
                handleSkip(lastElementAsNumber);
        } else {
            setActivePanel(key);
            handleSkip(lastElementAsNumber);
        }
    };

    return (
        <div className='quotation-panels'>
            <Collapse
                expandIconPosition='end'
                activeKey={!isAllCompleted ? currentStep : activePanal}
                onChange={callback}
                size='small'>
                <Panel
                    className={determinePanelClassName(1)}
                    data-id='panel-1'
                    header={
                        <CollapsePanelHeader from='GL' name='Plan Details' saved={stepperData[1]} />
                    }
                    key={1}>
                    <PlanDetails />
                </Panel>
                <Panel
                    className={determinePanelClassName(2)}
                    data-id='panel-1'
                    header={
                        <CollapsePanelHeader from='GL' name='Employee Details' saved={stepperData[2]} />
                    }
                    key={2}>
                    <EmployeeUpload />
                </Panel>
            </Collapse>
        </div>
    )
}

export default GroupLifePanels
