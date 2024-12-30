import React, { useContext, useState } from 'react';
import CustomAccordion from './../../../../../../../components/customAccordion/CustomAccordion';
import BasicPremium from './BasicPremium';
import MRVData from './MRVData';
import { EndorsementContext } from '../../../../../Endorsement';

const Coverage = ({ policyNumber, dataLoaded, tranIdPolicy }) => {
    const { POL_NO, tranId } = useContext(EndorsementContext);

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
                        content={<BasicPremium policyNumber={policyNumber} />}
                    />
                    <CustomAccordion
                        title='Rider Premium'
                        isOpen={accordionState.riderPremium}
                        toggleAccordion={() => toggleAccordion('riderPremium')}
                        content={<MRVData queryId={224} tranId={policyNumber} heading='Riders' />}
                    />
                    <CustomAccordion
                        title='Loading'
                        isOpen={accordionState.loading}
                        toggleAccordion={() => toggleAccordion('loading')}
                        content={<MRVData queryId={225} tranId={tranIdPolicy} heading='Loading' />}
                    />
                    <CustomAccordion
                        title='Discount'
                        isOpen={accordionState.discount}
                        toggleAccordion={() => toggleAccordion('discount')}
                        content={<MRVData queryId={226} tranId={tranIdPolicy} heading='Discount' />}
                    />
                    <CustomAccordion
                        title='Charges'
                        isOpen={accordionState.charges}
                        toggleAccordion={() => toggleAccordion('charges')}
                        content={<MRVData queryId={227} tranId={tranIdPolicy} heading='Charges' />}
                    />
                    <CustomAccordion
                        title='BrokerAgent'
                        isOpen={accordionState.brokerAgent}
                        toggleAccordion={() => toggleAccordion('brokerAgent')}
                        content={<MRVData queryId={204} tranId={tranIdPolicy} heading='Broker/Agent' />}
                    />
                </div>
            </div>
        </div>
    );
};

export default Coverage;
