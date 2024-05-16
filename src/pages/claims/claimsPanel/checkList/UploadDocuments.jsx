import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

const UploadDocuments = ({ open, handleClose }) => {
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
   title='Upload Documents'
   open={Open}
   width={800}
   onCancel={() => onClose(false)}
   footer={null}>
   <div className='mt-2'>
    <p>Upload Documents</p>
   </div>
  </Modal>
 );
};

export default UploadDocuments;
