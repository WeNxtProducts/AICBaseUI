import React from 'react'
import InsuranceTable from '../../../insuranceTable/InsuranceTable'

const ReInsuranceDetails = () => {
    return (
        <div className='reinsurance_details'>
            <p>Re-Insurance Allocation</p>
            <div className='mt-3'>
                <InsuranceTable />
            </div>
        </div>
    )
}

export default ReInsuranceDetails
