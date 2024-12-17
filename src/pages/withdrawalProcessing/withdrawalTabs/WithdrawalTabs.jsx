import React, { useState } from 'react'
import { Tabs } from 'antd';
import TabPanelHeader from '../../../components/collapsePanelHeader/TabPanelHeader';
import WithDrawTabDetails from './tabContents/withDrawTabDetails/WithDrawTabDetails';
import WDChargeDetails from './WDChargeDetails/WDChargeDetails';
import WDToDoList from './WDToDoList/WDToDoList';
import WDPaymentDetails from './WDPaymentDetails/WDPaymentDetails';

const { TabPane } = Tabs;

const WithdrawalTabs = () => {
    const [activeTabKey, setActiveTabKey] = useState('2');

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='withdrawal_tabs'>
            <div className='sticky-tabs withdrawal'>
                <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
                    <TabPane key='1' tab={<TabPanelHeader name='Withdrawal Details' />}>
                        <WithDrawTabDetails />
                    </TabPane>
                    <TabPane key='2' tab={<TabPanelHeader name='Charge Details' />}>
                        <WDChargeDetails />
                    </TabPane>
                    <TabPane key='3' tab={<TabPanelHeader name='To Do List Details' />}>
                        <WDToDoList />
                    </TabPane>
                    <TabPane key='4' tab={<TabPanelHeader name='Payment Details' />}>
                        <WDPaymentDetails />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default WithdrawalTabs
