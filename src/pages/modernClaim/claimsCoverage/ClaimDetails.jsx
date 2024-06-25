import { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Select } from 'antd';
import { notification_options } from '../../../components/tableComponents/sampleData';
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
 } = useContext(ClaimContext);
 const { CLM_FRZ_YN } = selectedPolDetails;
 const getPolClaimDetails = useApiRequests('getPreClaimDate', 'POST');
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
    console.log('res : ', response?.Data);
    setSelectedPolDetails(response?.Data);
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
       checked={CLM_FRZ_YN === 'N' ? false : CLM_FRZ_YN === 'Y' ? true : false}
      />
     </div>
    </div>

    <div className='flex items-center gap-1'>
     <Button
      className='app_rej_btn'
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
    />
   )}
  </div>
 );
};

export default ClaimDetails;
