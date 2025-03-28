import React, { useState } from 'react'
import { Checkbox, Tabs } from 'antd'
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader'
import AddressFields from './AddressFields';
import AddressFieldsForms from './AddressFieldsForms';

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
                    <TabPane key='1' tab={<TabPanelHeader name='Current Address' />}>
                        {/* <AddressFields /> */}
                        <AddressFieldsForms root='CurrentAddress' />
                    </TabPane>
                    <TabPane key='2' tab={<TabPanelHeader name='Permanent Address' />}>
                        {/* <AddressFields /> */}
                        <AddressFieldsForms root='ResidenceAddress' />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default CustomerAddress