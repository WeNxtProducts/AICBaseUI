import React, { useState } from 'react'
import { Checkbox, Tabs } from 'antd'
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader'
import AddressFields from './AddressFields';
import AddressFieldsForms from './AddressFieldsForms';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

const CustomerAddress = () => {
    const currentAddress = useSelector(state => state?.quote?.currentAddress);
    const residenceAddress = useSelector(state => state?.quote?.residenceAddress);
    const sameAddress = useSelector(state => state?.quote?.sameAddress);
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
                        <AddressFieldsForms
                            setActiveTabKey={setActiveTabKey}
                            root='CurrentAddress'
                            initialValues={currentAddress}
                            freeze={false}
                        />
                    </TabPane>
                    <TabPane disabled={sameAddress} key='2' tab={<TabPanelHeader name='Permanent Address' />}>
                        {/* <AddressFields /> */}
                        <AddressFieldsForms
                            setActiveTabKey={setActiveTabKey}
                            root='ResidenceAddress'
                            initialValues={residenceAddress}
                            freeze={sameAddress}
                        />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default CustomerAddress