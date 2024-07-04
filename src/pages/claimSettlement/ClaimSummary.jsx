import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import {
 CustomNumberField,
 CustomSelect,
} from '../../components/commonExportsFields/CommonExportsFields';
import dayjs from 'dayjs';
import { settlementStatus } from '../../components/tableComponents/sampleData';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import { ClaimSettlementContext } from './ClaimSettlement';
import { formatNumber } from '../../components/commonHelper/CurrentFormatter';

const ClaimSummary = ({ selectedCover, handleGetCoverList }) => {
 const { selectedClaim } = useContext(ClaimSettlementContext);
 const { CLM_POL_TRAN_ID, CLM_TRAN_ID } = selectedClaim;
 const updateCoverAmount = useApiRequests('updateCoverAmount', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const [coverDetails, setCoverDetails] = useState(null);

 useEffect(() => {
  setCoverDetails(selectedCover);
 }, [selectedCover]);

 const handleSave = async () => {
  const { Foreign_Currency_Amount, Status, ID } = coverDetails;
  const payload = {
   ClaimPaid: {
    formFields: {
     CP_FC_PAID_AMT: Foreign_Currency_Amount,
     CP_APPR_FLAG: Status,
    },
   },
  };
  try {
   const response = await updateCoverAmount(payload, {}, { ID });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handleGetCoverList();
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   showNotification.ERROR('Error');
  }
 };

 const procedureCall = async () => {
  const payload = {
   inParams: {
    P_POLICY_TRAN_ID: CLM_POL_TRAN_ID,
    P_CLAIM_TRAN_ID: CLM_TRAN_ID,
    P_CLM_GEN_YN: 'Y',
    P_CLM_FAC_GEN_YN: 'N',
    M_CLM_COINS_GEN_YN: 'N',
   },
  };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'CLAIM_APPROVAL',
    packageName: 'WNPKG_CLAIM_ACCOUNT',
   });
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    handleGetCoverList();
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   showNotification.ERROR('Error');
  }
 };

 const renderRow = (title, value) => (
  <div className='col-span-1'>
   <div className='flex items-center'>
    <div className='w-4/12'>
     <p className='label-font'>{title}</p>
    </div>
    <div className='w-1/2 ml-4 pl-1 ref_no_box'>
     <p className={`pl-2 ${title === 'LC Amount' ? 'float-right' : ''}`}>
      {title === 'LC Amount' ? formatNumber(value) : value}
     </p>
    </div>
   </div>
  </div>
 );

 const renderInput = (title, value) => (
  <div className='col-span-1'>
   <div className='flex items-center'>
    <div className='w-4/12'>
     <p className='label-font'>{title}</p>
    </div>
    <div className='w-1/2 ml-4'>
     {title === 'Settlement Amount' ? (
      <CustomNumberField
       name='fc_amount'
       placeholder='0'
       value={value}
       readOnly={coverDetails?.Status === 'P'}
       onChange={e => {
        setCoverDetails(pre => ({
         ...pre,
         Foreign_Currency_Amount: e.target.value,
        }));
       }}
      />
     ) : (
      <CustomSelect
       options={settlementStatus}
       name='settlement_status'
       placeholder='select'
       showSearch={false}
       readOnly={coverDetails?.Status === 'P'}
       value={value || undefined}
       onChange={e => {
        setCoverDetails(pre => ({
         ...pre,
         Status: e,
        }));
       }}
      />
     )}
    </div>
   </div>
  </div>
 );

 return (
  <div className='claim_summary px-2 mt-9 mb-10'>
   <div className='grid grid-cols-12 gap-1 mt-2'>
    {coverDetails !== null && (
     <div className='col-span-10 grid grid-cols-2 gap-3'>
      {renderRow('Cover Code', coverDetails?.Cover_Code)}
      {renderRow(
       'Payment Date',
       dayjs(coverDetails?.Payment_Date).format('YYYY-MM-DD'),
      )}
      {renderInput('Settlement Amount', coverDetails?.Foreign_Currency_Amount)}
      {renderRow('LC Amount', coverDetails?.Foreign_Currency_Amount)}
      {renderInput('Settlement Confirmation', coverDetails?.Status)}
     </div>
    )}
    <div className='col-span-2'>
     <div className='action-buttons'>
      <div className='flex flex-col items-center gap-3'>
       <Button
        disabled={coverDetails?.Status === 'P'}
        onClick={() => handleSave()}>
        Save
       </Button>
       <Button
        disabled={coverDetails?.Status === 'P'}
        onClick={() => procedureCall()}>
        Approve
       </Button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimSummary;
