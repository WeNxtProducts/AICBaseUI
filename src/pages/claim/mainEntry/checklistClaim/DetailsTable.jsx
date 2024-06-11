import { UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {
 CustomSelect,
 CustomTextArea,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import FileUpload from '../../../fileUpload/FileUpload';

const DetailsTable = ({
 tableColumn = {},
 tableData = [],
 handleSelect,
 handleUpload,
}) => {
 const [expandedRows, setExpandedRows] = useState('');
 const dropdownOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'Waived', value: 'Waived' },
 ];

 const scrollToView = id => {
  const panel = document.querySelector(`[data-id='claim-row-expanded-${id}']`);
  if (panel) {
   panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
 };

 const handleRowClick = rowId => {
  const currentExpandedRows = expandedRows;
  const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
  const newExpandedRows = isRowCurrentlyExpanded ? [] : [rowId];
  setExpandedRows(newExpandedRows);
  setTimeout(() => {
   scrollToView(rowId);
  }, 200);
 };

 const renderRow = (item, index) => {
  const clickCallback = () => handleRowClick(item.key);

  const itemRows = [
   <tr key={`row-data-${item?.key}`}>
    <td>{item?.Sr_No}</td>
    <td>{item?.ListItem_Description}</td>
    <td>
     <div className='table_textarea'>
      <CustomTextArea
       value={item?.Remarks}
       placeholder={'remarks'}
       onChange={e => {
        handleSelect(index, 'Remarks', e.target.value);
       }}
      />
     </div>
    </td>
    <td>{item?.Mandatory}</td>
    <td>
     <div className='table_lov'>
      <CustomSelect
       options={dropdownOptions}
       placeholder={'select'}
       size='medium'
       showSearch={false}
       value={item?.Received}
       onChange={e => {
        console.log('e : ', e);
        handleSelect(index, 'Received', e);
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
       Upload Docs <UploadOutlined />
      </span>
     </div>
    </td>
   </tr>,
  ];

  if (expandedRows.includes(item.key)) {
   itemRows.push(
    <tr
     data-id={`claim-row-expanded-${item.key}`}
     key={`claim-row-expanded-${item.key}`}>
     <td colSpan='6' className='claim_row_expand'>
      <div className='Upload_documents_claim_checklist mb-3'>
       <FileUpload />
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
   <th>ListItem Description</th>
   <th>Remarks</th>
   <th>Mandatory Y/N</th>
   <th>Received Yes/No</th>
   <th>Upload</th>
  </tr>
 );

 return (
  <div className='status_table rounded-lg'>
   <table className='status_main_table'>
    <thead>{renderColumns()}</thead>
    <tbody>{tableData?.map((item, index) => renderRow(item, index))}</tbody>
   </table>
  </div>
 );
};

export default DetailsTable;
