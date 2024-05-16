import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import {
 CustomInput,
 CustomPasswordField,
} from '../commonExportsFields/CommonExportsFields';
import './AdminPasswordModal.scss';

const MessageTitle = () => (
 <p className='modal_msg_delete select-none'>Admin Password</p>
);

const AdminPasswordModal = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);
 const [password, setPassword] = useState('');

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = status => {
  setOpen(false);
  handleClose(status);
 };

 const checkPassword = () => {
  onClose(true);
 };

 return (
  <Modal
   title={<MessageTitle />}
   open={Open}
   width={400}
   onCancel={() => onClose(false)}
   footer={null}>
   <div className='mt-2 confirmation_modal select-none'>
    <CustomPasswordField
     name={`admin_password`}
     placeholder={'password'}
     value={password}
     onChange={e => {
      setPassword(e.target.value);
     }}
     isModal={false}
    />
    <div className='mt-4 flex justify-end'>
     <Button onClick={() => checkPassword()} className='admin_password_modal'>
      Submit
     </Button>
    </div>
   </div>
  </Modal>
 );
};

export default AdminPasswordModal;
