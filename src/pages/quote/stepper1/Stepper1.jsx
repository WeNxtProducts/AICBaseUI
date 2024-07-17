import React, { createContext, useState } from 'react';
import BasicInformation from './BasicInformation';
import ListOfBenefits from './listOfBenefits/ListOfBenefits';

export const BenefitDetailsStep = createContext();

const Stepper1 = () => {
 const [stepperInside, setStepperInside] = useState(1);
 const data = { setStepperInside };

 return (
  <BenefitDetailsStep.Provider value={data}>
   <div className='stepper_1 mt-3'>
    {stepperInside === 1 && <BasicInformation />}
    {stepperInside === 2 && <ListOfBenefits />}
   </div>
  </BenefitDetailsStep.Provider>
 );
};

export default Stepper1;
