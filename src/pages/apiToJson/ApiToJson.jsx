import React, { useEffect, useState } from 'react';
import TextInputWithSearchIcon from './../../components/customFieldComponents/inputWithSearchIcon/TextInputWithSearchIcon';
import { Pagination, Button } from 'antd';
import TableComponent from './../../components/tableComponents/TableComponent';
import useApiRequests from '../../services/useApiRequests';
import { useSelector } from 'react-redux';
import './ApiToJson.scss';
import ApiToJsonModal from './ApiToJsonModal';
import Loader from '../../components/loader/Loader';
import showNotification from '../../components/notification/Notification';

const ApiToJson = () => {
 const lovToJson = useApiRequests('lovToJson', 'GET');
 const listingAPI = useApiRequests('getListing', 'GET');
 const currentMenuId = useSelector(
  state => state?.tokenAndMenuList?.currentMenuId,
 );
 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [currentData, setCurrentData] = useState({});
 const [loader, setLoader] = useState(false);
 const [current, setCurrent] = useState(1);
 const [count, setCount] = useState(10);
 const limit = 20;

 const handleInputChange = value => {
  console.log('Input value:', value);
 };

 const handleSort = (columnName, sortOrder) => {
  console.log('sortState : ', sortOrder);
 };

 const handleListingApi = async offset => {
  setLoader(true);
  try {
   const response = await listingAPI('', {
    queryId: currentMenuId?.listingQueryId,
    limit,
    offset,
   });
   setCount(response?.count);
   setRowData(response?.Data);
   setColumnData(response?.Heading);
   setLoader(false);
  } catch (err) {
   console.log('err  : ', err);
  }
 };

 useEffect(() => {
  handleListingApi(0);
 }, []);

 const handleLovToJson = async item => {
  setLoader(true);
  const queryParams = {
   screenCode: item?.Program_Code,
   screenName: item?.Screen_Name,
  };
  try {
   const response = await lovToJson('', queryParams);
   if (response?.status == 'SUCCESS')
    showNotification.SUCCESS(response?.status_msg);
   if (response?.Status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   setLoader(false);
  } catch (err) {
   console.log('err  : ', err);
  }
 };

 const handleProcessData = item => {
  if (item?.Service_Name === 'getfield') {
   setCurrentData(item);
   setIsModalOpen(true);
  } else if (item?.Service_Name === 'getLOV') {
   handleLovToJson(item);
  }
 };

 const handleClose = () => {
  setCurrentData({});
  setIsModalOpen(false);
  window.location.reload();
 };

 function calculateOffset(pageNumber, limit = 20) {
  return (pageNumber - 1) * limit;
 }

 const onChange = page => {
  setCurrent(page);
  handleListingApi(calculateOffset(page) + 1);
 };

 return (
  <div className='common-listing-screen api-to-json mt-2'>
   {loader && <Loader />}
   {/* <div class='corner-div'>
    <div className='flex all-actions'>
     <div className='actions'>
      <p className=''>Actions</p>
     </div>
     <div className='action-area'>
      <Button>Back</Button>
      <Button>Save</Button>
      <Button>Print</Button>
     </div>
    </div>
   </div> */}
   <div className='custmer-search flex items-end justify-between'>
    <div className='w-full'>
     <p className='search-title'>API To JSON</p>
     <div className='search-bar mt-2'>
      <TextInputWithSearchIcon
       placeholder='Search'
       onChange={handleInputChange}
      />
     </div>
    </div>
   </div>
   {rowData?.length > 0 && (
    <>
     <div className='listing-table'>
      <TableComponent
       tableColumn={columnData}
       tableData={rowData}
       handleSort={handleSort}
       handleProcessData={handleProcessData}
       process={true}
      />
     </div>
     <div className='float-right mt-4'>
      <Pagination
       size='small'
       showSizeChanger={false}
       onChange={onChange}
       current={current}
       total={count}
       defaultPageSize={limit}
      />
     </div>
    </>
   )}
   {isModalOpen && (
    <ApiToJsonModal
     open={isModalOpen}
     currentData={currentData}
     handleClose={handleClose}
    />
   )}
  </div>
 );
};

export default ApiToJson;
