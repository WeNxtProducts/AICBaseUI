import React from 'react'
import ReInsuranceDetails from './reInsuranceDetails/ReInsuranceDetails'
import RIPremiumAllocation from './riPremiumAllocation/RIPremiumAllocation'

const CoverCodeInsuranceDetais = () => {
    return (
        <div className='cover_code_insurance_detais'>
            <ReInsuranceDetails />
            <div className='mt-5'>
                <RIPremiumAllocation />
            </div>
        </div>
    )
}

export default CoverCodeInsuranceDetais
