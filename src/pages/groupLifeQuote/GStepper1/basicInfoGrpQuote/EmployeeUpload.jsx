import React from 'react'
import EmployeeUploadArea from '../../../../components/employeeUpload/EmployeeUploadArea'

const EmployeeUpload = () => {
    return (
        <div className='emp_upload'>
            <p className='head_benefits'>Employee Upload</p>
            <p className='head_benefits sub-head'>Upload the list of employees details eligible for insurance</p>
            <EmployeeUploadArea />
        </div>
    )
}

export default EmployeeUpload