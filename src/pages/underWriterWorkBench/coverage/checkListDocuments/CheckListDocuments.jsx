import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import Checklist from './../../../quotation/quotationPanels/checkList/CheckList';

const modalStyles = {
 topPosition: { top: 60 },
};

const CheckListDocuments = ({ open, handleClose, tranId, proposalNumber, freeze }) => {
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
   open={Open}
   width={1150}
   title='CheckList'
   style={modalStyles?.topPosition}
   onCancel={() => onClose()}
   //closeIcon={null}
   maskClosable={false}
   footer={null}>
   <hr />
   <Checklist tranId={tranId} proposalNumber={proposalNumber} queryID={149} freeze={freeze} />
  </Modal>
 );
};

export default CheckListDocuments;
