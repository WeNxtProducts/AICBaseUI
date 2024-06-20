import React, { useState } from 'react';
import { Tab, Tabs } from '../../../../components/customTabs/Tabs';
import PolicyDetails from './policyDetails/PolicyDetails';
import MRVClaim from './mrvClaim/MRVClaim';
import Checklist from './checklist/Checklist';
import DeductionAndBonus from './deductionAndBonus/DeductionAndBonus';
import ReInsurance from './reInsurance/ReInsurance';

const PolicyTabs = () => {
 const [activeTab, setActiveTab] = useState(0);

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
  <div data-id='claim_tabs'>
   <Tabs activeTab={activeTab} onTabClick={handleTabClick}>
    <Tab label='Policy Details'>
     <PolicyDetails />
    </Tab>
    <Tab label='Charges'>
     <MRVClaim
      queryID='Doc_print_setup'
      root='Claim_Charges'
      mrvGet='getDocPrint'
      screenCode='DOCPRINTSETUP'
      screenName='DOCPRINTSETUP'
      saveRow='saveDocPrint'
      editRow='editDocPrint'
      deleteRow='deleteDocPrint'
     />
    </Tab>
    <Tab label='Ded & Bonus'>
     <DeductionAndBonus />
    </Tab>
    <Tab label='Pay To'>
     <MRVClaim
      queryID='Doc_print_setup'
      root='Claim_Beneficiary'
      mrvGet='getDocPrint'
      screenCode='DOCPRINTSETUP'
      screenName='DOCPRINTSETUP'
      saveRow='saveDocPrint'
      editRow='editDocPrint'
      deleteRow='deleteDocPrint'
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
      queryID='Doc_print_setup'
      root='Claim_CheckList'
      mrvGet='getDocPrint'
      screenCode='DOCPRINTSETUP'
      screenName='DOCPRINTSETUP'
      saveRow='saveDocPrint'
      editRow='editDocPrint'
      deleteRow='deleteDocPrint'
     />
    </Tab>
   </Tabs>
  </div>
 );
};

export default PolicyTabs;
