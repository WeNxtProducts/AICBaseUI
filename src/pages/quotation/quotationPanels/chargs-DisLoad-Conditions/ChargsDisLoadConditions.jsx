import React, { useState } from 'react';
import { Tabs } from 'antd';
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader';
import MrvQuotation from '../../mrvQuotation/MrvQuotation';

const { TabPane } = Tabs;

const ChargsDisLoadConditions = ({ tranId }) => {
 const [activeTabKey, setActiveTabKey] = useState('1');

 const handleTabChange = key => {
  setActiveTabKey(key);
 };

 return (
  <div className='chargs-Dis-load-Conditions sampleTabs'>
   <div className='sticky-tabs'>
    <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
     <TabPane key='1' tab={<TabPanelHeader name='Charges' />}>
      <MrvQuotation
       queryID='getChargesList'
       root='Charges'
       mrvGet='getChargesDetails'
       screenCode='QUOTATIONENTRY'
       screenName='QUOTATIONENTRY'
       saveRow='saveChargesDetails'
       editRow='updateChargesDetails'
       deleteRow='deleteChargesDetails'
       title=''
       tranId={tranId}
      />
     </TabPane>
     <TabPane key='2' tab={<TabPanelHeader name='Discount/Loading' />}>
      <MrvQuotation
       queryID='getDiscLoadList'
       root='Discount_Loading'
       mrvGet='getDisLoadDetails'
       screenCode='QUOTATIONENTRY'
       screenName='QUOTATIONENTRY'
       saveRow='saveDisLoadDetails'
       editRow='updateDisLoadDetails'
       deleteRow='deleteDisLoadDetails'
       title=''
       tranId={tranId}
      />
     </TabPane>
     <TabPane key='3' tab={<TabPanelHeader name='Conditions' />}>
      <MrvQuotation
       queryID='getConditionsList'
       root='Conditions'
       mrvGet='getConditionsDetails'
       screenCode='QUOTATIONENTRY'
       screenName='QUOTATIONENTRY'
       saveRow='saveConditionsDetails'
       editRow='updateConditionsDetails'
       deleteRow='deleteConditionsDetails'
       title=''
       tranId={tranId}
      />
     </TabPane>
    </Tabs>
   </div>
  </div>
 );
};

export default ChargsDisLoadConditions;
