import React, { useState } from 'react'
import EmpCountProgress from './empCountProgress/EmpCountProgress'
import EmpCountStatistics from './empCountStatistics/EmpCountStatistics'
import FileUploadEmp from './fileUploadEmp/FileUploadEmp'
import './EmployeeUploadArea.scss'

const EmployeeUploadArea = () => {
    const [files, setFiles] = useState([]);
    const [fileUploaded, setFileploaded] = useState(false)

    const handleFileUploadStatus = (status) => {
        setFiles([])
        setFileploaded(status)
    }
    return (
        <div className='count_stats'>
            <div className='count_header flex items-center'>
                {fileUploaded && <p>Total Employees uploaded</p>}
                {fileUploaded &&
                    <div className='progress_bar'>
                        <EmpCountProgress completed={7265} total={9650} />
                    </div>
                }
            </div>
            {fileUploaded ?
                <EmpCountStatistics handleFileUploadStatus={handleFileUploadStatus} />
                :
                <FileUploadEmp files={files} setFiles={setFiles}
                    handleFileUploadStatus={handleFileUploadStatus} />
            }

        </div>
    )
}

export default EmployeeUploadArea
