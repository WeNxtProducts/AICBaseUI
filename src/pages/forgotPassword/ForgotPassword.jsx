import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from 'antd';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';

const ForgotPassword = ({ open, handleClose }) => {
 const forgotPassword = useApiRequests('forgotPassword', 'POST');
 const [Open, setOpen] = useState(false);
 const [email, setEmail] = useState('');

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 const validateEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
 };

 const handleSendMail = async () => {
  if (validateEmail(email)) {
   try {
    const response = await forgotPassword('', { email });
    console.log('handleGetFormFields : ', response);
    showNotification[response.Status](response.Message);
    setTimeout(() => {
     onClose();
    }, 2000);
   } catch (err) {
    console.log('err  : ', err);
   }
  } else {
   showNotification.ERROR('Invalid email structure');
  }
 };

 return (
  <Modal title='Forgot Password' open={Open} onCancel={() => onClose()} footer={null}>
   <div className='fields mt-5'>
    <Input
     value={email}
     name='email'
     className=''
     placeholder='E-mail'
     onChange={e => setEmail(e.target.value)}
    />
   </div>
   <div className='mt-4 flex justify-center'>
    <Button
     className='forgot-button'
     onClick={() => {
      handleSendMail();
     }}>
     Get Reset Link
    </Button>
   </div>
  </Modal>
 );
};

export default ForgotPassword;
