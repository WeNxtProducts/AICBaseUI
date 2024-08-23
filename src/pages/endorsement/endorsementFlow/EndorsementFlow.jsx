import React from 'react';
import EndorsementSideBar from './endorsementSideBar/EndorsementSideBar';
import EndorsementDetails from './endorsementDetails/EndorsementDetails';

const EndorsementFlow = () => {
 return (
  <div data-id='endorsement_flow' className='endorsement_flow mt-3'>
   <div className='grid grid-cols-12'>
    <div className='col-span-2'>
     <EndorsementSideBar />
    </div>
    <div className='col-span-10'>
     <EndorsementDetails />
    </div>
   </div>
  </div>
 );
};

export default EndorsementFlow;
