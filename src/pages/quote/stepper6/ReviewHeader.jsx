import React from 'react'
import { useSelector } from 'react-redux'

const ReviewHeader = () => {
    const tranId = useSelector(state => state?.quote?.tranId);
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);

    return (
        <div className='rev_header'>
            <div>
                <p>Product Name</p>
                <p>{prodCode}</p>
            </div>

            <div>
                <p>Quote Number</p>
                <p>{tranId}</p>
            </div>
        </div>
    )
}

export default ReviewHeader