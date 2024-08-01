import React from 'react';
import ProposalEntryForm from './ProposalEntryForm';

const ProposalEntry = () => {
 return (
  <div data-id='panel-0' className='front-form grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-8'>
    <ProposalEntryForm />
   </div>
  </div>
 );
};

export default ProposalEntry;
