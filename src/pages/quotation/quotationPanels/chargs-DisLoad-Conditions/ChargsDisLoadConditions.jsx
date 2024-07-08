import React, { useState } from 'react';
import { Tabs } from 'antd';
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader';
import Charges from './charges/Charges';
import DiscountLoading from './discountLoading/DiscountLoading';
import Conditions from './conditions/Conditions';

const { TabPane } = Tabs;

const ChargsDisLoadConditions = () => {
 const [activeTabKey, setActiveTabKey] = useState('1');

 const handleTabChange = key => {
  setActiveTabKey(key);
 };

 return (
  <div className='chargs-Dis-load-Conditions sampleTabs'>
   <div className='sticky-tabs'>
    <Tabs
     size='small'
     centered={true}
     activeKey={activeTabKey}
     onChange={handleTabChange}>
     <TabPane key='1' tab={<TabPanelHeader name='Charges' />}>
      <Charges />
     </TabPane>
     <TabPane key='2' tab={<TabPanelHeader name='Discount/Loading' />}>
      <DiscountLoading />
     </TabPane>
     <TabPane key='3' tab={<TabPanelHeader name='Conditions' />}>
      <Conditions />
     </TabPane>
    </Tabs>
   </div>
  </div>
 );
};

export default ChargsDisLoadConditions;
