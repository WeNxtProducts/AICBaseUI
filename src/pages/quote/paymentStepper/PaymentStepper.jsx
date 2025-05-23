import React, { useEffect } from 'react'
import PlanCard from './PlanCard'
import { useSelector, useDispatch } from 'react-redux';
import PaymentSelection from './paymentSelection/PaymentSelection';
import { setPayStepper, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import { ArrowLeftOutlined } from '@ant-design/icons';
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
            <div className="relative grid items-center">
                <div
                    onClick={() => dispatch(setStepperIndex(5))}
                    className="absolute left-0 flex items-center space-x-2 group cursor-pointer">
                    <ArrowLeftOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Back</span>
                </div>
                <p className='head_benefits'>{payStepper === 0 ? 'Premium Calculation' : 'Payment Gateway'} </p>
                <p className='head_benefits sub-head'>Review and make payment for the given premium</p>
            </div>

            {payStepper === 0 && <PlanCard />}
            {payStepper === 1 && <PaymentSelection />}
        </div>
    )
}

export default PaymentStepper