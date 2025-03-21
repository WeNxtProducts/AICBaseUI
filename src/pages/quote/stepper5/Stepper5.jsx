import React, { useState } from 'react'
import { Tabs } from 'antd'
import TabPanelHeader from '../../../components/collapsePanelHeader/TabPanelHeader';
import QuoteCheckList from './QuoteCheckList';

const { TabPane } = Tabs;

const Stepper5 = () => {
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='Stepper5'>
            <p className='head_benefits'>Upload Document</p>
            <p className='head_benefits sub-head'>Please upload necessary proof of document</p>
            <p className='head_benefits sub-head mb-3'>Ensure that each document is not more than 300kb in size. file format(JPEG and PDF)</p>

            <div className='upload_docs_area'>
                <div className='plan-tabs p-2'>
                    <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
                        <TabPane key='1' tab={<TabPanelHeader name='CheckList' />}>
                            <QuoteCheckList />
                        </TabPane>
                        <TabPane key='2' tab={<TabPanelHeader name='Medical Examination' />}>
                            <p>Hello</p>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Stepper5