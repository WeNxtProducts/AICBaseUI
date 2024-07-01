import React, { createContext, useState } from 'react';
import ClaimsJson from '../../getFormFields/CLAIMENTRY_getFieldList_1.json';
import ClaimsLOVJson from '../../getFormFields/CLAIMENTRY_getLOVList_1.json';
import { useSelector } from 'react-redux';
import ClaimSelect from './claimSelect/ClaimSelect';
import ClaimsCoverage from './claimsCoverage/ClaimsCoverage';
import ClaimTotal from './claimTotal/ClaimTotal';
import './ModernClaim.scss';

export const ClaimContext = createContext();

const ModernClaim = () => {
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);
 const [dropDown, setDropDown] = useState(ClaimsLOVJson);
 const [policyList, setPolicyList] = useState([]);
 const [selectedPolicy, setelectedPolicy] = useState('');
 const [activeTab, setActiveTab] = useState(0);
 const [selectedPolDetails, setSelectedPolDetails] = useState({});
 const [freeze, setFreeze] = useState(false);
 const [claimLevelTotal, setClaimLevelTotal] = useState(null);
 const [totalSummaryValues, setTotalSummaryValues] = useState(null);

 const data = {
  ClaimsJson,
  id,
  ClaimsLOVJson,
  formValues,
  dropDown,
  setDropDown,
  setPolicyList,
  policyList,
  selectedPolicy,
  setelectedPolicy,
  activeTab,
  setActiveTab,
  selectedPolDetails,
  setSelectedPolDetails,
  freeze,
  setFreeze,
  claimLevelTotal,
  setClaimLevelTotal,
  totalSummaryValues,
  setTotalSummaryValues,
 };

 return (
  <ClaimContext.Provider value={data}>
   <div className='modern_claim'>
    <div className='main-screen p-3'>
     <ClaimSelect />
     {policyList?.length > 0 && (
      <>
       <ClaimsCoverage />
       <ClaimTotal />
      </>
     )}
    </div>
   </div>
  </ClaimContext.Provider>
 );
};

export default ModernClaim;
