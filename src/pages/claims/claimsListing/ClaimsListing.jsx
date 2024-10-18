import React, { useCallback, useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/loader/Loader';
import { TextInputWithSearchIcon } from '../../../components/commonExportsFields/CommonExportsFields';
import TableComponent from '../../../components/tableComponents/TableComponent';
import useApiRequests from '../../../services/useApiRequests';
import { setCurrentID, setFormValues } from '../../../globalStore/slices/IdSlices';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import showNotification from '../../../components/notification/Notification';
import { debounce } from 'lodash';
import EmptyTable from '../../../components/emptyTable/EmptyTable';

const ClaimListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listingAPI = useApiRequests('getListing', 'GET');
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const deleteClaim = useApiRequests('modernClaimDelete', 'POST');
    const claimSearch = useApiRequests('claimListSearch', 'POST');
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
        dispatch(setFormValues(null));
        dispatch(setCurrentID(''));
        navigate('/claims');
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
            const response = await deleteClaim('', { tranId: deleteId?.ID });
            setDeleteId(null);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                handleListingApi(0, 1);
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
        navigate('/claims');
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

    const handleUsesearch = async (searchTerm, offset, page) => {
        setLoader(true);
        try {
            const response = await claimSearch({
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
                    <p className='search-title'>Claims List</p>
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
                        Add Claims
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
                <EmptyTable msg='Claims' searchVal={search} />
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

export default ClaimListing;
