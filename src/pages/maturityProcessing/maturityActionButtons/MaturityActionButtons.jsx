import React from 'react'
import { Button } from 'antd'

const MaturityActionButtons = () => {
    return (
        <div className='action-buttons'>
            <div className='section-1 flex flex-col items-center'>
                <Button >Approve</Button>
                <Button >Process</Button>
                <Button >Addl Dtls</Button>
            </div>
        </div>
    )
}

export default MaturityActionButtons
