import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Checkbox, Tooltip } from 'antd';
import {
 CustomSelect,
 CustomTextArea,
} from '../../components/commonExportsFields/CommonExportsFields';
import { SaveOutlined } from '@ant-design/icons';
import './FileUpload.scss';

const FileUpload = () => {
 const [files, setFiles] = useState([]);

 const onDrop = useCallback(acceptedFiles => {
  setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
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
       <p>Click to browse or</p>
       <p>drag and drop your files</p>
      </div>
     )}
    </div>
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

 const handleDownload = (event, file) => {
  event.preventDefault();
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name; // Ensures the file is downloaded
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
 };

 return (
  <div className='mt-5'>
   {selectedRows.length > 0 && (
    <button
     className='delete-file mt-1'
     onClick={handleDelete}
     disabled={selectedRows.length === 0}>
     Delete Selected
    </button>
   )}
   <div className='upload_file_wrapper'>
    <table className='upload-file-table'>
     <thead>
      <tr>
       <th></th>
       <th></th>
       <th>Remarks</th>
       <th>DOCUMENT TYPE</th>
       <th>UPDATED BY</th>
       <th>UPDATED DATE</th>
       <th></th>
      </tr>
     </thead>
     <tbody>
      {files.map((file, index) => (
       <tr key={index}>
        <td>
         <Checkbox
          checked={selectedRows.includes(file.name)}
          onChange={event => handleCheckboxChange(event, file)}
         />
        </td>
        <td>
         <p>
          <span
           className='download-link'
           onClick={event => handleDownload(event, file)}>
           Download
          </span>
         </p>
        </td>
        <td>
         <div className='table_textarea'>
          <CustomTextArea
           // value={item?.Remarks}
           placeholder={'remarks'}
           onChange={e => {
            console.log('e.target.value : ', e.target.value);
            //  handleSelect(index, 'Remarks', e.target.value);
           }}
          />
         </div>
        </td>
        <td>
         <div className='table_lov'>
          <CustomSelect
           options={[]}
           placeholder={'select'}
           size='large'
           showSearch={false}
           // value={item?.Received}
           onChange={e => {
            console.log('e : ', e);
            //  handleSelect(index, 'Received', e);
           }}
          />
         </div>
        </td>
        <td>PREMIA</td>
        <td>14-MAY-2023</td>
        <td>
         <Tooltip placement='top' title='Post'>
          <SaveOutlined className='post-icon' />
         </Tooltip>
         {/* <button onClick={() => onDelete([file.name])}>Delete</button> */}
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default FileUpload;
