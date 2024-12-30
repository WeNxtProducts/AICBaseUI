import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { CustomInput } from '../../components/commonExportsFields/CommonExportsFields';
import Loader from '../../components/loader/Loader';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';

const ApiToJsonModal = ({ open, handleClose, currentData }) => {
 const serviceToJson = useApiRequests('serviceToJson', 'POST');
 const [Open, setOpen] = useState(false);
 const [loader, setLoader] = useState(false);
 const [values, setValues] = useState({
  screenCode: '',
  screenName: '',
 });

 useEffect(() => {
  console.log('currentData : ', currentData);
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 const handleValues = (key, value) => {
  setValues({
   ...values,
   [key]: value,
  });
 };

 const handleSubmit = async () => {
  setLoader(true);
  const queryParams = {
   ...values,
   serviceName: currentData?.Service_Name || '',
  };
  try {
   const response = await serviceToJson('', queryParams);
   if (response?.status == 'SUCCESS') {
    showNotification.SUCCESS(response?.status_msg);
    onClose();
   }
   if (response?.Status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 return (
  <Modal title='API to JSON' open={Open} onCancel={() => onClose()} footer={null}>
   {loader && <Loader />}
   <div className='mt-4'>
    <div className='current-field p-2 flex items-center'>
     <div className='w-1/4'>
      <p className='label-font'>Screen Code</p>
     </div>
     <div className='input-container w-3/4'>
      <CustomInput
       name='screenCode'
       placeholder='screen code'
       value={values?.screenCode}
       onChange={e => {
        handleValues('screenCode', e.target.value);
       }}
      />
     </div>
    </div>

    <div className='current-field p-2 mt-2 flex items-center'>
     <div className='w-1/4'>
      <p className='label-font'>Screen Name</p>
     </div>
     <div className='input-container w-3/4'>
      <CustomInput
       name='screenName'
       placeholder='screen name'
       value={values?.screenName}
       onChange={e => {
        handleValues('screenName', e.target.value);
       }}
      />
     </div>
    </div>
    <div className='pb-7 mt-5 w-full'>
     <Button onClick={() => handleSubmit()} className='float-right api-to-json-submit'>
      Submit
     </Button>
    </div>
   </div>
  </Modal>
 );
};

export default ApiToJsonModal;
