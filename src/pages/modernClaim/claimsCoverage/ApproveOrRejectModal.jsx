import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';

const MessageTitle = () => (
 <p className='modal_msg_delete select-none'>Approve/Reject</p>
);

const ApproveOrRejectModal = ({
 open,
 handleClose,
 selectedPolDetails,
 setSelectedPolDetails,
 setFreeze,
 selectedPolicy,
 tranId,
}) => {
 const { CLM_FRZ_YN, CLM_TRAN_ID, CLM_STATUS, CLM_STATUS_CODE } =
  selectedPolDetails;
 const getLovList = useApiRequests('getLovList', 'GET');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const getPolClaimDetails = useApiRequests('getPreClaimDate', 'POST');
 const processApproveOrReject = useApiRequests(
  'claimLevelDetailsUpdate',
  'POST',
 );
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const [Open, setOpen] = useState(false);
 const [values, setValues] = useState({
  CLM_STATUS: CLM_STATUS ?? '',
  CLM_STATUS_CODE: CLM_STATUS_CODE ?? '',
 });
 const [reasonDropDown, setReasonDropDown] = useState({
  decision: [],
  reason: [],
 });

 const handleGetLovList = async (queryParams, key, apiCalls) => {
  try {
   const response = await apiCalls({}, queryParams);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setReasonDropDown(pre => ({
     ...pre,
     [key]: key === 'reason' ? response?.Data?.getReasonList : response?.Data,
    }));
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  setOpen(open);
  const queryParams = { queryId: 123 };
  handleGetLovList(queryParams, 'decision', getLovList);
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

 const handlePolClaimDetails = async () => {
  try {
   const response = await getPolClaimDetails(
    { queryParams: { tranId, CLM_POL_NO: selectedPolicy } },
    { queryId: 119 },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setSelectedPolDetails(response?.Data[0]);
    setFreeze(response?.Data[0]?.CLM_FRZ_YN === 'Y');
    handleClose();
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const onSave = async () => {
  const queryParams = {
   tranId: CLM_TRAN_ID,
   CLM_STATUS: values?.CLM_STATUS,
   CLM_STATUS_CODE: values?.CLM_STATUS, // CLM_STATUS_CODE
   FreezeFlag: CLM_FRZ_YN,
  };
  try {
   const response = await processApproveOrReject('', queryParams);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handlePolClaimDetails();
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };
 const callProcedure = async () => {
  const payload = {
   inParams: { P_CLM_TRAN_ID: CLM_TRAN_ID, P_CH_TRAN_ID: tranId },
  };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'P_CLM_APPRV_PRCSS',
    packageName: 'WNPKG_CLAIM',
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    onSave();
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const submit = async () => {
  if (values?.CLM_STATUS === 'A') {
   callProcedure();
  } else {
   onSave();
  }
 };

 return (
  <Modal
   title={<MessageTitle />}
   open={Open}
   width={500}
   className='approve_reject_modal'
   onCancel={onClose}
   footer={null}>
   {reasonDropDown?.decision?.length > 0 && (
    <div className='grid grid-cols-10 mt-3 gap-4'>
     <div className='col-span-10 grid grid-cols-10 items-center'>
      <p className='col-span-2 label-font'>Decision</p>
      <div className='col-span-5'>
       <CustomSelect
        options={reasonDropDown?.decision}
        name={`reject_approved_type`}
        placeholder={'select'}
        showSearch={false}
        value={values?.CLM_STATUS || undefined}
        onChange={e => {
         setValues(pre => ({
          ...pre,
          CLM_STATUS_CODE: '',
         }));
         handleOnChange(e, 'CLM_STATUS');
         const queryParams = { queryId: 124, CLM_STATUS: e };
         handleGetLovList(queryParams, 'reason', getParamLov);
        }}
       />
      </div>
     </div>

     <div className='col-span-10 grid grid-cols-10 items-center'>
      <p className='col-span-2 label-font'>Reason</p>
      <div className='col-span-5'>
       <CustomSelect
        options={reasonDropDown?.reason}
        name={`CLM_STATUS_CODE`}
        placeholder={'select'}
        showSearch={false}
        value={values?.CLM_STATUS_CODE || undefined}
        onChange={e => {
         handleOnChange(e, 'CLM_STATUS_CODE');
        }}
       />
      </div>
     </div>
    </div>
   )}
   <div className='flex justify-center mt-5'>
    <Button className='app_rej_btn' onClick={() => submit()}>
     Process
    </Button>
   </div>
  </Modal>
 );
};

export default ApproveOrRejectModal;
