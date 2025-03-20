import React, { useState } from 'react';
import CustomAccordion from '../../../components/customAccordion/CustomAccordion';
import { Checkbox } from 'antd';
import CustomerDetails from './customerDetails/CustomerDetails';
import CustomerAddress from './customerAddress/CustomerAddress';
import NomineeDetails from './nomineeDetails/NomineeDetails';

const Stepper3 = () => {
    const [activeSection, setActiveSection] = useState('customerAddress');

    const toggleAccordion = (section) => {
        setActiveSection((prevSection) =>
            prevSection === section ? null : section
        );
    };

    return (
        <div className='stepper_3'>
            <p className='head_assured_cust'>Assured/Customer Details</p>
            <div>
                <div className='life_assured_check'>
                    <Checkbox className='life_check'>
                        Life Assured is premium payor
                    </Checkbox>
                </div>
                <CustomAccordion
                    title='Customer Details'
                    isOpen={activeSection === 'customerDetails'}
                    toggleAccordion={() => toggleAccordion('customerDetails')}
                >
                    <CustomerDetails />
                </CustomAccordion>
                <CustomAccordion
                    title='Customer Address'
                    isOpen={activeSection === 'customerAddress'}
                    toggleAccordion={() => toggleAccordion('customerAddress')}
                >
                    <CustomerAddress />
                </CustomAccordion>
                <CustomAccordion
                    title='Nominee Details'
                    isOpen={activeSection === 'nomineeDetails'}
                    toggleAccordion={() => toggleAccordion('nomineeDetails')}
                >
                    <NomineeDetails />
                </CustomAccordion>
            </div>
        </div>
    );
};

export default Stepper3;
