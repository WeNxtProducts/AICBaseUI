import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import { ClaimContext } from '../ModernClaim';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';

const ClaimTotal = () => {
 const { totalSummaryValues, id: tranId, setTotalSummaryValues } = useContext(ClaimContext);
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const getClaimTotalDetails = useApiRequests('getPreClaimDate', 'POST');
 const [claimValues, setClaimValues] = useState(null);

 useEffect(() => {
  if (totalSummaryValues !== null) {
   setClaimValues(totalSummaryValues);
  }
 }, [totalSummaryValues]);

 useEffect(() => {
  if (tranId) {
   getTotalSummary();
  }
 }, [tranId]);

 const handleTotalClaimProcess = async key => {
  const payload = {
   inParams: { P_CH_TRAN_ID: tranId },
  };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: key,
    packageName: 'WNPKG_CLAIM',
   });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    key === 'P_POPULATE_SETTLE_DATA' && showNotification.SUCCESS(response?.status_msg);
    if (key !== 'P_POPULATE_SETTLE_DATA') handleTotalClaimProcess('P_POPULATE_SETTLE_DATA');
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const inVokeProcedure = () => {
  handleTotalClaimProcess('P_VAL_BEF_SETTLE');
 };

 const getTotalSummary = async () => {
  try {
   const response = await getClaimTotalDetails({ queryParams: { tranId } }, { queryId: 125 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setTotalSummaryValues(response?.Data[0]);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const renderPairs = (key, val) => (
  <div className='col-span-1 grid grid-cols-3 gap-3 items-center'>
   <div className='col-span-1'>
    <p className='key_name'>{key}</p>
   </div>
   <div className='col-span-2'>
    <div className='flex items-center justify-between min-h-8 amount_field_curr'>
     <p>{formatNumber(val)}</p>
    </div>
   </div>
  </div>
 );

 return (
  <div className='mt-5 summary_form'>
   {claimValues !== null && (
    <>
     <p className='header-font pl-1'>Total Summary</p>
     <div className='mt-4 grid grid-cols-2 gap-3'>
      {renderPairs('Gross Estimate Local Currency', claimValues?.CH_GROSS_LC_EST ?? 0)}
      {renderPairs('Total Deduction Local Currency', claimValues?.CH_TOT_LC_DED ?? 0)}
      {renderPairs('Total Charge Amount', claimValues?.CH_TOT_LC_CHRG ?? 0)}
      {renderPairs('Net Payable / Setl Local Currency', claimValues?.CH_NET_LC_EST ?? 0)}
      {renderPairs('Excess Amount', claimValues?.CH_TOT_LC_BON ?? 0)}
     </div>
     {/* <div className='flex justify-center mt-10'>
      <Button onClick={() => inVokeProcedure()} className='pro_btn'>
       Process
      </Button>
     </div> */}
    </>
   )}
  </div>
 );
};

export default ClaimTotal;
