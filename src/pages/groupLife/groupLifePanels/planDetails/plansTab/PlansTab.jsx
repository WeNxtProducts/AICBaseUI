import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import TabPanelHeader from './../../../../../components/collapsePanelHeader/TabPanelHeader';
import PlanMRV from './planMRV/PlanMRV';

const { TabPane } = Tabs;

const PlansTab = ({ planList }) => {
    const [activeTabKey, setActiveTabKey] = useState('');

    useEffect(() => {
        if (planList.length > 0) {
            if (!activeTabKey || !planList.some(plan => plan.id.toString() === activeTabKey)) {
                setActiveTabKey(planList[0].id.toString());
            }
        } else {
            setActiveTabKey('');
        }
    }, [planList, activeTabKey]);

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='plan-tabs'>
            <Tabs
                size='small'
                centered={false}
                activeKey={activeTabKey}
                onChange={handleTabChange}
            >
                {planList.map((plan) => (
                    <TabPane key={plan.id.toString()} tab={<TabPanelHeader name={plan.title} />}>
                        <PlanMRV currentPlan={plan} />
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default PlansTab;
