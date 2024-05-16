import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
 const [files, setFiles] = useState([]);

 const onDrop = useCallback(acceptedFiles => {
  setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
 }, []);

 const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  accept:
   'image/jpeg, image/png, image/gif, text/plain, application/pdf, application/msword, application/vnd.ms-excel, message/rfc822, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/tiff',
 });

 const handleDeleteFiles = selectedFiles => {
  setFiles(prevFiles =>
   prevFiles.filter(file => !selectedFiles.includes(file.name)),
  );
 };

 return (
  <div>
   <div
    {...getRootProps()}
    style={{
     border: '2px dashed #cccccc',
     padding: '20px',
     textAlign: 'center',
     cursor: 'pointer',
    }}>
    <input {...getInputProps()} />
    {isDragActive ? (
     <p>Drop the files here ...</p>
    ) : (
     <p>Drag 'n' drop some files here, or click to select files</p>
    )}
   </div>
   <FileTable files={files} onDelete={handleDeleteFiles} />
  </div>
 );
};

const FileTable = ({ files, onDelete }) => {
 const [selectedRows, setSelectedRows] = useState([]);

 const handleCheckboxChange = (event, file) => {
  const fileId = file.name;
  if (event.target.checked) {
   setSelectedRows(prevSelectedRows => [...prevSelectedRows, fileId]);
  } else {
   setSelectedRows(prevSelectedRows =>
    prevSelectedRows.filter(id => id !== fileId),
   );
  }
 };

 const handleDelete = () => {
  onDelete(selectedRows);
  setSelectedRows([]);
 };

 return (
  <div>
   <button onClick={handleDelete} disabled={selectedRows.length === 0}>
    Delete Selected
   </button>
   <table>
    <thead>
     <tr>
      <th>Select</th>
      <th>Download</th>
      <th>File Name</th>
      <th>Delete</th>
     </tr>
    </thead>
    <tbody>
     {files.map((file, index) => (
      <tr key={index}>
       <td>
        <input
         type='checkbox'
         checked={selectedRows.includes(file.name)}
         onChange={event => handleCheckboxChange(event, file)}
        />
       </td>
       <td>
        <a href={URL.createObjectURL(file)} download={file.name}>
         Download
        </a>
       </td>
       <td>{file.name}</td>
       <td>
        <button onClick={() => onDelete([file.name])}>Delete</button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default FileUpload;
