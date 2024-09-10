import React, { useContext, useEffect } from 'react';
import PageHeader from './PageHeader';
import { AlterationContext } from '../AlterationPages';

const ChangePage = () => {
 const { alterationType, selectedAlteration } = useContext(AlterationContext);

 useEffect(() => {
  if (selectedAlteration) {
   console.log('selectedAlteration : ', selectedAlteration);
  }
 }, [selectedAlteration]);

 return (
  <div className='change_page'>
   <PageHeader />
   <div className='mt-3'>
    <p>ChangePage</p>
   </div>
  </div>
 );
};

export default ChangePage;
