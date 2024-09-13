import React, { useContext, useEffect } from 'react';
import AlterCard from './alterCard/AlterCard';
import { alterData } from '../../../../../../components/tableComponents/sampleData';
import { Button } from 'antd';
import { EndorsementContext } from '../../../../Endorsement';

const Alteration = ({ currentTab, dataLoaded }) => {
 const { setShowAlteration } = useContext(EndorsementContext);
 const rowData = alterData;

 useEffect(() => {
  //   if (dataLoaded) console.log('Alteration ');
 }, [dataLoaded]);

 const handleNavigateToAlterations = () => {
  setShowAlteration(true);
 };

 return (
  <div className='alteration'>
   <div className='mb-5'>
    <Button
     onClick={() => handleNavigateToAlterations()}
     className='add-buttons-edorsement'
     type='primary'
     icon={<i className='bi bi-plus icon-style' />}>
     Add New
    </Button>
   </div>
   <AlterCard rowData={rowData} />
  </div>
 );
};

export default Alteration;
