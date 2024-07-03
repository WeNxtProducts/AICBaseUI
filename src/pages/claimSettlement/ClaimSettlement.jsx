import React, { createContext } from 'react';
import ClaimSettlementHeader from './ClaimSettlementHeader';
import ClaimSummary from './ClaimSummary';
import claimSettlementJSON from '../../getFormFields/claimSettlement.json';
import ClaimCurrency from './ClaimCurrency';
import PaymentDetails from './PaymentDetails';
import SettlementFromClaim from './SettlementFromClaim';
import ClaimLevelDetails from './ClaimLevelDetails';
import './ClaimSettlement.scss';

export const ClaimSettlementContext = createContext();

const ClaimSettlement = () => {
 const data = {
  claimSettlementJSON,
 };

 return (
  <ClaimSettlementContext.Provider value={data}>
   <div className='claim_settlement'>
    <div className='header_nav flex items-center mt-3'>
     <i className='bi bi-arrow-left back_icon' />
     <p className='pl-2'>Claim Settlement</p>
    </div>
    <SettlementFromClaim />
    {/* <ClaimSettlementHeader /> */}
    <ClaimLevelDetails />
    <ClaimSummary />
    <ClaimCurrency />
    {/* <PaymentDetails /> */}
   </div>
  </ClaimSettlementContext.Provider>
 );
};

export default ClaimSettlement;
