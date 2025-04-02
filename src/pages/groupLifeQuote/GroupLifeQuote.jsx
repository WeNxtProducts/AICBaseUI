import React from 'react'
import { useSelector } from 'react-redux'
import QuoteHeader from '../../components/quoteHeader/QuoteHeader';

const GroupLifeQuote = () => {
    const { prodCode, planCode, tranId, stepperIndex } = useSelector((state) => state.grpQuote);

    return (
        <div className='group-life-quote'>
            <QuoteHeader />
        </div>
    )
}

export default GroupLifeQuote