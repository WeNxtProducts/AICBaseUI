import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { Checkbox, Tooltip } from 'antd';
import { CustomTextArea } from '../../components/commonExportsFields/CommonExportsFields';
import {
 handleFileDownloadOrView,
 readFileAsByteArray,
} from '../../components/mediaHelper/MediaHelper';

const FileTable = ({ files, onDelete, handleUpload }) => {
 const [selectedRows, setSelectedRows] = useState([]);
 const [fileData, setFileData] = useState([]);

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

 const handleViewFile = index => {
  handleFileDownloadOrView(files[index]);
 };

 return (
  <div className=''>
   <button
    onClick={() => {
     handleUpload(files);
    }}>
    upload
   </button>
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
       <th>File Name</th>
       <th>Remarks</th>
       {/* <th>DOCUMENT TYPE</th> */}
       <th>UPDATED BY</th>
       <th>UPDATED DATE</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {files.map((file, index) => {
       //    console.log('file : ', file);
       return (
        <tr key={index}>
         <td>
          <Checkbox
           checked={selectedRows.includes(file.name)}
           onChange={event => handleCheckboxChange(event, file)}
          />
         </td>
         <td>
          <p className='file_name'>
           {file?.filename}
           {/* <span
               className='download-link'
               onClick={event => handleDownload(event, file)}>
               Download
              </span> */}
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
         {/* <td>
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
            </td> */}
         <td>PREMIA</td>
         <td>14-MAY-2023</td>
         <td>
          <Tooltip placement='top' title='Post'>
           <SaveOutlined className='post-icon' />
          </Tooltip>
          <Tooltip placement='top' title='View'>
           <EyeOutlined
            className='view-icon'
            onClick={() => handleViewFile(index)}
           />
          </Tooltip>
          <Tooltip placement='top' title='Delete'>
           <DeleteOutlined className='delete-icon' />
          </Tooltip>
          {/* <button onClick={() => onDelete([file.name])}>Delete</button> */}
         </td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default FileTable;
