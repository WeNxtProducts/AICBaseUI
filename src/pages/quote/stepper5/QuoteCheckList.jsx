import React, { useCallback, useEffect, useState, useRef } from 'react';
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
import { useDispatch } from 'react-redux';

const fileData = {
    module: 'quote',
    replaceFlag: 'N',
    dms_status: 'N',
    screenName: 'DMS',
};

const QuoteCheckList = ({ queryId, setLoader, tranId, uploadscrn }) => {
    const dispatch = useDispatch();
    const DMSFileUpload = useApiRequests('DMSFileUpload64', 'POST');
    const DMSFileDelete = useApiRequests('DMSDelete64', 'POST');
    const DMSFileView = useApiRequests('DMSView64', 'POST');
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [checklist, setChecklist] = useState([]);
    // Store the active dropzone ID
    const [activeDropzoneId, setActiveDropzoneId] = useState(null);
    // Create a ref to also store the activeDropzoneId to ensure we always have the latest value
    const activeDropzoneIdRef = useRef(null);

    const handleFetchId = async () => {
        dispatch(setLoader(true));
        try {
            const response = await getMapQuery({ queryId }, { queryId });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                console.log('response', response?.Data)
                setChecklist(response?.Data)
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        handleFetchId()
    }, [])

    // Update the ref whenever activeDropzoneId changes
    useEffect(() => {
        activeDropzoneIdRef.current = activeDropzoneId;
    }, [activeDropzoneId]);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        // Use the ref value to ensure we have the latest activeDropzoneId
        const currentActiveDropzoneId = activeDropzoneIdRef.current;

        if (!file || !currentActiveDropzoneId) {
            return;
        }

        try {
            const base64String = await readFileAsBase64(file);

            setChecklist(prevChecklist => {
                return prevChecklist.map((item) => {
                    if (item.DTL_SR_NO === currentActiveDropzoneId) {
                        return {
                            ...item,
                            filename: file.name,
                            base64String: base64String,
                            DocType: item?.DTL_TODO_LIST_ITEM,
                            genType: getFileFormat(file),
                            uploadscrn,
                            TranId: tranId,
                            param_add1: '',
                            param_add2: '',
                            ...fileData,
                        };
                    }
                    return item;
                });
            });
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, [tranId, uploadscrn]); // Remove activeDropzoneId from dependencies since we're using the ref

    // Use a single dropzone instance
    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop,
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

    const handleFileNameClick = (rowId) => {
        console.log("rowId", rowId);
        // Set the activeDropzoneId in state
        setActiveDropzoneId(rowId);
        // Also set it in the ref for immediate access
        activeDropzoneIdRef.current = rowId;
        // Open the file browser - this needs to happen after we've set the ID
        setTimeout(() => {
            open();
        }, 0);
    };

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
            showNotification.ERROR('File Not Viewed!');
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
        const { doc_sys_id } = payload;
        const deleteId = { doc_sys_id: [doc_sys_id] };
        try {
            const response = await DMSFileDelete(deleteId);
            if (response?.status === 'SUCCESS') {
                deleteByIndex(index);
                showNotification.SUCCESS(`${payload?.filename} Deleted Successfully`);
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR('File Not Deleted!');
            }
        } catch {
            showNotification.ERROR('File Not Deleted!');
        }
    };

    const deleteByIndex = (index) => {
        setChecklist(prevChecklist => {
            return prevChecklist.map((item, idx) => {
                if (idx === index) {
                    const newItem = { ...item };
                    DeleteKeys.forEach(key => {
                        delete newItem[key];
                    });
                    return newItem;
                }
                return item;
            });
        });
    }

    return (
        <div className='quote_checklist'>
            {/* Single dropzone instance */}
            <div {...getRootProps()} style={{ display: 'none' }}>
                <input {...getInputProps()} />
            </div>

            {checklist?.length > 0 &&
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
                            <tr key={item.DTL_SR_NO}>
                                <td>
                                    <Checkbox />
                                </td>
                                <td>{item.DTL_TODO_LIST_ITEM}</td>
                                <td
                                    className='cursor-pointer'
                                    onClick={() => handleFileNameClick(item?.DTL_SR_NO)}>
                                    {item?.filename ? (
                                        <span>{item?.filename}</span>
                                    ) : (
                                        <span className='need_to_upload'>Click to Upload</span>
                                    )}
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
            }
        </div>
    );
};

export default QuoteCheckList;