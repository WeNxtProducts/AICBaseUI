import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import CardListingScreen from './CardListingScreen';

const modalStyles = {
 body: { height: 450, overflowY: 'auto' },
 topPosition: { top: 20 },
};

const Beneficiary = ({ open, handleClose, claimTranId, coverId }) => {
 const [Open, setOpen] = useState(false);

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
   title='Beneficiary'
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
   <CardListingScreen
    title='Beneficiary'
    queryId={134}
    claimTranId={claimTranId}
    coverId={coverId}
   />
  </Modal>
 );
};

export default Beneficiary;
