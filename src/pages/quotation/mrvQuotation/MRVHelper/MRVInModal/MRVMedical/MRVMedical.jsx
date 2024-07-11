import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import MedicalTabs from './medicalTabs/MedicalTabs';

const MRVMedical = ({ open, handleClose, modalTitle }) => {
 const [Open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = status => {
  setOpen(false);
  handleClose(status);
 };
 return (
  <Modal open={Open} width={1150} onCancel={() => onClose(false)} footer={null}>
   <div className='medical_mrv'>
    <MedicalTabs />
   </div>
  </Modal>
 );
};

export default MRVMedical;
