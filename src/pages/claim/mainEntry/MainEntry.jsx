import React from 'react';
import ClaimTypeSelect from './ClaimTypeSelect';

const MainEntry = () => {
 return (
  <div className='front-form grid grid-cols-8 gap-1 p-3'>
   <div className='propasal-entry-form col-span-7'>
    <ClaimTypeSelect />
   </div>
  </div>
 );
};

export default MainEntry;
