import React, { createContext, useState } from 'react';
import EndorsementSideBar from './endorsementSideBar/EndorsementSideBar';
import EndorsementDetails from './endorsementDetails/EndorsementDetails';

export const PageHandleContext = createContext();

const EndorsementFlow = () => {
 const [selected, setSelected] = useState(4);

 const data = {
  selected,
  setSelected,
 };

 return (
  <PageHandleContext.Provider value={data}>
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
  </PageHandleContext.Provider>
 );
};

export default EndorsementFlow;
