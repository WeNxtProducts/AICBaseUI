import React, { createContext, useState } from 'react';
import ClaimsJson from '../../getFormFields/CLAIMENTRY_getFieldList.json';
import ClaimsLOVJson from '../../getFormFields/CLAIMENTRY_getLOVList.json';
import { useSelector } from 'react-redux';
import ClaimSelect from './claimSelect/ClaimSelect';
import './ModernClaim.scss';
import ClaimsCoverage from './claimsCoverage/ClaimsCoverage';

export const ClaimContext = createContext();

const ModernClaim = () => {
 const [dropDown, setDropDown] = useState(ClaimsLOVJson);
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);

 const data = {
  ClaimsJson,
  id,
  ClaimsLOVJson,
  formValues,
  dropDown,
  setDropDown,
 };

 return (
  <ClaimContext.Provider value={data}>
   <div className='modern_claim'>
    <div className='main-screen p-3'>
     <ClaimSelect />
     <ClaimsCoverage />
    </div>
   </div>
  </ClaimContext.Provider>
 );
};

export default ModernClaim;
