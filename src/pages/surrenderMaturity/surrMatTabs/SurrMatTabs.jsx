import { Tabs } from 'antd';
import React, { useContext, useState } from 'react'
import TabPanelHeader from '../../../components/collapsePanelHeader/TabPanelHeader';
import { SurrMatContext } from '../SurrenderMaturity';
import Checklist from './checkList/CheckList';

const { TabPane } = Tabs;

const SurrMatTabs = () => {
    const { POL_NO, tranId } = useContext(SurrMatContext);
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = key => {
        setActiveTabKey(key);
    };

    return (
        <div className='Surr_mat_tabs'>
            <div className='sticky-tabs'>
                <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
                    <TabPane key='1' tab={<TabPanelHeader name='Payment Details' />}>
                        <p>Details</p>
                    </TabPane>
                    <TabPane key='2' tab={<TabPanelHeader name='Checklist' />}>
                        <Checklist tranId={tranId} proposalNumber={POL_NO}
                            queryID={149} freeze={false} />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default SurrMatTabs;
