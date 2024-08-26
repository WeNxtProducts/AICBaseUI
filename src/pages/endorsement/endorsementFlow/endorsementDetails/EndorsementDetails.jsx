import React, { useContext, useEffect, useState } from 'react';
import PolicyViewCheck from './pageControl/policyViewCheck/PolicyViewCheck';
import Alteration from './pageControl/alteration/Alteration';
import ClaimDetails from './pageControl/claimDetails/ClaimDetails';
import LoanDetails from './pageControl/loanDetails/LoanDetails';
import MaturityDetails from './pageControl/maturityDetails/MaturityDetails';
import { PageHandleContext } from '../EndorsementFlow';

const EndorsementDetails = () => {
 const { selected, setSelected } = useContext(PageHandleContext);
 const [loaded, setLoaded] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false });

 useEffect(() => {
  if (selected === 0) setLoaded(prev => ({ ...prev, 0: true }));
  if (selected === 1) setLoaded(prev => ({ ...prev, 1: true }));
  if (selected === 2) setLoaded(prev => ({ ...prev, 2: true }));
  if (selected === 3) setLoaded(prev => ({ ...prev, 3: true }));
  if (selected === 4) setLoaded(prev => ({ ...prev, 4: true }));
 }, [selected]);

 return (
  <div className='endorsement_details'>
   <div style={{ display: selected === 0 ? 'block' : 'none' }}>
    <PolicyViewCheck currentTab={selected} dataLoaded={loaded['0']} />
   </div>
   <div style={{ display: selected === 1 ? 'block' : 'none' }}>
    <Alteration currentTab={selected} dataLoaded={loaded['1']} />
   </div>

   <div style={{ display: selected === 2 ? 'block' : 'none' }}>
    <ClaimDetails currentTab={selected} dataLoaded={loaded['2']} />
   </div>

   <div style={{ display: selected === 3 ? 'block' : 'none' }}>
    <LoanDetails currentTab={selected} dataLoaded={loaded['3']} />
   </div>

   <div style={{ display: selected === 4 ? 'block' : 'none' }}>
    <MaturityDetails currentTab={selected} dataLoaded={loaded['4']} />
   </div>
  </div>
 );
};

export default EndorsementDetails;
