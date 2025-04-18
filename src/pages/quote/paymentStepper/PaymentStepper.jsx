import React, { useEffect } from 'react'
import PlanCard from './PlanCard'
import { useSelector, useDispatch } from 'react-redux';
import PaymentSelection from './paymentSelection/PaymentSelection';
import { setPayStepper } from '../../../globalStore/slices/QuoteSlice';
import './PaymentStepper.scss'

const PaymentStepper = () => {
    const dispatch = useDispatch();
    const payStepper = useSelector((state) => state.quote.payStepper);

    useEffect(() => {
        return (() => {
            dispatch(setPayStepper(0))
        })
    }, [])

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