import { Button } from 'antd'
import React from 'react'

const WithDrawActionButtons = () => {
    return (
        <div className='action-buttons'>
            <div className='section-1 flex flex-col items-center'>
                <Button >Approve</Button>
                <Button >Process</Button>
            </div>
        </div>
    )
}

export default WithDrawActionButtons
