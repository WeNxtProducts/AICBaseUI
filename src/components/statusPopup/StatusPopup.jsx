import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import success_icon from '../../assets/success_icon.png';
import failure_icon from '../../assets/failure_icon.png';
import failure_mark from '../../assets/failure_mark.png';
import success_mark from '../../assets/success_mark.png';
import './StatusPopup.scss';

const failureAlign = {
 backgroundImage: `url(${failure_mark})`,
 backgroundSize: '70% 100%',
};

const successAlign = {
 backgroundImage: `url(${success_mark})`,
 backgroundSize: '90% 100%',
};

const StatusPopup = ({ open, handleClose, status = true }) => {
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
   width={700}
   closeIcon={null}
   onCancel={() => onClose()}
   footer={null}
   className='full-screen-modal'>
   <div
    className='mt-2 status_modal select-none'
    style={status ? successAlign : failureAlign}>
    <div className={`circle-icon-container ${status ? 'success' : 'failure'}`}>
     <img
      src={status ? success_icon : failure_icon}
      alt='Icon'
      className='icon'
     />
    </div>
    <div className='status_message'>
     {status ? (
      <p>Proposal Saved Successfully !!!</p>
     ) : (
      <p>Proposal Not Saved</p>
     )}
     <Button
      className={`btn_status ${status ? 'success_btn' : 'failure_btn'}`}
      onClick={() => handleClose()}>
      Close
     </Button>
    </div>
   </div>
  </Modal>
 );
};

export default StatusPopup;
