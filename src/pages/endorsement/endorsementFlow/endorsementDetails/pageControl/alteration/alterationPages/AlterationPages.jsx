import React, { useContext } from 'react';
import { EndorsementContext } from '../../../../../Endorsement';

const AlterationPages = () => {
 const { setShowAlteration } = useContext(EndorsementContext);

 return (
  <div className='alterationPages'>
   <button onClick={() => setShowAlteration(false)}>Close</button>
   <p>alterationPagess</p>
  </div>
 );
};

export default AlterationPages;
