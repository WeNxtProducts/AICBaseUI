import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { CustomSelect } from '../../../../components/commonExportsFields/CommonExportsFields';
import { checkListValue } from '../../../../components/tableComponents/sampleData';
import FileUpload from './../../../fileUpload/FileUpload';
import './DetailsTable.scss';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';

const DetailsTable = ({
 tableData = [],
 handleSelect,
 handleBulkFlag,
 //  handleUpload,
 Tran_Id,
 group_code,
}) => {
 const DMSFileUpload = useApiRequests('DMSFileUpload', 'POST');
 const [expandedRows, setExpandedRows] = useState('');

 const scrollToView = id => {
  const panel = document.querySelector(`[data-id='claim-row-expanded-${id}']`);
  if (panel) {
   panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
 };

 const handleUpload = async files => {
  try {
   const response = await DMSFileUpload(files);
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    console.log('response : ', response);
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
