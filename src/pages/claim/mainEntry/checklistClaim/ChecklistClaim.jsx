import React, { useEffect, useState } from 'react';
import CheckListTable from './CheckListTable';
import CheckListDetails from './CheckListDetails';
import { Divider, Modal } from 'antd';

const MessageTitle = ({ title }) => (
 <p className='modal_msg_delete select-none'>{title}</p>
);

const modalStyles = {
 body: { height: 450, overflowY: 'auto' },
 topPosition: { top: 20 },
};

const ChecklistClaim = ({ title, openModal, handleCloseModal }) => {
 const [Open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(openModal);
 }, []);

 const close = () => {
  setOpen(false);
  handleCloseModal();
 };

 return (
  <Modal
   title={<MessageTitle title={title} />}
   open={Open}
   width={1100}
   className='clam_checklist'
   style={modalStyles?.topPosition}
   styles={modalStyles}
   onCancel={() => close()}
   footer={null}>
   <div className='checklist_claim p-3'>
    <CheckListTable />
    <Divider className='table-divider' />
    <CheckListDetails />
   </div>
  </Modal>
 );
};

export default ChecklistClaim;
