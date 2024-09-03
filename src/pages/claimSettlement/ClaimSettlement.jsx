import React, { createContext, useEffect, useState } from 'react';
import ClaimSettlementHeader from './ClaimSettlementHeader';
import SettlementFromClaim from './SettlementFromClaim';
import ClaimLevelDetails from './ClaimLevelDetails';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import './ClaimSettlement.scss';

export const ClaimSettlementContext = createContext();

const ClaimSettlement = () => {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const CLM_POL_NO = searchParams.get('CLM_POL_NO') || '';
 const CH_REF_NO = searchParams.get('CH_REF_NO') || '';
 const getClaimDetails = useApiRequests('getPreClaimDate', 'POST');
 const [headerDetails, setHeaderDetails] = useState(null);
 const [selectedClaim, setSelectedClaim] = useState(null);

 const handleFromClaim = async queryId => {
  try {
   const response = await getClaimDetails(
    { queryParams: { CH_REF_NO, ...(CLM_POL_NO ? { CLM_POL_NO } : {}) } },
    { queryId },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setHeaderDetails(response?.Data);
    setSelectedClaim(response?.Data[0]);
   }
  } catch (err) {
   showNotification.ERROR('Error');
  }
 };

 useEffect(() => {
  if (CLM_POL_NO) {
   handleFromClaim(139);
  } else if (CH_REF_NO) {
   handleFromClaim(138);
  }
 }, []);

 const data = {
  CLM_POL_NO,
  CH_REF_NO,
  headerDetails,
  selectedClaim,
 };

 return (
  <ClaimSettlementContext.Provider value={data}>
   <div className='claim_settlement'>
    <div className='header_nav flex items-center mt-3'>
     <i
      className='bi bi-arrow-left back_icon'
      onClick={() => navigate('/claims', { replace: true })}
     />
     <p className='pl-2'>Claim Settlement</p>
    </div>
    {CH_REF_NO && headerDetails !== null && (
     <>
      {headerDetails?.length == 1 && <ClaimSettlementHeader />}
      {headerDetails?.length > 1 && <SettlementFromClaim />}
      <ClaimLevelDetails />
     </>
    )}
   </div>
  </ClaimSettlementContext.Provider>
 );
};

export default ClaimSettlement;
