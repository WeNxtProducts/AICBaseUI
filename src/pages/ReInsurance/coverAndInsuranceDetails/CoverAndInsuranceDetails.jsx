import React from 'react'
import CoverCodeSidbar from './coverCodeSidbar/CoverCodeSidbar'
import CoverCodeInsuranceDetais from './coverCodeInsuranceDetais/CoverCodeInsuranceDetais'

const CoverAndInsuranceDetails = () => {
    return (
        <div className='cover_insurance_details'>
            <div className='grid grid-cols-12 gap-x-1'>
                <div className='col-span-2'>
                    <CoverCodeSidbar />
                </div>
                <div className='col-span-10'>
                    <CoverCodeInsuranceDetais />
                </div>
            </div>
        </div>
    )
}

export default CoverAndInsuranceDetails
