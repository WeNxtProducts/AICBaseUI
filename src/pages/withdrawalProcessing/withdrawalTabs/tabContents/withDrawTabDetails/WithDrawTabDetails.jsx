import React from 'react'
import FormWithDrawal from './formWithDrawal/FormWithDrawal'

const WithDrawTabDetails = () => {
    return (
        <div className='wd_details'>
            <div className='grid grid-cols-12'>
                <div className='col-span-10'>
                    <FormWithDrawal />
                </div>
                <div className='col-span-2'>
                    <button className='with-detais-btn'>Details</button>
                </div>
            </div>
        </div>
    )
}

export default WithDrawTabDetails
