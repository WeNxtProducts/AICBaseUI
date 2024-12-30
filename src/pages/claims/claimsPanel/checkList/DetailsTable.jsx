import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import {
 CustomSelect,
 CustomTextArea,
} from '../../../../components/commonExportsFields/CommonExportsFields';

const DetailsTable = ({ tableColumn = {}, tableData = [], handleSelect, handleUpload }) => {
 const dropdownOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
  { label: 'Waived', value: 'Waived' },
 ];

 return (
  <div className='status_table rounded-lg'>
   <table className='status_main_table'>
    <thead>
     <tr>
      <th>Sr.No</th>
      <th>ListItem Description</th>
      <th>Remarks</th>
      <th>Mandatory Y/N</th>
      <th>Received Yes/No</th>
      <th>Upload</th>
     </tr>
    </thead>
    <tbody>
     {tableData?.map((item, index) => {
      return (
       <tr key={index}>
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
          <span onClick={() => handleUpload(item)} className='upload-icons'>
           Upload Docs <UploadOutlined />
          </span>
         </div>
        </td>
       </tr>
      );
     })}
    </tbody>
   </table>
  </div>
 );
};

export default DetailsTable;
