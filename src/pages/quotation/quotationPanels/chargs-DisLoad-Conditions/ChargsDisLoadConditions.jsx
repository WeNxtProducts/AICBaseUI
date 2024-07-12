import React, { useState } from 'react';
import { Tabs } from 'antd';
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader';
import Charges from './charges/Charges';
import DiscountLoading from './discountLoading/DiscountLoading';
import Conditions from './conditions/Conditions';
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
    <Tabs
     size='small'
     centered={true}
     activeKey={activeTabKey}
     onChange={handleTabChange}>
     <TabPane key='1' tab={<TabPanelHeader name='Charges' />}>
      <MrvQuotation
       queryID='Benificiary'
       root='Charges'
       mrvGet='getClaimChargesDetailsEdit'
       screenCode='QUOTATIONENTRY'
       screenName='QUOTATIONENTRY'
       saveRow='claimChargeCreate'
       editRow='claimChargeUpdate'
       deleteRow='claimChargeDelete'
       title=''
       tranId={tranId}
      />
     </TabPane>
     <TabPane key='2' tab={<TabPanelHeader name='Discount/Loading' />}>
      <MrvQuotation
       queryID='Benificiary'
       root='Discount_Loading'
       mrvGet='getClaimChargesDetailsEdit'
       screenCode='QUOTATIONENTRY'
       screenName='QUOTATIONENTRY'
       saveRow='claimChargeCreate'
       editRow='claimChargeUpdate'
       deleteRow='claimChargeDelete'
       title=''
       tranId={tranId}
      />
     </TabPane>
     <TabPane key='3' tab={<TabPanelHeader name='Conditions' />}>
      <MrvQuotation
       queryID='Benificiary'
       root='Conditions'
       mrvGet='getClaimChargesDetailsEdit'
       screenCode='QUOTATIONENTRY'
       screenName='QUOTATIONENTRY'
       saveRow='claimChargeCreate'
       editRow='claimChargeUpdate'
       deleteRow='claimChargeDelete'
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
