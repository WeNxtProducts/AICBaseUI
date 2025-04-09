import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'antd';
import { readFileAsByteArray, getFileFormat } from '../../mediaHelper/MediaHelper';

const FileUploadEmp = ({ files, setFiles, handleFileUploadStatus }) => {

    const onDrop = useCallback(async acceptedFiles => {
        const filesByteArrays = [];
        for (let file of acceptedFiles) {
            const byteArrayFormatted = await readFileAsByteArray(file);
            filesByteArrays.push({
                filename: file.name,
                byteArray: byteArrayFormatted,
                genType: getFileFormat(file),
            });
        }

        setFiles(prevFiles => {
            const validPrevFiles = Array.isArray(prevFiles) ? prevFiles : [];
            return [...validPrevFiles, ...filesByteArrays];
        });
    }, []);

    const handleDelete = (indexToRemove) => {
        setFiles(files.filter((_, index) => index !== indexToRemove));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/tiff': ['.tiff', '.tif'],
            'text/plain': ['.txt'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'message/rfc822': ['.eml'],
        },
    });

    return (
        <div className="mt-2 emp_file_drop">
            {files?.length === 0 ? (
                <div className="file-drop-zone" {...getRootProps()}>
                    <div className={`inner-drop ${isDragActive ? 'highlight_drop_area' : ''}`}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="drop_area">Drop the files here ...</p>
                        ) : (
                            <div>
                                <p>Click to browse or</p>
                                <p>drag and drop your files</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="file-list">
                    {files.map((file, index) => (
                        <div key={index} className="file-item">
                            <div>
                                <p className="file-name">Name: {file.filename}</p>
                                <p className="file-type">Type: {file.genType}</p>
                            </div>
                            <button type="button" className="delete-button" onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                        </div>
                    ))}
                    <Button htmlType='button' className='upl_btn' onClick={() => handleFileUploadStatus(true)}>Upload</Button>
                </div>
            )}
        </div>
    );
};

export default FileUploadEmp;
