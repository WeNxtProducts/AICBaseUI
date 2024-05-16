import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import './ConfirmationModal.scss';

const MessageTitle = () => (
 <p className='modal_msg_delete select-none'>Confirm Delete</p>
);

const ConfirmationModal = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = status => {
  setOpen(false);
  handleClose(status);
 };

 return (
  <Modal
   title={<MessageTitle />}
   open={Open}
   width={400}
   onCancel={() => onClose(false)}
   footer={null}>
   <div className='mt-2 confirmation_modal select-none'>
    <p>Are you sure you want to delete?</p>
    <div className='confirmation_button flex items-center justify-end mt-4'>
     <Button className='mr-1' onClick={() => onClose(true)}>
      Delete
     </Button>
     <Button className='ml-1' onClick={() => onClose(false)}>
      Cancel
     </Button>
    </div>
   </div>
  </Modal>
 );
};

export default ConfirmationModal;
