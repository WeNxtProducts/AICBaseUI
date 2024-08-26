import React, { createContext, useEffect, useState } from 'react';
import EndorsementHeader from './endorsementHeader/EndorsementHeader';
import EndorsemenHistory from './endorsemenHistory/EndorsemenHistory';
import EndorsementFlow from './endorsementFlow/EndorsementFlow';
import './Endorsement.scss';

export const EndorsementContext = createContext();

const Endorsement = () => {
 const [policyDetails, setPolicyDetails] = useState({});

 const data = { policyDetails };

 useEffect(() => {
  const panel = document.querySelector(`[data-id='endorsement_flow']`);
  if (panel) {
   panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
 }, []);

 return (
  <EndorsementContext.Provider value={data}>
   <div className='endorsement mb-5'>
    <div className='main_wrapper'>
     <EndorsementHeader />
     <EndorsemenHistory />
     <EndorsementFlow />
    </div>
   </div>
  </EndorsementContext.Provider>
 );
};

export default Endorsement;
