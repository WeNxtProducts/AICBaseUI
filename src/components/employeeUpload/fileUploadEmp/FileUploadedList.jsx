import React from 'react'
import { Button } from 'antd'

const FileUploadedList = ({ files, handleDelete, handleFileUploadStatus, upload = true }) => {
    return (
        <div className="file-list-common">
            {files.map((file, index) => (
                <div key={index} className="file-item">
                    <div>
                        <p className="file-name">Name: {file.filename}</p>
                        <p className="file-type">Type: {file.genType}</p>
                    </div>
                    <button type="button" className={upload ? 'delete-button' : 'view-button'} onClick={() => handleDelete(index)}>
                        {upload ? 'Delete' : 'View'}
                    </button>
                </div>
            ))}
            {upload &&
                <Button htmlType='button' className='upl_btn' onClick={() => handleFileUploadStatus(true)}>Upload</Button>
            }
        </div>
    )
}

export default FileUploadedList