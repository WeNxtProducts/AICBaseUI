import React, { useState } from 'react';
import CustomAccordion from '../../../components/customAccordion/CustomAccordion';
import ActionButtons from './ActionButtons';

const Coverage = ({ fromPremCalc = false }) => {
 const [accordionState, setAccordionState] = useState({
  basicPremium: false,
  riderPremium: false,
  loading: false,
  discount: false,
  charges: false,
 });

 const toggleAccordion = section => {
  setAccordionState(prevState => ({
   ...prevState,
   [section]: !prevState[section],
  }));
 };

 return (
  <div className='coverage_details mt-4 p-3'>
   <p>coverage</p>
   <div className='grid grid-cols-12 gap-1 mt-2'>
    <div
     className={`col-span-${fromPremCalc ? 10 : 10} mr-2 accordion_conatiner`}>
     <CustomAccordion
      title='Basic Premium'
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
      isOpen={accordionState.basicPremium}
      toggleAccordion={() => toggleAccordion('basicPremium')}
     />
     <CustomAccordion
      title='Rider Premium'
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
      isOpen={accordionState.riderPremium}
      toggleAccordion={() => toggleAccordion('riderPremium')}
     />
     <CustomAccordion
      title='Loading'
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
      isOpen={accordionState.loading}
      toggleAccordion={() => toggleAccordion('loading')}
     />
     <CustomAccordion
      title='Discount'
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
      isOpen={accordionState.discount}
      toggleAccordion={() => toggleAccordion('discount')}
     />
     <CustomAccordion
      title='Charges'
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
      isOpen={accordionState.charges}
      toggleAccordion={() => toggleAccordion('charges')}
     />
    </div>
    {!fromPremCalc && (
     <div className='col-span-2'>
      <ActionButtons />
     </div>
    )}
   </div>
  </div>
 );
};

export default Coverage;
