import React, { useState } from 'react';
import { Button } from 'antd';
import {
 checklistDetailsColumn,
 checklistDetailsData,
} from '../../../../../components/tableComponents/sampleData';
import { TextInputWithSearchIcon } from '../../../../../components/commonExportsFields/CommonExportsFields';
import DetailsTable from './DetailsTable';

const ListDetails = () => {
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
  <div className='modern_checklist_claim'>
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
   <div className='mt-4'>
    <DetailsTable
     tableColumn={checklistDetailsColumn}
     tableData={rowData}
     handleSelect={handleSelect}
     handleUpload={handleUpload}
    />
   </div>
  </div>
 );
};

export default ListDetails;
