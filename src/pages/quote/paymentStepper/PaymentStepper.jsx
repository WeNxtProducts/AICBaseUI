import React from 'react'
import PlanCard from './PlanCard'
import { useSelector } from 'react-redux';
import PaymentSelection from './paymentSelection/PaymentSelection';
import './PaymentStepper.scss'

const PaymentStepper = () => {
    const payStepper = useSelector((state) => state.quote.payStepper);

    return (
        <div className='PaymentStepper'>
            <p className='head_benefits'>{payStepper === 0 ? 'Premium Calculation' : 'Payment Gateway'} </p>
            <p className='head_benefits sub-head'>Review and make payment for the given premium</p>
            {payStepper === 0 && <PlanCard />}
            {payStepper === 1 && <PaymentSelection />}
        </div>
    )
}

export default PaymentStepper