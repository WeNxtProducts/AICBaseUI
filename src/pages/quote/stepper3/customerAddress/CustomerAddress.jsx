import { Tabs } from 'antd'
import React, { useState } from 'react'
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader'

const { TabPane } = Tabs;

const CustomerAddress = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='cust_address'>
            <div className='sticky-tabs'>
                <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
                    <TabPane key='1' tab={<TabPanelHeader name='Payment Details' />}>
                        <p>Hello</p>
                    </TabPane>
                    <TabPane key='2' tab={<TabPanelHeader name='Checklist' />}>
                        <p>Hello</p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default CustomerAddress