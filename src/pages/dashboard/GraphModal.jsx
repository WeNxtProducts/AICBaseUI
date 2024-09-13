import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import MainChart from './MainChart';
import './GraphModal.scss';

const GraphModal = ({ graphOpen, handleClose }) => {
 const [open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(graphOpen);
 }, []);

 const handleCloseModal = () => {
  setOpen(false);
  handleClose();
 };

 return (
  <Modal
   centered
   open={open}
   onCancel={() => handleCloseModal()}
   maskClosable={false}
   footer={null}
   className='charts-line'
   width={900}>
   <MainChart />
  </Modal>
 );
};

export default GraphModal;
