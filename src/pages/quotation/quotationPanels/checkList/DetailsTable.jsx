import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { CustomSelect } from '../../../../components/commonExportsFields/CommonExportsFields';
import { checkListValue } from '../../../../components/tableComponents/sampleData';
import FileUpload from './../../../fileUpload/FileUpload';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import './DetailsTable.scss';

const DetailsTable = ({
 files,
 setFiles,
 tableData = [],
 handleSelect,
 handleBulkFlag,
 Tran_Id,
 group_code,
 handleGetMediaFiles,
}) => {
 const DMSFileUpload = useApiRequests('DMSFileUpload', 'POST');
 const DMSFileDelete = useApiRequests('DMSDelete', 'POST');
 const [expandedRows, setExpandedRows] = useState('');

 const updateFileKeyAtIndex = (index, newValue) => {
  setFiles(prevFiles => {
   const updatedFiles = [...prevFiles];
   const updatedFile = { ...updatedFiles[index], ...newValue };
   //const { byteArray, ...updatedFile } = { ...updatedFiles[index], ...newValue };
   updatedFiles[index] = updatedFile;
   return updatedFiles;
  });
 };

 const handleDelete = async payload => {
  try {
   const response = await DMSFileDelete(payload);
   console.log('response : ', response);
   if (response?.status === 'SUCCESS') {
    handleGetMediaFiles();
    return true;
   } else if (response?.status === 'FAILURE') {
    return false;
   }
  } catch (err) {
   showNotification.ERROR('Error Deleting files');
  }
 };

 const handleUpload = async (files, index) => {
  try {
   const response = await DMSFileUpload(files);
   if (response?.overall[0]?.status === 'FAILURE')
    showNotification.ERROR(response?.overall[0]?.status);
   if (response?.overall[0]?.status === 'SUCCESS') {
    showNotification.SUCCESS(response?.overall[0]?.status_msg);
    updateFileKeyAtIndex(index, response?.overall[0]?.Data);
   }
  } catch (err) {
   showNotification.ERROR('Error uploading files');
  }
 };

 const handleRowClick = rowId => {
  const currentExpandedRows = expandedRows;
  const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
  const newExpandedRows = isRowCurrentlyExpanded ? [] : [rowId];
  setExpandedRows(newExpandedRows);
  setTimeout(() => {
   //    scrollToView(rowId);
  }, 200);
 };

 const renderRow = (item, index) => {
  const clickCallback = () => handleRowClick(item.ID);

  const itemRows = [
   <tr key={`row-data-${item?.DTLS_TRAN_ID}`}>
    <td>{item?.SNO}</td>
    <td>{item?.DESCRPTION}</td>
    <td>{item?.Mandatory_YN}</td>
    <td>
     <div className='table_lov'>
      <CustomSelect
       options={checkListValue}
       placeholder={'select'}
       size='medium'
       showSearch={false}
       value={item?.RECEIVED_STATUS}
       onChange={e => {
        console.log('e : ', e);
        handleSelect(index, 'RECEIVED_STATUS', e, item);
       }}
      />
     </div>
    </td>
    <td>
     <div>
      <span
       onClick={() => {
        clickCallback();
        // handleUpload(item);
       }}
       className='upload-icons'>
       {/* Upload Docs */}
       <CloudUploadOutlined />
       {/* <UploadOutlined /> */}
      </span>
     </div>
    </td>
   </tr>,
  ];

  if (expandedRows.includes(item.ID)) {
   itemRows.push(
    <tr
     className='expanded_row'
     data-id={`claim-row-expanded-${item.DTLS_TRAN_ID}`}
     key={`claim-row-expanded-${item.DTLS_TRAN_ID}`}>
     <td colSpan='6' className='claim_row_expand'>
      <div className='Upload_documents_claim_checklist mb-3'>
       <FileUpload
        docType={item?.DESCRPTION}
        Tran_Id={Tran_Id}
        group_code={group_code}
        handleUpload={handleUpload}
        handleDelete={handleDelete}
        files={files}
        setFiles={setFiles}
       />
      </div>
     </td>
    </tr>,
   );
  }
  return itemRows;
 };

 const renderColumns = () => (
  <tr>
   <th>Sr.No</th>
   <th>List item Description</th>
   {/* <th>Remarks</th> */}
   <th>Mandatory Y/N</th>
   <th>
    <div className='flex items-center justify-center'>
     <span className='me-2'>Status</span>
     <Checkbox onClick={e => handleBulkFlag(e.target.checked)} />
    </div>
   </th>
   <th>Upload</th>
  </tr>
 );

 return (
  <div className='checklist_table rounded-lg'>
   <table className='status_main_table'>
    <thead>{renderColumns()}</thead>
    <tbody>{tableData?.map((item, index) => renderRow(item, index))}</tbody>
   </table>
  </div>
 );
};

export default DetailsTable;
