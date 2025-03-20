import React, { useState } from 'react'
import CustomAccordion from '../../../components/customAccordion/CustomAccordion'
import { Checkbox } from 'antd';

const Stepper3 = () => {
    const [accordionState, setAccordionState] = useState({
        customerDetails: true,
        customerAddress: false,
        nomineeDetails: false,
    });

    const toggleAccordion = section => {
        setAccordionState(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <div className='stepper_3'>
            <p className='head_assured_cust'>Assured/Customer Details</p>
            <div>
                <div className='life_assured_check'>
                    <Checkbox className='life_check'>Life Assured is premium payor</Checkbox>
                </div>
                <CustomAccordion
                    title='Customer Details'
                    isOpen={accordionState.customerDetails}
                    toggleAccordion={() => toggleAccordion('customerDetails')}
                    content={'Customer Details'}
                />
                <CustomAccordion
                    title='Customer Address'
                    isOpen={accordionState.customerAddress}
                    toggleAccordion={() => toggleAccordion('customerAddress')}
                    content={'Customer Address'}
                />
                <CustomAccordion
                    title='Nominee Details'
                    isOpen={accordionState.nomineeDetails}
                    toggleAccordion={() => toggleAccordion('nomineeDetails')}
                    content={'Nominee Details'}
                />
            </div>
        </div>
    )
}

export default Stepper3