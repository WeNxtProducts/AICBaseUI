import React, { useContext } from 'react';
import { Tab, Tabs } from '../../../../components/customTabs/Tabs';
import PolicyDetails from './policyDetails/PolicyDetails';
import MRVClaim from './mrvClaim/MRVClaim';
import Checklist from './checklist/Checklist';
import DeductionAndBonus from './deductionAndBonus/DeductionAndBonus';
import ReInsurance from './reInsurance/ReInsurance';
import { ClaimContext } from '../../ModernClaim';

const PolicyTabs = () => {
 const { activeTab, setActiveTab } = useContext(ClaimContext);

 const handleTabClick = index => {
  setActiveTab(index);
  setTimeout(() => scrollToView(), 100);
 };

 const scrollToView = () => {
  const panel = document.querySelector(`[data-id='${'claim_tabs'}']`);
  if (panel) {
   panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
 };
 return (
  <div>
   <Tabs activeTab={activeTab} onTabClick={handleTabClick}>
    <Tab label='Claim Details'>
     {/* <PolicyDetails /> */}
     <MRVClaim
      queryID='ClaimCoverDetailsList'
      root='ClaimCover'
      mrvGet='getClaimCoverDetailsEdit'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='claimCoverCreate'
      editRow='claimCoverUpdate'
      deleteRow='claimCoverDelete'
      title='Claim Cover'
     />
    </Tab>
    <Tab label='Charges'>
     <MRVClaim
      queryID='ClaimChargeDetailsList'
      root='ClaimCharges'
      mrvGet='getClaimChargesDetailsEdit'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='claimChargeCreate'
      editRow='claimChargeUpdate'
      deleteRow='claimChargeDelete'
      title='Claim Charges'
     />
    </Tab>
    <Tab label='Ded & Bonus'>
     <DeductionAndBonus />
    </Tab>
    <Tab label='Pay To'>
     <MRVClaim
      queryID='ClaimPayToDetailsList'
      root='ClaimBeneficiary'
      mrvGet='getClaimPayToDetailsEdit'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='claimBfcryCreate'
      editRow='claimBfcryUpdate'
      deleteRow='claimBfcryDelete'
      title='Pay To'
     />
    </Tab>
    <Tab label='Checklist'>
     <Checklist />
    </Tab>
    <Tab label='RI'>
     <ReInsurance />
    </Tab>
    <Tab label='History'>
     <MRVClaim
      queryID='ClaimHistoryDetailsList'
      root='ClaimHistory'
      mrvGet='getClaimHistoryDetailsEdit'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='saveDocPrint'
      editRow='editDocPrint'
      deleteRow='deleteDocPrint'
      title='History'
      action={false}
      isView={true}
      isEdit={false}
      isDelete={false}
     />
    </Tab>
   </Tabs>
  </div>
 );
};

export default PolicyTabs;
