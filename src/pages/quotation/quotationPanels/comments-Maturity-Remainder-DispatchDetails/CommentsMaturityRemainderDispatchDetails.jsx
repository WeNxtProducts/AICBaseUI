import React, { useState } from 'react';
import { Tabs } from 'antd';
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader';
import Comments from './comments/Comments';
import Maturity from './maturity/Maturity';
import Remainder from './remainder/Remainder';
import DispatchDetails from './dispatchDetails/DispatchDetails';

const { TabPane } = Tabs;

const CommentsMaturityRemainderDispatchDetails = () => {
 const [activeTabKey, setActiveTabKey] = useState('1');

 const handleTabChange = key => {
  setActiveTabKey(key);
 };

 return (
  <div className='comments-maturity-remainder-dispatch sampleTabs'>
   <div className='sticky-tabs'>
    <Tabs
     size='small'
     centered={true}
     activeKey={activeTabKey}
     onChange={handleTabChange}>
     <TabPane key='1' tab={<TabPanelHeader name='Comments' />}>
      <Comments />
     </TabPane>
     <TabPane key='2' tab={<TabPanelHeader name='Maturity' />}>
      <Maturity />
     </TabPane>
     <TabPane key='3' tab={<TabPanelHeader name='Remainder' />}>
      <Remainder />
     </TabPane>
     <TabPane key='4' tab={<TabPanelHeader name='Dispatch Details' />}>
      <DispatchDetails />
     </TabPane>
    </Tabs>
   </div>
  </div>
 );
};

export default CommentsMaturityRemainderDispatchDetails;
