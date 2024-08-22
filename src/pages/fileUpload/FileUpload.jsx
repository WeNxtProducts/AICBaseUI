import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import FileTable from './FileTable';
import { getFileFormat, readFileAsByteArray } from '../../components/mediaHelper/MediaHelper';
import './FileUpload.scss';

const FileUpload = ({
 files,
 setFiles,
 docType,
 Tran_Id,
 group_code,
 handleUpload,
 handleDelete,
 freeze,
}) => {
 const fileData = {
  module: group_code,
  TranId: Tran_Id,
  DocType: docType,
  replaceFlag: 'N',
  dms_status: 'N',
  uploadscrn: 'CHKLIS',
  screenName: 'DMS',
 };
 const onDrop = useCallback(async acceptedFiles => {
  const filesByteArrays = [];
  for (let file of acceptedFiles) {
   const byteArrayFormatted = await readFileAsByteArray(file);
   filesByteArrays.push({
    filename: file.name,
    byteArray: byteArrayFormatted,
    genType: getFileFormat(file),
    ...fileData,
   });
  }

  setFiles(prevFiles => {
   const validPrevFiles = Array.isArray(prevFiles) ? prevFiles : [];
   console.log('[...validPrevFiles, ...filesByteArrays] : ', [
    ...validPrevFiles,
    ...filesByteArrays,
   ]);
   return [...validPrevFiles, ...filesByteArrays];
  });

  //   setFiles(prevFiles => [...prevFiles, ...filesByteArrays]);
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
   'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
   'message/rfc822': ['.eml'],
  },
 });

 const handlePostFile = index => {
  const payload = [files[index]];
  handleUpload(payload, index);
  console.log('handlePostFile : ', payload);
 };

 return (
  <div className='file-upload'>
   {!freeze && (
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
   )}
   {files?.length > 0 && (
    <FileTable
     files={files}
     onDelete={handleDelete}
     handleUpload={handleUpload}
     handlePostFile={handlePostFile}
     docType={docType}
     handleDelete={handleDelete}
     freeze={freeze}
    />
   )}
  </div>
 );
};

export default FileUpload;
