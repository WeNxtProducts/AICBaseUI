import React, { useState } from 'react';
import { TextInputWithSearchIcon } from '../../../../components/commonExportsFields/CommonExportsFields';
import { Button } from 'antd';
import DetailsTable from './DetailsTable';
import {
 checklistDetailsColumn,
 checklistDetailsData,
} from '../../../../components/tableComponents/sampleData';
import UploadDocuments from './UploadDocuments';

const CheckListDetails = () => {
 const [rowData, setRowData] = useState(checklistDetailsData);
 const [openUpload, setOpenUpload] = useState(false);

 const handleSelect = (index, field, value) => {
  setRowData(prevData => {
   const newData = [...prevData];
   newData[index] = { ...newData[index], [field]: value };
   return newData;
  });
 };

 const handleUpload = item => {
  console.log('item : ', item);
  setOpenUpload(true);
 };

 const handleClose = () => {
  setOpenUpload(false);
 };

 return (
  <div className=''>
   <p className='table-header-checklist mb-2'>Checklist Details</p>
   <div className='flex items-center'>
    <Button
     className='filter-button'
     type='primary'
     icon={<i className='bi bi-funnel-fill' />}>
     Filter
    </Button>
    <div className='w-ful text-search'>
     <TextInputWithSearchIcon
      placeholder='Search'
      //onChange={handleInputChange}
     />
    </div>
   </div>
   <div className='mt-2'>
    <DetailsTable
     tableColumn={checklistDetailsColumn}
     tableData={rowData}
     handleSelect={handleSelect}
     handleUpload={handleUpload}
    />
   </div>
   {/* {openUpload && (
    <UploadDocuments open={openUpload} handleClose={handleClose} />
   )} */}
  </div>
 );
};

export default CheckListDetails;
