import React from 'react'
import CountDispCard from './countDispCard/CountDispCard'
import { Button } from 'antd'

const EmpCountStatistics = ({ handleFileUploadStatus }) => {
    return (
        <div className='emp_count_stats'>
            <div className="cards-container">
                <CountDispCard title="Total Employees Approved" count="7265" />
                <CountDispCard title="Total Employees Rejected" count="1265" />
            </div>
            <div className='mt-7 flex justify-center gap-5'>
                <Button className='upl_btn' onClick={() => handleFileUploadStatus(false)}>Re-Upload</Button>
                <Button className='pro_btn'>Pocess</Button>
            </div>
        </div>
    )
}

export default EmpCountStatistics
