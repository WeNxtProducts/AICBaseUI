import { useEffect, useState } from 'react';
import { Modal, Tabs } from 'antd';
import CardListingScreen from './CardListingScreen';
import TabPanelHeader from '../../../components/collapsePanelHeader/TabPanelHeader';

const { TabPane } = Tabs;

const modalStyles = {
 body: { height: 450, overflowY: 'auto' },
 topPosition: { top: 20 },
};
const TreatyModal = ({ open, handleClose, claimTranId, coverId }) => {
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
  <Modal
   width={900}
   title='Treaty'
   open={Open}
   onCancel={() => onClose()}
   style={modalStyles?.topPosition}
   styles={{
    content: {
     backgroundColor: '#F3F4F5',
     maxHeight: '500px',
     overflowY: 'auto',
    },
    header: { backgroundColor: '#F3F4F5' },
   }}
   footer={null}>
   <Tabs size='small' centered={true} activeKey={activeTabKey} onChange={handleTabChange}>
    <TabPane key='1' tab={<TabPanelHeader name='Claim RI Recovery' />}>
     <CardListingScreen
      title='Claim RI Recovery'
      queryId={135}
      claimTranId={claimTranId}
      coverId={coverId}
     />
    </TabPane>
    <TabPane key='2' tab={<TabPanelHeader name='FAC Recovery' />}>
     <CardListingScreen
      title='FAC Recovery'
      queryId={140}
      claimTranId={claimTranId}
      coverId={coverId}
     />
    </TabPane>
   </Tabs>
  </Modal>
 );
};

export default TreatyModal;
