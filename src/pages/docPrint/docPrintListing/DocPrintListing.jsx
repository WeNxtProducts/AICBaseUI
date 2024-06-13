import React, { useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useApiRequests from '../../../services/useApiRequests';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import TableComponent from '../../../components/tableComponents/TableComponent';
import { TextInputWithSearchIcon } from '../../../components/commonExportsFields/CommonExportsFields';
import Loader from '../../../components/loader/Loader';
import showNotification from '../../../components/notification/Notification';
import {
 setCurrentID,
 setFormValues,
} from '../../../globalStore/slices/IdSlices';

const DocPrintListing = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const listingAPI = useApiRequests('getListing', 'GET');
 const currentMenuId = useSelector(
  state => state?.tokenAndMenuList?.currentMenuId,
 );
 const deleteClaim = useApiRequests('deleteDocById', 'POST');
 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});
 const [loader, setLoader] = useState(false);
 const [sortState, setSortState] = useState({});
 const [current, setCurrent] = useState(1);
 const [count, setCount] = useState(10);
 const [deleteConfirmation, setDeleteConfirmation] = useState(false);
 const [deleteId, setDeleteId] = useState(null);
 const limit = 20;

 const handleInputChange = value => {
  console.log('Input value:', value);
 };

 const handleNavigate = () => {
  dispatch(setFormValues(null));
  dispatch(setCurrentID(''));
  navigate('/docPrint');
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

 const handleDeleteConfirm = async () => {
  setLoader(true);
  try {
   const response = await deleteClaim('', {}, { id: deleteId?.ID });
   setDeleteId(null);
   if (response?.Status === 'FAILURE')
    showNotification.ERROR(response?.Message);
   if (response?.Status === 'SUCCESS') {
    handleListingApi(0, 1);
    showNotification.SUCCESS(response?.Message);
   }
   setLoader(false);
  } catch (err) {
   console.log('err  : ', err);
  }
 };

 const handleClose = status => {
  setDeleteConfirmation(false);
  if (status) handleDeleteConfirm();
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
  navigate('/docPrint');
 };

 const handleDelete = async item => {
  setDeleteConfirmation(true);
  setDeleteId(item);
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
     <p className='search-title'>Doc Print List</p>
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
      Add Doc Print
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
   {deleteConfirmation && (
    <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />
   )}
  </div>
 );
};

export default DocPrintListing;
