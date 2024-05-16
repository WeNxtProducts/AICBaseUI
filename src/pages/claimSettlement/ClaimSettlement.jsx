import React, { createContext } from 'react';
import ClaimSettlementHeader from './ClaimSettlementHeader';
import ClaimStatusTable from './ClaimStatusTable';
import './ClaimSettlement.scss';
import ClaimSummary from './claimSummary/ClaimSummary';
import claimSettlementJSON from '../../getFormFields/claimSettlement.json';
import ClaimCurrency from './ClaimCurrency';
import PaymentDetails from './PaymentDetails';

export const ClaimSettlementContext = createContext();

const ClaimSettlement = () => {
 const data = {
  claimSettlementJSON,
 };

 return (
  <ClaimSettlementContext.Provider value={data}>
   <div className='claim_settlement'>
    <div className='header_nav flex items-center'>
     <i class='bi bi-arrow-left back_icon mr-2' />
     <p>Claim Settlement</p>
    </div>

    <ClaimSettlementHeader />
    <ClaimStatusTable />
    <ClaimSummary />
    <ClaimCurrency />
    <PaymentDetails />
   </div>
  </ClaimSettlementContext.Provider>
 );
};

export default ClaimSettlement;
