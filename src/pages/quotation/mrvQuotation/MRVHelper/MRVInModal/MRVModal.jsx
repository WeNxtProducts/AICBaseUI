import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import MrvQuotation from './../../MrvQuotation';
import { CloseOutlined } from '@ant-design/icons';
import useApiRequests from '../../../../../services/useApiRequests';
import showNotification from '../../../../../components/notification/Notification';

const modalStyles = {
 topPosition: { top: 60 },
};

const MRVModal = ({ open, handleClose, modalTitle, subId, tranId, isPremCalc = false }) => {
 const [Open, setOpen] = useState(false);
 const [mrvProps, setMrvProps] = useState(null);
 const [medicalId, setMedicalId] = useState();
 const getMapQuery = useApiRequests('getPreClaimDate', 'POST');

 const handleGetData = async () => {
  const payload = { queryParams: { POL_TRAN_ID: tranId, PEMP_TRAN_ID: subId } };
  try {
   const response = await getMapQuery(payload, { queryId: 194 });
   if (response?.status === 'SUCCESS') {
    if (response?.status_msg === 'No Datas Found') {
     setMedicalId();
     showNotification.WARNING(response?.status_msg);
     onClose();
    } else if (response?.status_msg === 'Data Fetched Successfully') {
     setMedicalId(response?.Data[0]?.MH_PEMP_ID);
     handleSetData();
    }
   } else if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   }
  } catch (err) {
   console.log('err  : ', err);
  }
 };

 const handleSetData = () => {
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
 };

 useEffect(() => {
  if (modalTitle === 'Medical') {
   handleGetData();
  } else {
   handleSetData();
  }
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
      medicalId={medicalId}
     />
    )}
   </Modal>
  </>
 );
};

export default MRVModal;
