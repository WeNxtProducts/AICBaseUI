import React, { useCallback, useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApiRequests from '../../../services/useApiRequests';
import { useSelector } from 'react-redux';
import showNotification from '../../../components/notification/Notification';
import { debounce } from 'lodash';
import Loader from '../../../components/loader/Loader';
import { TextInputWithSearchIcon } from '../../../components/commonExportsFields/CommonExportsFields';
import TableComponent from './../../../components/tableComponents/TableComponent';
import { setReceiptId } from '../../../globalStore/slices/ReceiptId';
import ConfirmationModal from './../../../components/confirmationModal/ConfirmationModal';
import EmptyTable from '../../../components/emptyTable/EmptyTable';

const ReceiptListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listingAPI = useApiRequests('getListing', 'GET');
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const deleteRceipt = useApiRequests('modernClaimDelete', 'POST');
    const receiptSearch = useApiRequests('receiptSearch', 'POST');
    const [rowData, setRowData] = useState([]);
    const [columnData, setColumnData] = useState({});
    const [loader, setLoader] = useState(false);
    const [sortState, setSortState] = useState({});
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(10);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [search, setSearch] = useState('');
    const limit = 20;

    const handleNavigate = () => {
        dispatch(setReceiptId(''));
        navigate('/receipt');
    };

    const handleListingApi = async (offset, showMsg = false) => {
        setLoader(true);
        try {
            const response = await listingAPI('', {
                queryId: currentMenuId?.listingQueryId,
                limit,
                offset,
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                // showNotification.SUCCESS(response?.status_msg);
                setCount(response?.count);
                setRowData(response?.Data);
                setColumnData(response?.Heading);
            }
            setLoader(false);
        } catch (err) {
            console.log('err  : ', err);
        }
    };

    const handleDeleteConfirm = async () => {
        setLoader(true);
        try {
            const response = await deleteRceipt('', { tranId: deleteId?.ID });
            setDeleteId(null);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                handleListingApi(0);
                showNotification.SUCCESS(response?.status_msg);
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
        handleListingApi(0, true);
    }, []);

    const handleSort = (columnName, sortOrder) => {
        console.log('sortState : ', sortState);
        setSortState({
            columnName,
            sortOrder,
        });
    };

    const handleEdit = item => {
        dispatch(setReceiptId(item?.ID));
        navigate('/receipt');
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
        handleListingApi(calculateOffset(page));
    };

    const handleUsesearch = async (searchTerm, offset, page) => {
        setLoader(true);
        try {
            const response = await receiptSearch({
                searchTerm,
                limit,
                offset,
                queryId: currentMenuId?.listingQueryId,
            });
            if (response?.status === "SUCCESS") {
                setCurrent(page);
                setCount(response?.count);
                setRowData(response?.Data);
            } else if (response?.status === "FAILURE") {
                handleListingApi(0);
                showNotification.ERROR(response?.status_msg)
            }
            setLoader(false);
        } catch (err) {
            showNotification.ERROR('Something went Wrong!!!')
            setLoader(false);
        }
    };

    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            if (searchTerm?.length > 0) handleUsesearch(searchTerm, 1, 1);
            else handleListingApi(0);
        }, 400), []
    );

    return (
        <div className='common-listing-screen mt-2'>
            {loader && <Loader />}
            <div className='custmer-search flex items-end justify-between'>
                <div className='w-full'>
                    <p className='search-title'>Receipt List</p>
                    <div className='search-bar mt-2'>
                        <TextInputWithSearchIcon
                            placeholder='Search'
                            value={search}
                            onChange={value => {
                                setSearch(value)
                                debouncedSearch(value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Button
                        onClick={() => handleNavigate()}
                        className='add-buttons'
                        type='primary'
                        icon={<i className='bi bi-plus icon-style' />}>
                        Add Receipt
                    </Button>
                </div>
            </div>
            {rowData?.length > 0 ? (
                <div className='listing-table'>
                    <TableComponent
                        tableColumn={columnData}
                        tableData={rowData}
                        handleSort={handleSort}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                </div>
            ) : (
                <EmptyTable msg='Receipt' searchVal={search}/>
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
            {deleteConfirmation && <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />}
        </div>
    );
};

export default ReceiptListing;
