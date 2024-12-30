import React from 'react'
import MedPolicyDetailForm from './MedPolicyDetailForm'
import MedFeeMRV from './medFeeMRV/MedFeeMRV'
import { Button } from 'antd'

const MedPolicyDetails = () => {
    return (
        <div className='mt-5 med_pol_details'>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <MedPolicyDetailForm />
                </div>
                <div className='col-span-3 mrv_med_section'>
                    <div className='flex items-center justify-center mt-2'>
                        <Button className='freeze_all_btn'>Freeze All</Button>
                    </div>
                    <MedFeeMRV queryId={230} tranId={833} />
                </div>
            </div>
        </div>
    )
}

export default MedPolicyDetails
