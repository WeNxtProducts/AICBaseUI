import { useContext, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { ClaimContext } from '../ModernClaim';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import ApproveOrRejectModal from './ApproveOrRejectModal';
import settleIcon from '../../../assets/Vector.svg';
import { useNavigate } from 'react-router-dom';

const ClaimDetails = () => {
 const navigate = useNavigate();
 const {
  selectedPolicy,
  // setActiveTab,
  formValues,
  id: tranId,
  setSelectedPolDetails,
  selectedPolDetails,
  freeze,
  setFreeze,
  setClaimLevelTotal,
  setTotalSummaryValues,
  setLoader,
 } = useContext(ClaimContext);
 const { CLM_FRZ_YN, CLM_TRAN_ID, CLM_STATUS, CLM_STATUS_CODE } =
  selectedPolDetails;
 const getPolClaimDetails = useApiRequests('getPreClaimDate', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const getClaimFreezeOnDetails = useApiRequests('getPreClaimDate', 'POST');
 const claimLevelDetailUpdate = useApiRequests(
  'claimLevelDetailsUpdate',
  'POST',
 );
 const [approveOrRejectModal, setApproveOrRejectModal] = useState(false);

 const handlePolClaimDetails = async () => {
  // setLoader(true);
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
    if (response?.Data[0]?.CLM_FRZ_YN === 'Y') {
     handleClaimFreezeOnDetails(true, response?.Data[0]?.CLM_TRAN_ID);
    }
    setLoader(false);
   }
  } catch (err) {
   showNotification.ERROR('Error');
   setLoader(false);
  }
 };

 useEffect(() => {
  if (selectedPolicy) {
   //  setActiveTab(0);
   handlePolClaimDetails();
  }
 }, [selectedPolicy]);

 const getTotalSummary = async () => {
  try {
   const response = await getPolClaimDetails(
    { queryParams: { tranId } },
    { queryId: 125 },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setTotalSummaryValues(response?.Data[0]);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleClose = claim_status => {
  setApproveOrRejectModal(false);
  if (claim_status === 'A') {
   getTotalSummary();
  }
 };

 const handleClaimLevelUpdateDetails = async status => {
  // setLoader(true);
  const queryParams = {
   tranId: CLM_TRAN_ID,
   CLM_STATUS: CLM_STATUS ?? '',
   CLM_STATUS_CODE: CLM_STATUS_CODE ?? '',
   FreezeFlag: CLM_FRZ_YN === 'N' ? 'Y' : 'N',
  };
  try {
   const response = await claimLevelDetailUpdate('', queryParams);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handleFreeze(status);
   }
  } catch (err) {
   setLoader(false);
  }
 };

 const handleClaimFreezeOnDetails = async (status, claim_Id) => {
  const payload = { queryParams: { tranId: claim_Id } };
  try {
   const response = await getClaimFreezeOnDetails(payload, {
    queryId: 126,
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setClaimLevelTotal(response?.Data[0]);
    if (!status) handlePolClaimDetails();
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
    handleClaimFreezeOnDetails(false, CLM_TRAN_ID);
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
       onChange={e => handleClaimLevelUpdateDetails(e.target.checked)}
      />
     </div>
    </div>

    <div className='flex items-center gap-1'>
     <Button
      className='app_rej_reopen_close_btn'
      disabled={!freeze}
      onClick={() => setApproveOrRejectModal(true)}>
      {CLM_STATUS === 'A' || CLM_STATUS === 'R'
       ? 'Re-Open / Close'
       : 'Approve / Reject'}
     </Button>
    </div>

    <div className='flex items-center gap-1'>
     <Button
      className='settlement_btn'
      onClick={() => {
       navigate(
        `/claimSettlement?CLM_POL_NO=${selectedPolicy}&CH_REF_NO=${formValues?.CH_REF_NO}`,
       );
      }}>
      <div className='flex justify-between items-center'>
       <p>Settlement</p>
       <img src={settleIcon} className='settle_icon' />
      </div>
     </Button>
    </div>

    <div className='print_Setup'>
     <span className='printer_font'>Print</span>
     <PrinterOutlined className='printer_icon' />
    </div>
   </div>
   {approveOrRejectModal && (
    <ApproveOrRejectModal
     open={approveOrRejectModal}
     handleClose={handleClose}
     selectedPolDetails={selectedPolDetails}
     setSelectedPolDetails={setSelectedPolDetails}
     setFreeze={setFreeze}
     selectedPolicy={selectedPolicy}
     tranId={tranId}
    />
   )}
  </div>
 );
};

export default ClaimDetails;
