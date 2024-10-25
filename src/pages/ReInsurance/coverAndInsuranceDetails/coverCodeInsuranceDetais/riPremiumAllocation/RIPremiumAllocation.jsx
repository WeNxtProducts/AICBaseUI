import React from 'react'
import InsuranceTable from '../../../insuranceTable/InsuranceTable'

const RIPremiumAllocation = () => {
    return (
        <div className='reinsurance_details'>
            <p>RI Premium Allocation</p>
            <div className='mt-3'>
                <InsuranceTable />
            </div>
        </div>
    )
}

export default RIPremiumAllocation
