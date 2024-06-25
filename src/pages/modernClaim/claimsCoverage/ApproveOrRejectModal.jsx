import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';
import {
 appOrRej,
 claim_check,
} from '../../../components/tableComponents/sampleData';

const MessageTitle = () => (
 <p className='modal_msg_delete select-none'>Approve/Reject</p>
);

const ApproveOrRejectModal = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);
 const [values, setValues] = useState({
  select_type: '',
  reason: '',
 });

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 const handleOnChange = (val, key) => {
  setValues(pre => ({
   ...pre,
   [key]: val,
  }));
 };

 const submit = () => {
  console.log('submit : ', values);
 };

 return (
  <Modal
   title={<MessageTitle />}
   open={Open}
   width={500}
   className='approve_reject_modal'
   onCancel={onClose}
   footer={null}>
   <div className='grid grid-cols-10 mt-3 gap-4'>
    <div className='col-span-10 grid grid-cols-10 items-center'>
     <p className='col-span-2 label-font'>Select Type</p>
     <div className='col-span-5'>
      <CustomSelect
       options={appOrRej}
       name={`reject_approved_type`}
       placeholder={'select'}
       showSearch={false}
       value={values?.select_type || undefined}
       onChange={e => {
        handleOnChange(e, 'select_type');
       }}
      />
     </div>
    </div>

    <div className='col-span-10 grid grid-cols-10 items-center'>
     <p className='col-span-2 label-font'>Reason</p>
     <div className='col-span-5'>
      <CustomSelect
       options={claim_check}
       name={`reason`}
       placeholder={'select'}
       showSearch={false}
       value={values?.reason || undefined}
       onChange={e => {
        handleOnChange(e, 'reason');
       }}
      />
     </div>
    </div>
   </div>
   <div className='flex justify-center mt-5'>
    <Button className='app_rej_btn' onClick={() => submit()}>
     Process
    </Button>
   </div>
  </Modal>
 );
};

export default ApproveOrRejectModal;
