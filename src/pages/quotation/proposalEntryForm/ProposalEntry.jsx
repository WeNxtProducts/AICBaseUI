import React from 'react';
import ProposalEntryForm from './ProposalEntryForm';
import ActionButtons from './actionButtons/ActionButtons';

const ProposalEntry = () => {
 return (
  <div data-id='panel-0' className='front-form grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-7'>
    <ProposalEntryForm />
   </div>
   <div className='col-span-1 mt-3'>
    <ActionButtons />
   </div>
  </div>
 );
};

export default ProposalEntry;
