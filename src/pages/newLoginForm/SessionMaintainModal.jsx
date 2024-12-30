import { Modal, Button } from 'antd';
import React from 'react';
import './SessionMaintainModal.scss';

const SessionMaintainModal = ({ open, onConfirm, onCancel }) => {
 return (
  <Modal
   open={open}
   closeIcon={null}
   onCancel={onCancel}
   footer={[
    <Button key='no' onClick={onCancel} className='session-button no-button'>
     No
    </Button>,
    <Button key='yes' type='primary' onClick={onConfirm} className='session-button yes-button'>
     Yes
    </Button>,
   ]}
   className='session-modal'>
   <p>To continue, should we expire your current session and create a new one?</p>
  </Modal>
 );
};

export default SessionMaintainModal;
