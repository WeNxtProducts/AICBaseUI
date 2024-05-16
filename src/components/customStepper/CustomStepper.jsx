import React, { useState } from 'react';
import './CustomStepper.scss';

const CustomStepper = ({ currentStep, stepperData, handleSkip }) => {
 //  const [currentStep, setCurrentStep] = useState(1);
 //  const [stepperData, setStepperData] = useState([
 //   { key: 0, title: 'Propposal Entry', status: 'completed' },
 //   { key: 1, title: 'Life Assured Details', status: 'inprogress' },
 //   { key: 2, title: 'Beneficiary', status: 'todo' },
 //   { key: 3, title: 'Chrgs/Dis-Load/Cond', status: 'todo' },
 //   { key: 4, title: 'Checklist', status: 'todo' },
 //   { key: 5, title: 'Cmts/Mat/Remindr', status: 'todo' },
 //  ]);

 //  const handleNext = () => {
 //   if (currentStep < stepperData?.length) {
 //    const nextStep = currentStep + 1;
 //    setCurrentStep(nextStep);
 //    setStepperData(prevStepperData => {
 //     return prevStepperData.map((item, index) => {
 //      if (index === currentStep) {
 //       return { ...item, status: 'completed' };
 //      } else if (index === nextStep) {
 //       return {
 //        ...item,
 //        status: item.status === 'completed' ? 'completed' : 'inprogress',
 //       };
 //      } else {
 //       return item;
 //      }
 //     });
 //    });
 //   }
 //  };

 //  const handleNext = () => {
 //   const nextStep = currentStep + 1;
 //   if (nextStep < stepperData.length) {
 //    const updatedStepperData = stepperData.map((item, index) => {
 //     if (index < nextStep) {
 //      return {
 //       ...item,
 //       status: item.status === 'disabled' ? 'disabled' : 'completed',
 //      };
 //     } else if (index === nextStep) {
 //      return {
 //       ...item,
 //       status: item.status === 'completed' ? 'completed' : 'inprogress',
 //      };
 //     } else {
 //      return item;
 //     }
 //    });
 //    setCurrentStep(nextStep);
 //    setStepperData(updatedStepperData);
 //   } else if (nextStep === stepperData.length) {
 //    setStepperData(prevStepperData => {
 //     const lastItemIndex = prevStepperData.length - 1;
 //     return prevStepperData.map((item, index) => ({
 //      ...item,
 //      status: index === lastItemIndex ? 'completed' : item.status,
 //     }));
 //    });
 //    setCurrentStep(nextStep);
 //   }
 //  };

 //  const handleSteps = () => {
 //   if (currentStep > stepperData?.length - 1) {
 //    if (stepperData[currentStep - 1].status !== 'completed')
 //     stepperData[currentStep - 1].status = 'todo';
 //   } else {
 //    if (stepperData[currentStep].status !== 'completed')
 //     stepperData[currentStep].status = 'todo';
 //   }
 //  };

 //  const handleSteps = () => {
 //   setStepperData(prevStepperData => {
 //    return prevStepperData.map((item, index) => {
 //     if (index === currentStep) {
 //      if (item.status !== 'completed') {
 //       return { ...item, status: 'todo' };
 //      }
 //     } else if (index === currentStep - 1 && currentStep > 0) {
 //      if (prevStepperData[index].status !== 'completed') {
 //       return { ...item, status: 'todo' };
 //      }
 //     }
 //     return item;
 //    });
 //   });
 //  };

 //  const handlePrevious = () => {
 //   handleSteps();
 //   const previousStep = currentStep - 1;
 //   if (previousStep >= 0) {
 //    setCurrentStep(previousStep);
 //   }
 //  };

 //  const handleSkip = (item, index) => {
 //   handleSteps();
 //   if (stepperData[index]?.status === 'completed') {
 //    setCurrentStep(index);
 //   }
 //  };

 return (
  <div className='stepper-container'>
   <ul className='step-list'>
    {stepperData.map((item, index) => {
     return (
      <li key={item?.key}>
       <div className='current-stepper'>
        <hr
         className={`divider-progress ${
          currentStep === index
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
          className={currentStep === index ? 'inprogress' : item.status}></div>
         <p className='pl-1'>{item.title}</p>
        </div>
       </div>
      </li>
     );
    })}
   </ul>

   {/* <button className='mt-5' onClick={handleNext}>
    Next
   </button>
   <button onClick={handlePrevious}>Previous</button> */}
  </div>
 );
};

export default CustomStepper;
