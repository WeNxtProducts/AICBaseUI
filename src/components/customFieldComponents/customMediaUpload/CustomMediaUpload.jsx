import React, { useEffect, useState } from 'react';
import { UploadOutlined, EyeOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons'; // Import Loading Icon
import { handleFileDownloadOrView, readFileAsByteArray } from '../../mediaHelper/MediaHelper';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../notification/Notification';
import './CustomMediaUpload.scss';

const CustomMediaUpload = ({ imageData }) => {
    const DMSFileUpload = useApiRequests('DMSFileUpload', 'POST');
    const DMSFileDelete = useApiRequests('DMSDelete', 'POST');
    const DMSFileView = useApiRequests('DMSView', 'POST');
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [fileData, setFileData] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getMediaFile = async () => {
        const payload = {
            "queryParams": {
                "tranId": imageData?.TranId,
                "emptranId": "proposal_medical"
            }
        }
        try {
            const response = await getMapQuery(payload);
            console.log('response : ', response);
            if (response?.status === 'SUCCESS') {
                //
            } else if (response?.status === 'FAILURE') {
                return false;
            }
        } catch (err) {
            showNotification.ERROR('Error Fetching documents');
        }
    };

    useEffect(() => {
        getMediaFile()
    }, [imageData])

    const deleteMediaFile = async () => {
        const payload = { doc_sys_id: [fileData?.doc_sys_id] }
        try {
            const response = await DMSFileDelete(payload);
            console.log('response : ', response);
            if (response?.status === 'SUCCESS') {
                setFileData(null);
                setIsUploaded(false);

                return true;
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            showNotification.ERROR('Error Deleting files');
        }
    };

    const handleDelete = () => {
        if (!fileData?.filePath) {
            const fileBlob = new Blob([new Uint8Array(fileData.byteArray)], { type: getMimeType(fileData.genType) });
            const fileURL = URL.createObjectURL(fileBlob);
            window.open(fileURL, '_blank');
        } else if (fileData?.filePath) {
            deleteMediaFile();
        }
    }

    const handleGetAndView = async (item) => {
        console.log("item : ", item);
        const payload = [{ path: item?.filePath }];
        try {
            const response = await DMSFileView(payload);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                const updatedItem = { ...item, byteArray: response?.byteArray[0] };
                handleFileDownloadOrView(updatedItem);
                console.log('handleGetAndView : ', response?.byteArray[0]);
            }
        } catch (err) {
            showNotification.ERROR('Error on Viewing file');
        }
    };

    const handleUpload = async () => {
        console.log("fileData : ", fileData);
        setIsLoading(true);
        try {
            const response = await DMSFileUpload([{ ...fileData, ...imageData }]);
            if (response?.Overall[0]?.status === 'FAILURE') {
                showNotification.ERROR(response?.Overall[0]?.status);
            } else if (response?.Overall[0]?.status === 'SUCCESS') {
                setFileData({ ...response?.Overall[0]?.Data, ...imageData });
                console.log("{...response?.Overall[0]?.Data,...imageData} : ", { ...response?.Overall[0]?.Data, ...imageData });
                showNotification.SUCCESS(response?.Overall[0]?.status_msg);
                setIsUploaded(true);
            }
        } catch (err) {
            showNotification.ERROR('Error uploading files');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const getFileExtension = (mimeType) => {
        const mimeTypeToExtension = {
            'image/png': '.png',
            'image/jpeg': '.jpg',
            'application/pdf': '.pdf',
        };
        return mimeTypeToExtension[mimeType] || '';
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const byteArrayFormatted = await readFileAsByteArray(selectedFile);
            const newFileData = {
                filename: selectedFile.name,
                byteArray: byteArrayFormatted,
                genType: getFileExtension(selectedFile.type),
                replaceFlag: 'N',
            };
            setFileData(newFileData);
            setIsUploaded(false); // Reset the uploaded state when a new file is selected
        }
    };

    const handleDeleteFile = () => {

        handleDelete()
    };

    const handleViewFile = () => {
        if (!fileData?.filePath) {
            const fileBlob = new Blob([new Uint8Array(fileData.byteArray)], { type: getMimeType(fileData.genType) });
            const fileURL = URL.createObjectURL(fileBlob);
            window.open(fileURL, '_blank');
        } else if (fileData?.filePath) {
            handleGetAndView(fileData);
        }
    };

    const getMimeType = (fileExtension) => {
        const extensionToMimeType = {
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.pdf': 'application/pdf',
        };
        return extensionToMimeType[fileExtension] || 'application/octet-stream';
    };

    return (
        <div className='custom_media_upload'>
            {!fileData ? (
                <label className="upload_button">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <UploadOutlined /> Upload File
                </label>
            ) : (
                <div className="file_info">
                    <span className="file_name">{fileData?.filename || fileData?.filePath}</span>
                    <div className="file_actions">
                        <EyeOutlined onClick={handleViewFile} className="icon view_icon" />
                        <DeleteOutlined onClick={handleDeleteFile} className="icon delete_icon" />
                        {!isUploaded && (
                            <button type='button' className="upload_button" onClick={handleUpload} disabled={isLoading}>
                                {isLoading ? <LoadingOutlined spin /> : 'Upload'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomMediaUpload;
