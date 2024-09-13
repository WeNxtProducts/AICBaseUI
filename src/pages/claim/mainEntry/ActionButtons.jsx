import React, { useState } from 'react';
import { Button } from 'antd';
import ClaimCharges from './ClaimCharges';
import ChecklistClaim from './checklistClaim/ChecklistClaim';

const ActionButtons = () => {
 const [openBeneficiary, setOpenBeneficiary] = useState(false);
 const [openChecklist, setOpenChecklist] = useState(true);

 const handleClose = () => {
  setOpenBeneficiary(false);
  setOpenChecklist(false);
 };

 return (
  <div className='action-buttons'>
   <div className='section-1 flex flex-col items-center'>
    <Button onClick={() => setOpenChecklist(true)}>Checklist</Button>
    <Button onClick={() => setOpenBeneficiary(true)}>Beneficiary</Button>
   </div>
   {openBeneficiary && (
    <ClaimCharges
     queryID='Claim_Estimate'
     root='Claim_Beneficiary'
     mrvGet='getClaimEstimate'
     screenCode='CLAIMENTRY'
     screenName='CLAIMENTRY'
     saveRow='saveEstimate'
     editRow='editEstimate'
     deleteRow='deleteEstimate'
     handleCloseModal={handleClose}
     openModal={openBeneficiary}
     title='Beneficiary'
    />
   )}
   {openChecklist && (
    <ChecklistClaim title='Checklist' openModal={openChecklist} handleCloseModal={handleClose} />
   )}
  </div>
 );
};

export default ActionButtons;
