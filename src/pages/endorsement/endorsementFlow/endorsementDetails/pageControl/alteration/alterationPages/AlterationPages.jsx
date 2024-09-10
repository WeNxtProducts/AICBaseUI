import React, { useContext, useEffect, useState, createContext } from 'react';
import { EndorsementContext } from '../../../../../Endorsement';
import AlterationType from './alterationType/AlterationType';

export const AlterationContext = createContext();

const AlterationPages = () => {
 const { setShowAlteration, showAlteration } = useContext(EndorsementContext);
 const [alterationType, setAlterationType] = useState('F');
 const [selectedAlteration, setSelectedAlteration] = useState(null);

 useEffect(() => {
  console.log('selectedAlteration : ', selectedAlteration);
 }, [selectedAlteration]);

 const data = {
  alterationType,
  setAlterationType,
  setSelectedAlteration,
 };

 return (
  <AlterationContext.Provider value={data}>
   <div className='alterationPages'>
    <AlterationType />
   </div>
  </AlterationContext.Provider>
 );
};

export default AlterationPages;
