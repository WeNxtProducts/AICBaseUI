import React, { useContext, useEffect } from 'react';
import PolicyHeaderAndTotal from './PolicyHeaderAndTotal';
import { ClaimContext } from '../../../../ModernClaim';

const PolicySummary = () => {
 const { id: tranId, selectedPolicy } = useContext(ClaimContext);

 useEffect(() => {
  console.log('selectedPolicy : ', selectedPolicy);
 }, [selectedPolicy]);

 return (
  <div className='policy_details'>
   <PolicyHeaderAndTotal />
  </div>
 );
};

export default PolicySummary;
