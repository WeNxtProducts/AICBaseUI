import React, { useContext, useEffect, useState } from 'react';
import ClaimStatusTable from './ClaimStatusTable';
import { Button } from 'antd';
import Beneficiary from './claimSummary/Beneficiary';
import TreatyModal from './claimSummary/TreatyModal';
import { ClaimSettlementContext } from './ClaimSettlement';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import ClaimSummary from './ClaimSummary';

const ClaimLevelDetails = () => {
 const { selectedClaim } = useContext(ClaimSettlementContext);
 const getCoverDetails = useApiRequests('getMRVlisting', 'POST');
 const [openBeneficiary, setOpenBeneficiary] = useState(false);
 const [openTreaty, setOpenTreaty] = useState(false);
 const [coverDetailsList, setCoverDetailsList] = useState(null);
 const [selectedCover, setSelectedCover] = useState(null);

 const handleClose = () => {
  setOpenBeneficiary(false);
  setOpenTreaty(false);
 };

 const handleGetCoverList = async () => {
  const queryParams = { queryId: 133, tranId: selectedClaim?.CLM_TRAN_ID };
  try {
   const response = await getCoverDetails('', queryParams);
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    if (selectedCover === null) setSelectedCover(response?.Data[0]);
    setCoverDetailsList(response?.Data);
   }
  } catch (err) {
   showNotification.ERROR('Error');
  }
 };

 useEffect(() => {
  handleGetCoverList();
 }, [selectedClaim]);

 const handleSelectCover = item => {
  setSelectedCover(item);
 };

 return (
  <div className='claim_level_details px-2'>
   <p className='settle_header'>Settlement Details</p>
   <div className='grid grid-cols-12 gap-1 mt-2'>
    <div className='col-span-10'>
     {coverDetailsList?.length > 0 && (
      <ClaimStatusTable
       rowData={coverDetailsList}
       handleSelectCover={handleSelectCover}
       selectedCover={selectedCover}
      />
     )}
    </div>
    <div className='col-span-2'>
     <div className='action-buttons mt-3'>
      <div className='flex flex-col items-center gap-3'>
       <Button onClick={() => setOpenBeneficiary(true)}>Beneficiary</Button>
       <Button onClick={() => setOpenTreaty(true)}>Treaty</Button>
      </div>
     </div>
    </div>
   </div>

   {selectedCover !== null && (
    <ClaimSummary
     selectedCover={selectedCover}
     handleGetCoverList={handleGetCoverList}
    />
   )}
   {/* <ClaimCurrency /> */}

   {openBeneficiary && (
    <Beneficiary
     open={openBeneficiary}
     handleClose={handleClose}
     claimTranId={selectedClaim?.CLM_TRAN_ID}
     coverId={selectedCover?.ID}
    />
   )}
   {openTreaty && (
    <TreatyModal
     open={openTreaty}
     handleClose={handleClose}
     claimTranId={selectedClaim?.CLM_TRAN_ID}
    />
   )}
  </div>
 );
};

export default ClaimLevelDetails;
