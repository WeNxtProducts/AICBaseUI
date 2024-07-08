import React, { useState } from 'react';
import { Button } from 'antd';
import Riders from './lifeAssuredModals/Riders';
import MedicalDetails from './lifeAssuredModals/MedicalDetails';

const LifeAssuredActions = () => {
 const [ridersOpen, setRidersOpen] = useState(false);
 const [medicalOpen, setMedicalOpen] = useState(false);

 const handleClose = () => {
  setRidersOpen(false);
  setMedicalOpen(false);
 };

 return (
  <div className='action-buttons'>
   <div className='section-1 flex flex-col items-center'>
    <Button onClick={() => setRidersOpen(true)}>Riders</Button>
    <Button>Family History</Button>
    <Button onClick={() => setMedicalOpen(true)}>Medical details</Button>
   </div>
   {ridersOpen && <Riders open={ridersOpen} handleClose={handleClose} />}
   {medicalOpen && (
    <MedicalDetails open={medicalOpen} handleClose={handleClose} />
   )}
  </div>
 );
};

export default LifeAssuredActions;
