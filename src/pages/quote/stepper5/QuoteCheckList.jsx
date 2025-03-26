/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Tooltip } from 'antd';
import { DeleteOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import {
    readFileAsBase64, getFileFormat,
    handleFileDownloadOrView
} from '../../../components/mediaHelper/mediaHelper64';
import showNotification from '../../../components/notification/Notification';
import useApiRequests from '../../../services/useApiRequests';
import { DeleteKeys } from '../QuoteConstant';

const initialChecklist = [
    { id: 1, description: 'Document 1', filename: '' },
    { id: 2, description: 'Document 2', filename: '' },
];

const fileData = {
    module: 'quote',
    TranId: '1',
    // DocType: 'enquiry',
    replaceFlag: 'N',
    dms_status: 'N',
    uploadscrn: 'checklist-digital',
    screenName: 'DMS',
};

const QuoteCheckList = () => {
    const DMSFileUpload = useApiRequests('DMSFileUpload64', 'POST');
    const DMSFileDelete = useApiRequests('DMSDelete64', 'POST');
    const DMSFileView = useApiRequests('DMSView64', 'POST');
    const [checklist, setChecklist] = useState(initialChecklist);

    const onDrop = useCallback(async (acceptedFiles, rowId) => {
        const file = acceptedFiles[0];
        if (!file) {
            return;
        }
        try {
            const base64String = await readFileAsBase64(file);
            const updatedChecklist = checklist.map((item) => {
                if (item.id === rowId) {
                    return {
                        ...item,
                        filename: file.name,
                        base64String: base64String,
                        DocType: item?.description,
                        genType: getFileFormat(file),
                        param_add1: '',
                        param_add2: '',
                        ...fileData,
                    };
                }
                return item;
            });

            setChecklist(updatedChecklist);
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, [checklist]);


    const createDropzoneOpener = (rowId) => {
        const { getRootProps, getInputProps, open } = useDropzone({
            onDrop: (acceptedFiles) => onDrop(acceptedFiles, rowId),
            noClick: true,
            noKeyboard: true,
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
                'message/rfc822': ['.eml']
            }
        });

        return (
            <div {...getRootProps()} style={{ display: 'none' }}>
                <input {...getInputProps()} />
                <button type="button" onClick={open} id={`open-${rowId}`} style={{ display: 'none' }}>
                    Open File Dialog
                </button>
            </div>
        );
    };

    const handleFileNameClick = (rowId) => {
        document.getElementById(`open-${rowId}`).click();
    };

    useEffect(() => {
        console.log("checklist : ", checklist)
    }, [checklist])

    const updateFileKeyAtIndex = (index, newValue) => {
        setChecklist((prevFiles) => {
            const updatedFiles = [...prevFiles];
            const updatedFile = { ...updatedFiles[index], ...newValue };
            updatedFiles[index] = updatedFile;
            return updatedFiles;
        });
    };

    const handleUpload = async (files, index) => {
        const sendingObj = structuredClone(files)
        delete sendingObj.description;
        delete sendingObj.id;
        const payload = [sendingObj]
        try {
            const response = await DMSFileUpload(payload);
            if (response?.Overall[0]?.status === 'FAILURE')
                showNotification.ERROR('File Not Uploaded!');
            if (response?.Overall[0]?.status === 'SUCCESS') {
                updateFileKeyAtIndex(index, response?.Overall[0]?.Data);
                showNotification.SUCCESS(`${files?.filename} Uploaded Successfully`);
            }
        } catch {
            showNotification.ERROR('File Not Uploaded!');
        }
    }

    const handleGetAndView = async (item) => {
        const payload = [{ path: item?.filePath }];
        try {
            const response = await DMSFileView(payload);
            if (response?.status === 'FAILURE') showNotification.ERROR('File Not Viewed!');
            if (response?.status === 'SUCCESS') {
                const updatedItem = { ...item, base64String: response?.base64Strings[0] };
                handleFileDownloadOrView(updatedItem);
            }
        } catch {
            showNotification.ERROR('File Not Uploaded!');
        }
    };

    const handleViewFile = (index) => {
        if (Object.prototype.hasOwnProperty.call(checklist[index], 'base64String')) {
            handleFileDownloadOrView(checklist[index]);
        } else {
            handleGetAndView(checklist[index]);
        }
    };

    const handleDelete = async (payload, index) => {
        const { doc_sys_id } = payload
        const deleteId = { doc_sys_id: [doc_sys_id] };
        try {
            const response = await DMSFileDelete(deleteId);
            if (response?.status === 'SUCCESS') {
                deleteByIndex(index)
                showNotification.SUCCESS(`${payload?.filename} Deleted Successfully`);
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR('File Not Deleted!');
            }
        } catch {
            showNotification.ERROR('File Not Deleted!');
        }
    };


    const deleteByIndex = (index) => {
        const updatedChecklist = checklist.map((item, idx) => {
            if (idx === index) {
                const newItem = { ...item };
                DeleteKeys.forEach(key => {
                    delete newItem[key];
                });

                return newItem;
            }
            return item;
        });
        setChecklist(updatedChecklist);
    }

    return (
        <div className='quote_checklist'>
            <table className='checklist_table'>
                <thead>
                    <tr>
                        <th>Received (Y/N)</th>
                        <th>Description</th>
                        <th>File Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {checklist.map((item, index) => (
                        <tr key={item.id}>
                            <td>
                                <Checkbox />
                            </td>
                            <td>{item.description}</td>
                            <td
                                className='cursor-pointer'
                                onClick={() => handleFileNameClick(item.id)}>
                                {item.filename ? (
                                    <span>{item.filename}</span>
                                ) : (
                                    <span className='need_to_upload'>Click to Upload</span>
                                )}
                                {createDropzoneOpener(item.id)}
                            </td>
                            <td>
                                <Tooltip placement='top' title='Post'>
                                    <span
                                        onClick={() => {
                                            handleUpload(item, index);
                                        }}
                                        className='icon-wrapper save-icon'>
                                        <SaveOutlined />
                                    </span>
                                </Tooltip>

                                <Tooltip placement='top' title='View'>
                                    <span
                                        onClick={() => handleViewFile(index)}
                                        className='icon-wrapper view-icon'>
                                        <EyeOutlined />
                                    </span>
                                </Tooltip>

                                <Tooltip placement='top' title='Delete'>
                                    <span
                                        // onClick={() => {
                                        //     deleteByIndex(index)
                                        // }}
                                        onClick={() => {
                                            if (item?.doc_sys_id) handleDelete(item, index)
                                            else if (!item?.doc_sys_id) deleteByIndex(index)
                                        }}
                                        className='icon-wrapper delete-icon'>
                                        <DeleteOutlined />
                                    </span>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuoteCheckList;
