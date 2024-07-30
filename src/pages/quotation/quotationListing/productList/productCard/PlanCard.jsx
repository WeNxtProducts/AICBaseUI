import React from 'react';
import sampImg from '../../../../../assets/term-insurance.png';

const PlanCard = () => {
 return (
  <div className='plan_card'>
   <img src={sampImg} alt={'title'} className='plan_card-image' />
   <div className='plan_card-content'>
    <h3 className='plan_card-title'>{'title'}</h3>
   </div>
  </div>
 );
};

export default PlanCard;
