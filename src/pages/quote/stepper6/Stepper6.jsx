import React from 'react'
import ReviewHeader from './ReviewHeader'
import ReviewCustOcc from './ReviewCustOcc'
import { custDetails } from '../QuoteConstant'
import ReviewCustAddress from './ReviewCustAddress'
import ReviewFooter from './ReviewFooter'

const Stepper6 = () => {
    return (
        <div className='Stepper6'>
            <p className='head_review'>Review Application Details</p>
            <div className='review_form'>
                <ReviewHeader />
                <div className='mt-2'>
                    <ReviewCustOcc title='Customer Details' details={custDetails} />
                </div>
                <div className='mt-5'>
                    <ReviewCustAddress title='Customer Details' details={custDetails} />
                </div>
                <div className='mt-5 review_footer'>
                    <ReviewFooter />
                </div>
            </div>
        </div>
    )
}

export default Stepper6