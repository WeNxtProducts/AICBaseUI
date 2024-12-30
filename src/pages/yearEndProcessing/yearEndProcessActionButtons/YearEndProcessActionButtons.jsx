import { Button } from 'antd'
import React from 'react'

const YearEndProcessActionButtons = () => {
    return (
        <div className='year_end_action_buttons'>
            <div className='action-buttons'>
                <div className='section-1 flex flex-col items-center'>
                    <Button>Process</Button>
                    <Button>Approve</Button>
                    <Button>Policy Detais</Button>
                    {/* <div className='flex flex-col items-center mt-5 w-full'>
                        <Button>Interest Master</Button>
                        <Button>Product Tax Setup</Button>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default YearEndProcessActionButtons
