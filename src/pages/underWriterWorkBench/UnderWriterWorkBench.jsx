import React from 'react';
import './UnderWriterWorkBench.scss';
import PersonalDetailsUnderWriter from './personalDetailsUnderWriter/PersonalDetailsUnderWriter';
import HeaderUnderWriter from './headerUnderWriter/HeaderUnderWriter';
import PremiumDetails from './premiumDetails/PremiumDetails';
import OtherPolicies from './otherPolicies/OtherPolicies';
import Coverage from './coverage/Coverage';
import DecisionBox from './decisionBox/DecisionBox';
import { Button } from 'antd';

const UnderWriterWorkBench = ({
 fromQuotation = false,
 fromPremCalc = false,
 setShowUnderWriter,
 onClose,
}) => {
 return (
  <div className='under-writer-workbench pl-5 pr-5 pt-3 pb-2'>
   {fromQuotation && (
    <div
     onClick={() => setShowUnderWriter(false)}
     className='flex items-center mb-2 back-button-uw-decision'>
     <i className='bi bi-arrow-left-short' />
     <p>Back</p>
    </div>
   )}
   <HeaderUnderWriter />
   <PersonalDetailsUnderWriter />
   <div className='premium_policies mt-4'>
    <PremiumDetails />
    <OtherPolicies />
   </div>
   <Coverage fromPremCalc={fromPremCalc} />
   {!fromPremCalc ? (
    <DecisionBox />
   ) : (
    <div className='close_button'>
     <Button onClick={onClose}>Close</Button>
    </div>
   )}
  </div>
 );
};

export default UnderWriterWorkBench;
