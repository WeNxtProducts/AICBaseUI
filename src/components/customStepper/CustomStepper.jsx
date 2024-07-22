import React, { useEffect, useState } from 'react';
import './CustomStepper.scss';

const CustomStepper = ({ currentStep, stepperData, handleSkip }) => {
 const [allStepsCompleted, setAllStepsCompleted] = useState(false);

 const handleCompleteStepper = () => {
  const condition = stepperData.every(item => item.status === 'completed');
  setAllStepsCompleted(condition);
 };
 
 useEffect(() => {
  handleCompleteStepper();
 }, [stepperData]);

 return (
  <div className='stepper-container'>
   <ul className='step-list'>
    {stepperData.map((item, index) => {
     return (
      <li key={item?.key}>
       <div className='current-stepper'>
        <hr
         className={`divider-progress ${
          allStepsCompleted
           ? 'all-completed'
           : currentStep === index
           ? 'active-progress'
           : item.status === 'completed'
           ? 'active'
           : ''
         }`}
        />
        <div
         onClick={() => handleSkip(index)}
         className='step-name flex items-center'>
         <div
          className={
           allStepsCompleted
            ? currentStep === index
              ? 'step-completed' //step-completed-progress
              : 'step-completed'
            : currentStep === index
            ? 'inprogress'
            : item.status
          }></div>
         <p className='pl-1'>{item.title}</p>
        </div>
       </div>
      </li>
     );
    })}
   </ul>
  </div>
 );
};

export default CustomStepper;
