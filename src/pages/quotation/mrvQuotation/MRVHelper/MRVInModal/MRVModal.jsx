import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import MrvQuotation from './../../MrvQuotation';
import { CloseOutlined } from '@ant-design/icons';

const modalStyles = {
 topPosition: { top: 60 },
};

const MRVModal = ({ open, handleClose, modalTitle, subId, tranId }) => {
 const [Open, setOpen] = useState(false);
 const [mrvProps, setMrvProps] = useState(null);

 useEffect(() => {
  setOpen(open);
  const isRider = modalTitle === 'Riders';
  setMrvProps({
   queryID: isRider ? 'getRiderDetails' : 'medical_details',
   root: isRider ? 'pol_riders' : 'medical_details',
   mrvGet: isRider ? 'getRidersDetails' : 'getMedicalDetails',
   saveRow: isRider ? 'saveRidersDetails' : 'saveMedicalDetails',
   editRow: isRider ? 'updateRidersDetails' : 'updateMedicalDetails',
   deleteRow: isRider ? 'deleteRidersDetails' : 'deleteMedicalDetails',
  });
 }, []);

 const onClose = status => {
  setOpen(false);
  handleClose(status);
 };

 return (
  <>
   {Open && (
    <Button
     className='custom-close-button'
     icon={<CloseOutlined className='custom-close-icon' />}
     onClick={() => onClose(false)}
    />
   )}
   <Modal
    open={Open}
    width={1150}
    style={modalStyles?.topPosition}
    onCancel={() => onClose(false)}
    closeIcon={null}
    maskClosable={false}
    footer={null}>
    {mrvProps !== null && (
     <MrvQuotation
      {...mrvProps}
      screenCode='QUOTATIONENTRY'
      screenName='QUOTATIONENTRY'
      title={modalTitle}
      tranId={tranId}
      subId={subId}
     />
    )}
   </Modal>
  </>
 );
};

export default MRVModal;
