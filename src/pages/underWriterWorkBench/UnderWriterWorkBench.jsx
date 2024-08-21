import React, { createContext, useEffect, useState } from 'react';
import PersonalDetailsUnderWriter from './personalDetailsUnderWriter/PersonalDetailsUnderWriter';
import HeaderUnderWriter from './headerUnderWriter/HeaderUnderWriter';
import PremiumDetails from './premiumDetails/PremiumDetails';
import OtherPolicies from './otherPolicies/OtherPolicies';
import Coverage from './coverage/Coverage';
import DecisionBox from './decisionBox/DecisionBox';
import { Button } from 'antd';
import HistorySlider from '../../components/historySlider/HistorySlider';
import { historyitems } from '../../components/tableComponents/sampleData';
import './UnderWriterWorkBench.scss';
import DecisionDetails from './decisionBox/DecisionDetails';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';

export const UWContext = createContext();

const UnderWriterWorkBench = ({
 fromQuotation = false,
 fromPremCalc = false,
 setShowUnderWriter,
 onClose,
 Id,
 POL_NO,
 CustCode,
}) => {
 const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
 const [proposalList, setProposalList] = useState([]);
 const [policyNumber, setPolicyNumber] = useState('');
 const [tranId, setTranId] = useState('');
 const [policyDetails, setPolicyDetails] = useState(null);

 const handleGetProposalList = async () => {
  try {
   const response = await getMapQuery({ queryParams: { CUST_CODE: CustCode } }, { queryId: 164 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    const findPol = response?.Data?.find(item => {
     return item?.Policy_Number === POL_NO;
    });
    if (findPol) {
     setProposalList(response?.Data);
     setPolicyNumber(findPol?.Policy_Number);
     setTranId(findPol?.ID);
    }
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  handleGetProposalList();
 }, []);

 const handlePersonalDetails = async () => {
  try {
   const response = await getMapQuery({ queryParams: { POL_NO: policyNumber } }, { queryId: 162 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setPolicyDetails(response?.Data[0]);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  if (policyNumber && tranId) handlePersonalDetails();
 }, [policyNumber]);

 const data = {
  tranId,
  POL_NO,
  policyNumber,
  proposalList,
  setPolicyNumber,
  setTranId,
  policyDetails,
 };

 return (
  <UWContext.Provider value={data}>
   {proposalList?.length > 0 && (
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
     <div className='historyBox grid grid-cols-12 mt-5'>
      <div className='col-span-2 title'>Policy Status</div>
      <div className='historySlider col-span-10'>
       <HistorySlider items={historyitems} />
      </div>
     </div>
     {policyDetails !== null && <PersonalDetailsUnderWriter />}
     <div className='premium_policies mt-4'>
      {policyDetails !== null && <PremiumDetails />}
      <OtherPolicies />
     </div>
     {policyDetails !== null && <Coverage fromPremCalc={fromPremCalc} />}

     {!fromPremCalc ? (
      // <DecisionBox />
      <DecisionDetails />
     ) : (
      <div className='close_button'>
       <Button onClick={onClose}>Close</Button>
      </div>
     )}
    </div>
   )}
  </UWContext.Provider>
 );
};

export default UnderWriterWorkBench;
