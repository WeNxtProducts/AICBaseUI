import { Button, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import TableComponent from '../../../components/tableComponents/TableComponent';
import Loader from '../../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApiRequests from '../../../services/useApiRequests';
import { TextInputWithSearchIcon } from '../../../components/commonExportsFields/CommonExportsFields';
import {
 setCurrentID,
 setFreezeStatus,
} from '../../../globalStore/slices/IdSlices';

const QuotationListing = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const listingAPI = useApiRequests('getListing', 'GET');
 const deleteUser = useApiRequests('deleteUser', 'DELETE');
 const currentMenuId = useSelector(
  state => state?.tokenAndMenuList?.currentMenuId,
 );
 const [sortState, setSortState] = useState({});
 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});
 const [loader, setLoader] = useState(false);
 const [current, setCurrent] = useState(1);
 const [count, setCount] = useState(10);
 const limit = 20;

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

 const handleInputChange = value => {
  console.log('Input value:', value);
 };

 const handleSort = (columnName, sortOrder) => {
  console.log('sortState : ', sortState);
  setSortState({
   columnName,
   sortOrder,
  });
 };

 const handleNavigate = () => {
  dispatch(setCurrentID(''));
  navigate('/productList');
 };

 const handleEdit = item => {
  dispatch(setFreezeStatus(item?.Freeze_Flag === 'Y'));
  dispatch(setCurrentID(item?.ID));
  navigate(`/quotation/${item?.Stepper_Id}`);
 };

 const handleDelete = async item => {
  console.log('delete');
 };

 function calculateOffset(pageNumber, limit = 20) {
  return (pageNumber - 1) * limit;
 }

 const onChange = page => {
  setCurrent(page);
  handleListingApi(calculateOffset(page) + 1);
 };

 return (
  <div className='common-listing-screen mt-2'>
   {loader && <Loader />}
   <div className='custmer-search flex items-end justify-between'>
    <div className='w-full'>
     <p className='search-title'>Proposal List</p>
     <div className='search-bar mt-2'>
      <TextInputWithSearchIcon
       placeholder='Search'
       onChange={handleInputChange}
      />
     </div>
    </div>
    <div>
     <Button
      onClick={() => handleNavigate()}
      className='add-buttons'
      type='primary'
      icon={<i className='bi bi-plus icon-style' />}>
      Add Quotation
     </Button>
    </div>
   </div>
   {rowData?.length > 0 && (
    <>
     <div className='listing-table'>
      <TableComponent
       tableColumn={columnData}
       tableData={rowData}
       handleSort={handleSort}
       handleEdit={handleEdit}
       handleDelete={handleDelete}
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
  </div>
 );
};

export default QuotationListing;
