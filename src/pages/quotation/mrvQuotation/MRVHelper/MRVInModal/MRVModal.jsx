import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import MrvQuotation from './../../MrvQuotation';
import { CloseOutlined } from '@ant-design/icons';

const modalStyles = {
 topPosition: { top: 60 },
};

const MRVModal = ({ open, handleClose, modalTitle }) => {
 const [Open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(open);
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
    <MrvQuotation
     queryID='Life Assured Details'
     root='life_assured_details'
     mrvGet='getClaimChargesDetailsEdit'
     screenCode='CLAIMENTRY'
     screenName='CLAIMENTRY'
     saveRow='claimChargeCreate'
     editRow='claimChargeUpdate'
     deleteRow='claimChargeDelete'
     title={modalTitle}
     tranId={1}
    />
   </Modal>
  </>
 );
};

export default MRVModal;
