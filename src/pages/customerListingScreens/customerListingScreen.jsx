import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/tableComponents/TableComponent';
import { Button, Pagination } from 'antd';
import { TextInputWithSearchIcon } from '../../components/commonExportsFields/CommonExportsFields';
import { useNavigate } from 'react-router-dom';
import useApiRequests from '../../services/useApiRequests';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { setCurrentID } from '../../globalStore/slices/IdSlices';

const CustomerListingScreen = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const listingAPI = useApiRequests('getListing', 'GET');
 const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);

 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});
 const [loader, setLoader] = useState(false);
 const [sortState, setSortState] = useState({});
 const [current, setCurrent] = useState(1);
 const [count, setCount] = useState(10);
 const limit = 20;

 const handleInputChange = value => {
  console.log('Input value:', value);
 };

 const handleNavigate = () => {
  dispatch(setCurrentID(''));
  navigate('/customermaster');
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

 const handleSort = (columnName, sortOrder) => {
  console.log('sortState : ', sortState);
  setSortState({
   columnName,
   sortOrder,
  });
 };

 const handleEdit = item => {
  dispatch(setCurrentID(item?.ID));
  navigate('/customermaster');
 };

 const handleDelete = async item => {
  console.log('delete');
 };

 function calculateOffset(pageNumber, limit = 20) {
  return (pageNumber - 1) * limit;
 }

 const onChange = page => {
  setCurrent(page);
  handleListingApi(calculateOffset(page));
 };

 return (
  <div className='common-listing-screen mt-2'>
   {loader && <Loader />}
   <div className='custmer-search flex items-end justify-between'>
    <div className='w-full'>
     <p className='search-title'>Customer List</p>
     <div className='search-bar mt-2'>
      <TextInputWithSearchIcon placeholder='Search' onChange={handleInputChange} />
     </div>
    </div>
    <div>
     <Button
      onClick={() => handleNavigate()}
      className='add-buttons'
      type='primary'
      icon={<i className='bi bi-plus icon-style' />}>
      Add Customer
     </Button>
    </div>
   </div>
   {rowData?.length > 0 && (
    <div className='listing-table'>
     <TableComponent
      tableColumn={columnData}
      tableData={rowData}
      handleSort={handleSort}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
     />
    </div>
   )}
   {rowData?.length > 0 && (
    <div className='float-right mt-4'>
     <Pagination
      size='small'
      showSizeChanger={false}
      current={current}
      onChange={onChange}
      total={count}
      defaultPageSize={limit}
     />
    </div>
   )}
  </div>
 );
};

export default CustomerListingScreen;
