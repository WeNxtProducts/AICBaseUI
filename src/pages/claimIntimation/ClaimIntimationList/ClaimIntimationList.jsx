import React, { useCallback, useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import EmptyTable from '../../../components/emptyTable/EmptyTable';
import useApiRequests from '../../../services/useApiRequests';
import { setPolNo, setPolTranId } from '../../../globalStore/slices/CustPolSlice';
import showNotification from '../../../components/notification/Notification';
import Loader from '../../../components/loader/Loader';
import { TextInputWithSearchIcon } from '../../../components/commonExportsFields/CommonExportsFields';
import TableComponent from '../../../components/tableComponents/TableComponent';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';

const ClaimIntimationList = ({ label, search: searchApi, page, delete: deleteApi }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listingAPI = useApiRequests('getListing', 'GET');
    const deleteProposal = useApiRequests(deleteApi, 'POST');
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const search_api = useApiRequests(searchApi, 'POST');
    const [sortState, setSortState] = useState({});
    const [deleteId, setDeleteId] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [columnData, setColumnData] = useState({});
    const [loader, setLoader] = useState(false);
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(10);
    const [search, setSearch] = useState('');
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
        setSearch('')
    }, [label]);

    const handleSort = (columnName, sortOrder) => {
        setSortState({
            columnName,
            sortOrder,
        });
    };

    const handleNavigate = () => {
        dispatch(setPolNo(''));
        dispatch(setPolTranId(''));
        navigate(page);
    };

    const handleEdit = item => {
        dispatch(setPolNo(item?.Pol_No));
        dispatch(setPolTranId(item?.ID));
        navigate(page);
    };

    const handleDeleteConfirm = async () => {
        setLoader(true);
        try {
            const response = await deleteProposal('', {}, { tranId: deleteId?.ID });
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

    const handleDelete = async item => {
        setDeleteConfirmation(true);
        setDeleteId(item);
    };

    const handleClose = status => {
        setDeleteConfirmation(false);
        if (status) handleDeleteConfirm();
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
            const response = await search_api({
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
            if (searchTerm?.length > 0) handleUsesearch(searchTerm, 0, 1);
            else handleListingApi(0);
        }, 400), [currentMenuId]
    );

    return (
        <div className='common-listing-screen mt-2'>
            {loader && <Loader />}
            <div className='custmer-search flex items-end justify-between'>
                <div className='w-full'>
                    <p className='search-title'>{label} List</p>
                    <div className='search-bar mt-2'>
                        <TextInputWithSearchIcon placeholder='Search' value={search}
                            onChange={value => {
                                setSearch(value)
                                debouncedSearch(value)
                            }} />
                    </div>
                </div>
                <div>
                    <Button
                        onClick={() => handleNavigate()}
                        className='add-buttons'
                        type='primary'
                        icon={<i className='bi bi-plus icon-style' />}>
                        Add {label}
                    </Button>
                </div>
            </div>
            {rowData?.length > 0 ? (
                <>
                    <div className='listing-table'>
                        <TableComponent
                            tableColumn={columnData}
                            tableData={rowData}
                            handleSort={handleSort}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            editIcon='bi bi-pencil-square'
                            isDelete={true}
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
            ) : (
                <EmptyTable msg={label} searchVal={search} />
            )}
            {deleteConfirmation && <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />}
        </div>
    );
};

export default ClaimIntimationList;
