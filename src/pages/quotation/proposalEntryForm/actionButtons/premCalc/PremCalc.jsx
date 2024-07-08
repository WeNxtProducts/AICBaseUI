import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import UnderWriterWorkBench from '../../../../underWriterWorkBench/UnderWriterWorkBench';

const PremCalc = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 return (
  <Modal width={1000} open={Open} onCancel={() => onClose()} footer={null}>
   <div className='mt-5'>
    <UnderWriterWorkBench fromPremCalc={true} onClose={onClose} />
   </div>
  </Modal>
 );
};

export default PremCalc;
