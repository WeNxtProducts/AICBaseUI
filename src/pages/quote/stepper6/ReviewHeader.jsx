import React from 'react'
import { useSelector } from 'react-redux'

const ReviewHeader = () => {
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);
    const quotationNo = useSelector(state => state?.quote?.quotationNo);

    return (
        <div className='rev_header'>
            <div>
                <p>Product Name</p>
                <p>{prodCode}</p>
            </div>

            <div>
                <p>Quote Number</p>
                <p>{quotationNo}</p>
            </div>
        </div>
    )
}

export default ReviewHeader