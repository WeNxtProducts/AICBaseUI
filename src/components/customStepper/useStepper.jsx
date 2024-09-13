import { useState, useCallback, useEffect } from 'react';

const useStepper = (steppers, index) => {
 const [currentStep, setCurrentStep] = useState(index);
 const [stepperData, setStepperData] = useState(steppers);

 const getNextKey = arr => {
  let lastCompletedIndex = -1;

  for (let i = 0; i < arr.length; i++) {
   if (arr[i].status === 'completed') {
    lastCompletedIndex = i;
   }
  }

  // If last object is completed, return its key
  if (lastCompletedIndex === arr.length - 1) {
   return arr[lastCompletedIndex].key + 1;
  }

  // Return the key of the next object if it exists
  if (lastCompletedIndex + 1 < arr.length) {
   return arr[lastCompletedIndex + 1].key;
  }

  // If no completed status found or it's the only element
  return arr[0].key;
 };

 const updateStatus = (stepper, index) =>
  stepper.map((step, i) => ({
   ...step,
   status: i < index ? 'completed' : i === index ? 'inprogress' : 'todo',
  }));

 useEffect(() => {
  const updatedStepper = updateStatus(steppers, index);
  setStepperData(updatedStepper);
  const findCurrentStep = updatedStepper?.find(item => {
   return item?.status === 'inprogress';
  });
  setCurrentStep(findCurrentStep?.key);
 }, [index]);

 const handleSteps = useCallback(() => {
  setStepperData(prevStepperData => {
   return prevStepperData.map((item, index) => {
    if (index === currentStep) {
     if (item.status !== 'completed' && item.status !== 'inprogress') {
      return { ...item, status: 'todo' };
     }
    } else if (index === currentStep - 1 && currentStep > 0) {
     if (prevStepperData[index].status !== 'completed' && item.status !== 'inprogress') {
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
   const adjustedIndex = index < stepperData.length - 1 ? index + 1 : index;
   //    if (
   //     stepperData[index]?.status === 'completed' ||
   //     stepperData[adjustedIndex]?.status === 'inprogress' ||
   //     stepperData[adjustedIndex]?.status === 'todo'
   //    ) {
   //     setCurrentStep(index);
   //    }
   if (stepperData[index]?.status === 'completed' || stepperData[index]?.status === 'inprogress') {
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
  getNextKey,
 };
};

export default useStepper;
