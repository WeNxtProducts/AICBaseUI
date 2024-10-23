import React, { useState } from 'react';
import { UploadOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { handleFileDownloadOrView, readFileAsByteArray } from '../../mediaHelper/MediaHelper';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../notification/Notification';
import './CustomMediaUpload.scss';

const CustomMediaUpload = ({ imageData }) => {
    const DMSFileUpload = useApiRequests('DMSFileUpload', 'POST');
    const DMSFileDelete = useApiRequests('DMSDelete', 'POST');
    const DMSFileView = useApiRequests('DMSView', 'POST');
    const [fileData, setFileData] = useState(null);

    const handleGetAndView = async item => {
        const payload = [{ path: item?.filepath }];
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
        console.log("fileData : ", fileData)
        try {
            const response = await DMSFileUpload([{ ...fileData, ...imageData }]);
            if (response?.Overall[0]?.status === 'FAILURE')
                showNotification.ERROR(response?.Overall[0]?.status);
            if (response?.Overall[0]?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.Overall[0]?.status_msg);
            }
        } catch (err) {
            showNotification.ERROR('Error uploading files');
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
        }
    };

    const handleDeleteFile = () => {
        setFileData(null);
    };

    const handleViewFile = () => {
        if (fileData) {
            const fileURL = URL.createObjectURL(new Blob([fileData.byteArray]));
            window.open(fileURL, '_blank');
        }
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
                    <span className="file_name">{fileData.filename}</span>
                    <div className="file_actions">
                        <EyeOutlined onClick={handleViewFile} className="icon view_icon" />
                        <DeleteOutlined onClick={handleDeleteFile} className="icon delete_icon" />
                        <button type='button' className="upload_button" onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomMediaUpload;
