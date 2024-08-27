import React, { useContext, useState } from 'react';
import CustomAccordion from './../../../../../../../components/customAccordion/CustomAccordion';
import BasicPremium from '../../../../../../underWriterWorkBench/coverage/basicPremium/BasicPremium';
import MRVData from './MRVData';

const Coverage = () => {
 const tranId = 1,
  policyNumber = 'PEND2024002';

 const [accordionState, setAccordionState] = useState({
  basicPremium: false,
  riderPremium: false,
  loading: false,
  discount: false,
  charges: false,
  brokerAgent: false,
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
    <div className={`col-span-${12} mr-2 accordion_conatiner`}>
     <CustomAccordion
      title='Basic Premium'
      isOpen={accordionState.basicPremium}
      toggleAccordion={() => toggleAccordion('basicPremium')}
      content={<BasicPremium />}
     />
     <CustomAccordion
      title='Rider Premium'
      isOpen={accordionState.riderPremium}
      toggleAccordion={() => toggleAccordion('riderPremium')}
      content={<MRVData queryId={199} tranId={policyNumber} heading='Riders' />}
     />
     <CustomAccordion
      title='Loading'
      isOpen={accordionState.loading}
      toggleAccordion={() => toggleAccordion('loading')}
      content={<MRVData queryId={26} tranId={tranId} heading='Loading' />}
     />
     <CustomAccordion
      title='Discount'
      isOpen={accordionState.discount}
      toggleAccordion={() => toggleAccordion('discount')}
      content={<MRVData queryId={25} tranId={tranId} heading='Discount' />}
     />
     <CustomAccordion
      title='Charges'
      isOpen={accordionState.charges}
      toggleAccordion={() => toggleAccordion('charges')}
      content={<MRVData queryId={148} tranId={tranId} heading='Charges' />}
     />
     <CustomAccordion
      title='BrokerAgent'
      isOpen={accordionState.brokerAgent}
      toggleAccordion={() => toggleAccordion('brokerAgent')}
      content={<MRVData queryId={204} tranId={tranId} heading='Broker/Agent' />}
     />
    </div>
   </div>
  </div>
 );
};

export default Coverage;