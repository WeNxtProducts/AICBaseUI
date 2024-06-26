import { useState, useCallback, useEffect } from 'react';

const useStepper = steppers => {
 const [currentStep, setCurrentStep] = useState(0);
 const [stepperData, setStepperData] = useState(steppers);

 useEffect(() => {
  const findCurrentStep = steppers?.find(item => {
   return item?.status === 'inprogress';
  });
  setCurrentStep(findCurrentStep?.key);
 }, []);

 const handleSteps = useCallback(() => {
  setStepperData(prevStepperData => {
   return prevStepperData.map((item, index) => {
    if (index === currentStep) {
     if (item.status !== 'completed') {
      return { ...item, status: 'todo' };
     }
    } else if (index === currentStep - 1 && currentStep > 0) {
     if (prevStepperData[index].status !== 'completed') {
      return { ...item, status: 'todo' };
     }
    }
    return item;
   });
  });
 }, [currentStep]);

 const handleNext = useCallback(() => {
  if (currentStep < stepperData.length) {
   const nextStep = currentStep + 1;
   setCurrentStep(nextStep);
   setStepperData(prevStepperData => {
    return prevStepperData.map((item, index) => {
     if (index === currentStep) {
      return { ...item, status: 'completed' };
     } else if (index === nextStep) {
      return {
       ...item,
       status: item.status === 'completed' ? 'completed' : 'inprogress',
      };
     } else {
      return item;
     }
    });
   });
  }
 }, [currentStep, stepperData]);

 const handlePrevious = useCallback(() => {
  handleSteps();
  const previousStep = currentStep - 1;
  if (previousStep >= 0) {
   setCurrentStep(previousStep);
  }
 }, [currentStep, handleSteps]);

 const handleSkip = useCallback(
  index => {
   handleSteps();
   if (stepperData[index]?.status === 'completed') {
    setCurrentStep(index);
   }
  },
  [currentStep, stepperData, handleSteps],
 );

 return {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  setCurrentStep,
 };
};

export default useStepper;
