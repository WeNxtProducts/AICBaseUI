import React, { createContext, useState } from 'react';
import ClaimsJson from '../../getFormFields/CLAIMENTRY_getFieldList.json';
import ClaimsLOVJson from '../../getFormFields/CLAIMENTRY_getLOVList.json';
import { useSelector } from 'react-redux';
import ClaimSelect from './claimSelect/ClaimSelect';
import ClaimsCoverage from './claimsCoverage/ClaimsCoverage';
import ClaimTotal from './claimTotal/ClaimTotal';
import './ModernClaim.scss';

export const ClaimContext = createContext();

const ModernClaim = () => {
 const [dropDown, setDropDown] = useState(ClaimsLOVJson);
 const [policyList, setPolicyList] = useState([
  {
   pol_no: 'P/2981/0192/090/090',
   process: false,
   reject: false,
   reason: '',
  },
  {
   pol_no: 'P/2981/0192/090/091',
   process: false,
   reject: false,
   reason: '',
  },
  {
   pol_no: 'P/2981/0192/090/092',
   process: false,
   reject: false,
   reason: '',
  },
  {
   pol_no: 'P/2981/0192/090/093',
   process: false,
   reject: false,
   reason: '',
  },
  {
   pol_no: 'P/2981/0192/090/094',
   process: false,
   reject: false,
   reason: '',
  },
  {
   pol_no: 'P/2981/0192/090/095',
   process: false,
   reject: false,
   reason: '',
  },
 ]);
 const [selectedPolicy, setelectedPolicy] = useState('PEND2024001');
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);

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
 };

 return (
  <ClaimContext.Provider value={data}>
   <div className='modern_claim'>
    <div className='main-screen p-3'>
     <ClaimSelect />
     {/* {policyList?.length > 0 && ( */}
     <>
      <ClaimsCoverage />
      <ClaimTotal />
     </>
     {/* )} */}
    </div>
   </div>
  </ClaimContext.Provider>
 );
};

export default ModernClaim;
