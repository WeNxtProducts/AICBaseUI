import { useContext, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { ClaimContext } from '../ModernClaim';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import ApproveOrRejectModal from './ApproveOrRejectModal';

const ClaimDetails = () => {
 const {
  selectedPolicy,
  setActiveTab,
  id: tranId,
  setSelectedPolDetails,
  selectedPolDetails,
  freeze,
  setFreeze,
 } = useContext(ClaimContext);
 const { CLM_FRZ_YN, CLM_TRAN_ID } = selectedPolDetails;
 const getPolClaimDetails = useApiRequests('getPreClaimDate', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const getClaimFreezeOnDetails = useApiRequests('getPreClaimDate', 'POST');
 const [approveOrRejectModal, setApproveOrRejectModal] = useState(false);

 const handlePolClaimDetails = async () => {
  try {
   const response = await getPolClaimDetails(
    { queryParams: { tranId, CLM_POL_NO: selectedPolicy } },
    { queryId: 119 },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setSelectedPolDetails(response?.Data);
    setFreeze(response?.Data?.CLM_FRZ_YN === 'Y');
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  if (selectedPolicy) {
   setActiveTab(0);
   handlePolClaimDetails();
  }
 }, [selectedPolicy]);

 const handleClose = () => {
  setApproveOrRejectModal(false);
 };

 const handleClaimFreezeOnDetails = async () => {
  const payload = { queryParams: { tranId: CLM_TRAN_ID } };
  try {
   const response = await getClaimFreezeOnDetails(payload, {
    queryId: 126,
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handlePolClaimDetails();
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleFreeze = async status => {
  const payload = {
   inParams: status
    ? { P_CLM_TRAN_ID: CLM_TRAN_ID }
    : { P_CE_CLM_TRAN_ID: CLM_TRAN_ID },
  };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: status ? 'P_CLM_FRZ_PRCSS' : 'GENERATE_CLM_REVERSE',
    packageName: status ? 'WNPKG_CLAIM' : 'WNPKG_CLAIM_ACCOUNT',
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    console.log('CLM_TRAN_ID');
    handleClaimFreezeOnDetails();
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 return (
  <div className='claim_header p-2 py-3 pe-5'>
   <div className='claim_no'>
    <p>Claim No</p>
    <p>{selectedPolDetails?.CLM_CLAIM_NO}</p>
   </div>
   <div className='summary_header'>
    <div className='flex items-center gap-1'>
     <div className='check_box_label'>Freeze Y/N</div>
     <div>
      <Checkbox
       checked={freeze}
       onChange={e => handleFreeze(e.target.checked)}
      />
     </div>
    </div>

    <div className='flex items-center gap-1'>
     <Button
      className='app_rej_btn'
      disabled={!freeze}
      onClick={() => setApproveOrRejectModal(true)}>
      Approve / Reject
     </Button>
    </div>

    {/* <div className='flex items-center'>
     <div className='check_box_label_select'>Reason to reject</div>
     <Select className='reason_select_box' placeholder='Reason'>
      {notification_options?.map(item => (
       <Select.Option key={item.value} value={item.value}>
        {`${item?.value}${
         item?.value !== item?.label ? ` - ${item?.label}` : ''
        }`}
       </Select.Option>
      ))}
     </Select>
    </div> */}
    <div className='print_Setup'>
     <span className='printer_font'>Print</span>
     <PrinterOutlined className='printer_icon' />
    </div>
   </div>
   {approveOrRejectModal && (
    <ApproveOrRejectModal
     open={approveOrRejectModal}
     handleClose={handleClose}
     CLM_TRAN_ID={CLM_TRAN_ID}
    />
   )}
  </div>
 );
};

export default ClaimDetails;
