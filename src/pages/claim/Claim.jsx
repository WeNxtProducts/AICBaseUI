import React, { createContext, useState } from 'react';
import MainEntry from './mainEntry/MainEntry';
import SlidingCards from '../slidingCards/SlidingCards';
import ClaimsJson from '../../getFormFields/CLAIMENTRY_getFieldList.json';
import ClaimsLOVJson from '../../getFormFields/CLAIMENTRY_getLOVList.json';
import { useSelector } from 'react-redux';
import './Claim.scss';

export const ClaimContext = createContext();

const Claim = () => {
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
   <div className='claims quotation claim'>
    <div className='main-screen'>
     <MainEntry />
     {/* <SlidingCards /> */}
    </div>
   </div>
  </ClaimContext.Provider>
 );
};

export default Claim;
