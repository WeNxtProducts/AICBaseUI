import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FileTable from './FileTable';
import {
 getFileFormat,
 readFileAsByteArray,
} from '../../components/mediaHelper/MediaHelper';
import './FileUpload.scss';

const FileUpload = ({ docType, Tran_Id, group_code, handleUpload }) => {
 const [files, setFiles] = useState([]);

 const onDrop = useCallback(async acceptedFiles => {
  const filesByteArrays = [];
  for (let file of acceptedFiles) {
   const byteArrayFormatted = await readFileAsByteArray(file);
   filesByteArrays.push({
    filename: file.name,
    byteArray: byteArrayFormatted,
    genType: getFileFormat(file),
    module: group_code,
    TranId: Tran_Id,
    DocType: docType,
    replaceFlag: 'N',
    dmsStatus: 'N',
   });
  }
  setFiles(prevFiles => [...prevFiles, ...filesByteArrays]);
 }, []);

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
   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
   ],
   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx',
   ],
   'message/rfc822': ['.eml'],
  },
 });

 const handleDeleteFiles = selectedFiles => {
  setFiles(prevFiles =>
   prevFiles.filter(file => !selectedFiles.includes(file.name)),
  );
 };

 return (
  <div className='file-upload'>
   <div className='file-drop-zone' {...getRootProps()}>
    <div className='inner-drop'>
     <input {...getInputProps()} />
     {isDragActive ? (
      <p>Drop the files here ...</p>
     ) : (
      <div>
       <p>Click to browse or drag and drop your files</p>
       {/* <p>drag and drop your files</p> */}
      </div>
     )}
    </div>
   </div>
   <FileTable
    files={files}
    onDelete={handleDeleteFiles}
    handleUpload={handleUpload}
   />
  </div>
 );
};

export default FileUpload;
