import React, { useContext, useEffect, useState, createContext } from 'react';
import { EndorsementContext } from '../../../../../Endorsement';
import AlterationType from './alterationType/AlterationType';
import ChangePage from './changePage/ChangePage';

export const AlterationContext = createContext();

// {
//     key: 4,
//     title: 'Cancellation',
//     desc: 'User Can change the Cancel of the policy.',
//     option: false,
// }

const AlterationPages = () => {
 const { setShowAlteration, showAlteration } = useContext(EndorsementContext);
 const [alterationType, setAlterationType] = useState('F');
 const [selectedAlteration, setSelectedAlteration] = useState(null);

 const data = {
  alterationType,
  setAlterationType,
  setSelectedAlteration,
  selectedAlteration,
 };

 return (
  <AlterationContext.Provider value={data}>
   <div className='alterationPages'>
    {selectedAlteration === null ? <AlterationType /> : <ChangePage />}
   </div>
  </AlterationContext.Provider>
 );
};

export default AlterationPages;
