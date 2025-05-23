import React from 'react'
import EmployeeUploadArea from '../../../../components/employeeUpload/EmployeeUploadArea'
import FileUploadedList from '../../../../components/employeeUpload/fileUploadEmp/FileUploadedList'

const EmployeeUpload = ({ children, toggleOptions }) => {
    const files = [
        {
            filename: 'Id.pdf',
            genType: '.pdf'
        },
        {
            filename: 'PAN.png',
            genType: '.png'
        }
    ]
    return (
        <div className='emp_upload'>
            <p className='head_benefits'>Employee Upload</p>
            <p className='head_benefits sub-head'>Upload the list of employees details eligible for insurance</p>
            {children}
            {toggleOptions === 'n' ? (
                <EmployeeUploadArea />
            ) : (
                <FileUploadedList
                    files={files}
                    upload={false}
                />
            )}
        </div>
    )
}

export default EmployeeUpload