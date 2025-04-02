import React from 'react'
import PayHeadDetails from './PayHeadDetails'
import MethodSelect from './MethodSelect'
import { useSelector, useDispatch } from 'react-redux'
import CardPayment from './CardPayment'
import { setPayStepper } from '../../../../globalStore/slices/QuoteSlice'

const PaymentSelection = () => {
    const dispatch = useDispatch()
    const payMethod = useSelector((state) => state.quote?.payMethod)

    return (
        <div className='PaymentSelection'>
            <PayHeadDetails />
            <div className='pay_methods'>
                <div className='method_select'>
                    <MethodSelect />
                </div>
                <div className='method_details'>
                    {payMethod === 1 && <CardPayment />}
                    {payMethod === 2 && <CardPayment />}
                    {payMethod === 3 && <CardPayment />}
                </div>
                <div className='save_btn_grid'>
                    <button onClick={() => dispatch(setPayStepper(0))}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentSelection