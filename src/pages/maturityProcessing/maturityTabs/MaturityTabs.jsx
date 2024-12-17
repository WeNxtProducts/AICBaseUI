import React, { useEffect, useRef, useState } from 'react'
import { Tabs } from 'antd';
import TabPanelHeader from '../../../components/collapsePanelHeader/TabPanelHeader';
import MaturityDetails from './maturityDetails/MaturityDetails';
import MChargeDetails from './mChargeDetails/MChargeDetails';
import MToDoList from './mToDoList/MToDoList';
import MPaymentDetails from './mPaymentDetails/MPaymentDetails';

const { TabPane } = Tabs;

const MaturityTabs = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        }, 100)

    }, [activeTabKey])

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='maturity_tabs' ref={containerRef}>
            <div className='sticky-tabs withdrawal'>
                <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
                    <TabPane key='1' tab={<TabPanelHeader name='Maturity Details' />}>
                        <MaturityDetails />
                    </TabPane>
                    <TabPane key='2' tab={<TabPanelHeader name='Charge Details' />}>
                        <MChargeDetails />
                    </TabPane>
                    <TabPane key='3' tab={<TabPanelHeader name='To Do List Details' />}>
                        <MToDoList />
                    </TabPane>
                    <TabPane key='4' tab={<TabPanelHeader name='Payment Details' />}>
                        <MPaymentDetails />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default MaturityTabs
