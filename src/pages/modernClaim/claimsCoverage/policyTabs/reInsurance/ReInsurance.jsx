import React, { useContext, useEffect } from 'react';
import RIHeaderDetails from './RIHeaderDetails';
import RITable from './RITable';
import { ClaimContext } from '../../../ModernClaim';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';

const ReInsurance = () => {
 const { selectedPolDetails, selectedPolicy } = useContext(ClaimContext);
 const { CLM_TRAN_ID } = selectedPolDetails;
 const { rowData, columnData, handleMRVListing } = useMRVListing();

 useEffect(() => {
  if (CLM_TRAN_ID) {
   handleMRVListing(118, CLM_TRAN_ID);
  }
 }, []);

 return (
  <div className='re_insurance me-2'>
   <div className='flex items-center'>
    <p className='ri_font'>ReInsurance</p>
   </div>
   <RIHeaderDetails
    claimDetails={selectedPolDetails}
    policyNumber={selectedPolicy}
   />
   {rowData?.length > 0 && (
    <RITable
     rowData={rowData}
     columnData={columnData?.length > 0 ? JSON.parse(columnData) : columnData}
    />
   )}
  </div>
 );
};

export default ReInsurance;
