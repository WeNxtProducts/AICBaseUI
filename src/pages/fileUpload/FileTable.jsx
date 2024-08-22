import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeOutlined, SaveOutlined } from '@ant-design/icons';
import { Checkbox, Tooltip } from 'antd';
import { CustomTextArea } from '../../components/commonExportsFields/CommonExportsFields';
import {
 handleFileDownloadOrView,
 readFileAsByteArray,
} from '../../components/mediaHelper/MediaHelper';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';

const FileTable = ({ files, onDelete, handlePostFile, docType, freeze }) => {
 const DMSFileView = useApiRequests('DMSView', 'POST');
 const [selectedRows, setSelectedRows] = useState([]);

 const handleCheckboxChange = (event, file) => {
  const fileId = file?.doc_sys_id;
  if (event?.target?.checked) {
   setSelectedRows(prevSelectedRows => [...prevSelectedRows, fileId]);
  } else {
   setSelectedRows(prevSelectedRows => prevSelectedRows.filter(id => id !== fileId));
  }
 };

 const handleDeleteSingle = async item => {
  const payload = {
   doc_sys_id: [item?.doc_sys_id],
  };
  //   const payload = [{ path: item?.doc_sys_id, doc_sys_id: item?.doc_sys_id }];
  const isDeleted = await onDelete(payload);
 };

 const handleDelete = async () => {
  const payload = {
   doc_sys_id: selectedRows?.reduce((acc, selectedRowPath) => {
    const matchedFile = files.find(
     file => file.doc_sys_id === selectedRowPath && file.dms_status === 'Y',
    );
    if (matchedFile) {
     acc.push(matchedFile.doc_sys_id);
    }
    return acc;
   }, []),
  };
  const isDeleted = await onDelete(payload);
  if (isDeleted) {
   setSelectedRows([]);
  }
 };

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

 const handleViewFile = index => {
  if (Object.prototype.hasOwnProperty.call(files[index], 'byteArray')) {
   handleFileDownloadOrView(files[index]);
  } else {
   handleGetAndView(files[index]);
  }
 };

 const removeBeforeFirstUnderscore = filename => {
  //   const underscoreIndex = filename.indexOf('_');
  //   return underscoreIndex !== -1 ? filename.slice(underscoreIndex + 1) : filename;
  return filename;
 };

 return (
  <div className=''>
   <div className='upload_file_wrapper'>
    <table className='upload-file-table'>
     <thead>
      <tr>
       {!freeze && (
        <th>
         {selectedRows.length === 0 ? null : (
          <Tooltip placement='top' title='Delete Selected'>
           <DeleteOutlined onClick={() => handleDelete()} className='delete-icon' />
          </Tooltip>
         )}
        </th>
       )}
       <th>File Name</th>
       <th>Remarks</th>
       <th>UPDATED BY</th>
       <th>UPDATED DATE</th>
       <th>Action</th>
      </tr>
     </thead>
     <tbody>
      {files?.map((file, index) => {
       if (docType === file?.DocType && file?.dms_status !== 'D') {
        return (
         <tr key={index}>
          {!freeze && (
           <td>
            <Checkbox
             checked={selectedRows.includes(file?.doc_sys_id)}
             onChange={event => handleCheckboxChange(event, file)}
            />
           </td>
          )}
          <td>
           <p className='file_name'>
            {removeBeforeFirstUnderscore(file?.filename)}
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
          <td>PREMIA</td>
          <td>14-MAY-2023</td>
          <td>
           {file?.dms_status === 'N' && (
            <Tooltip placement='top' title='Post'>
             <SaveOutlined className='post-icon' onClick={() => handlePostFile(index)} />
            </Tooltip>
           )}
           <Tooltip placement='top' title='View'>
            <EyeOutlined className='view-icon' onClick={() => handleViewFile(index)} />
           </Tooltip>
           {!freeze && (
            <Tooltip placement='top' title='Delete'>
             <DeleteOutlined className='delete-icon' onClick={() => handleDeleteSingle(file)} />
            </Tooltip>
           )}
           {/* <button onClick={() => onDelete([file.name])}>Delete</button> */}
          </td>
         </tr>
        );
       } else {
        return null;
       }
      })}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default FileTable;
