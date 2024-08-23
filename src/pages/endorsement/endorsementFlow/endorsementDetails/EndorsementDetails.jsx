import React, { useEffect, useState } from 'react';
import PolicyViewCheck from './pageControl/policyViewCheck/PolicyViewCheck';
import Alteration from './pageControl/alteration/Alteration';
import ClaimDetails from './pageControl/claimDetails/ClaimDetails';
import LoanDetails from './pageControl/loanDetails/LoanDetails';
import MaturityDetails from './pageControl/maturityDetails/MaturityDetails';

const EndorsementDetails = () => {
 const [selected, setSelected] = useState(0);
 const [loaded, setLoaded] = useState({ p: false, a: false, c: false, l: false, m: false });

 useEffect(() => {
  if (selected === 0) setLoaded(prev => ({ ...prev, p: true }));
  if (selected === 1) setLoaded(prev => ({ ...prev, a: true }));
  if (selected === 2) setLoaded(prev => ({ ...prev, c: true }));
  if (selected === 3) setLoaded(prev => ({ ...prev, l: true }));
  if (selected === 4) setLoaded(prev => ({ ...prev, m: true }));
 }, []);

 return (
  <div className='endorsement_details'>
   <button onClick={() => setSelected(selected + 1)}>click +</button>
   <button onClick={() => setSelected(selected - 1)}>click -</button>

   <div style={{ display: selected === 0 ? 'block' : 'none' }}>
    <PolicyViewCheck currentTab={selected} dataLoaded={loaded?.p} />
   </div>
   <div style={{ display: selected === 1 ? 'block' : 'none' }}>
    <Alteration currentTab={selected} dataLoaded={loaded?.a} />
   </div>

   <div style={{ display: selected === 2 ? 'block' : 'none' }}>
    <ClaimDetails currentTab={selected} dataLoaded={loaded?.c} />
   </div>

   <div style={{ display: selected === 3 ? 'block' : 'none' }}>
    <LoanDetails currentTab={selected} dataLoaded={loaded?.l} />
   </div>

   <div style={{ display: selected === 4 ? 'block' : 'none' }}>
    <MaturityDetails currentTab={selected} dataLoaded={loaded?.m} />
   </div>
  </div>
 );
};

export default EndorsementDetails;
