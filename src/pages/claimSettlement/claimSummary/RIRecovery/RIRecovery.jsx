import React, { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import TabPanelHeader from '../../../../components/collapsePanelHeader/TabPanelHeader';
import RIEstimate from './RIEstimate';
import ClaimRIRecovery from './ClaimRIRecovery';

const { TabPane } = Tabs;

const RIRecovery = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);
 const [activeTabKey, setActiveTabKey] = useState('1');

 const handleTabChange = key => {
  setActiveTabKey(key);
 };

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 return (
  <Modal width={1000} title='RI Recovery' open={Open} onCancel={() => onClose()} footer={null}>
   <div className='sticky-tabs ri-recovery'>
    <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
     <TabPane key='1' tab={<TabPanelHeader name='RI Estimate' />}>
      <RIEstimate />
     </TabPane>
     <TabPane key='2' tab={<TabPanelHeader name='Claim RI Recovery' />}>
      <ClaimRIRecovery />
     </TabPane>
    </Tabs>
   </div>
  </Modal>
 );
};

export default RIRecovery;
