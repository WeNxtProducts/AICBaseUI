import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { TextInputWithSearchIcon } from '../../../../../components/commonExportsFields/CommonExportsFields';
import DetailsTable from './DetailsTable';

const ListDetails = ({ listItemData }) => {
 const [rowData, setRowData] = useState([]);
 const [openUpload, setOpenUpload] = useState(false);

 useEffect(() => {
  setRowData(listItemData);
 }, [listItemData]);

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
   {/* <div className='flex items-center'>
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
   </div> */}
   <div className='mt-4'>
    {rowData?.length > 0 && (
     <DetailsTable
      tableData={rowData}
      handleSelect={handleSelect}
      handleUpload={handleUpload}
     />
    )}
   </div>
  </div>
 );
};

export default ListDetails;
