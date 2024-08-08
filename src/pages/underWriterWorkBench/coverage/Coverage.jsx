import React, { useState } from 'react';
import CustomAccordion from '../../../components/customAccordion/CustomAccordion';
import ActionButtons from './ActionButtons';
import RidersPremium from './ridersPremium/RidersPremium';

const Coverage = ({ fromPremCalc = false }) => {
 const [accordionState, setAccordionState] = useState({
  basicPremium: false,
  riderPremium: true,
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
      isOpen={accordionState.basicPremium}
      toggleAccordion={() => toggleAccordion('basicPremium')}
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
     />
     <CustomAccordion
      title='Rider Premium'
      isOpen={accordionState.riderPremium}
      toggleAccordion={() => toggleAccordion('riderPremium')}
      content={<RidersPremium />}
     />
     <CustomAccordion
      title='Loading'
      isOpen={accordionState.loading}
      toggleAccordion={() => toggleAccordion('loading')}
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
     />
     <CustomAccordion
      title='Discount'
      isOpen={accordionState.discount}
      toggleAccordion={() => toggleAccordion('discount')}
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
     />
     <CustomAccordion
      title='Charges'
      isOpen={accordionState.charges}
      toggleAccordion={() => toggleAccordion('charges')}
      content={
       <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
       </p>
      }
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
