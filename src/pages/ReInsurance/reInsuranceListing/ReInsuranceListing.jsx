import React, { useCallback, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApiRequests from '../../../services/useApiRequests';
import { useSelector } from 'react-redux';
import showNotification from '../../../components/notification/Notification';
import Loader from '../../../components/loader/Loader';
import { debounce } from 'lodash';
import { TextInputWithSearchIcon } from '../../../components/commonExportsFields/CommonExportsFields';
import TableComponent from '../../../components/tableComponents/TableComponent';
import EmptyTable from '../../../components/emptyTable/EmptyTable';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import { setReInsuranceId } from '../../../globalStore/slices/ReInsuranceSlices';

const ReInsuranceListing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listingAPI = useApiRequests('getListing', 'GET');
    const deleteRI = useApiRequests('deleteEndo', 'DELETE');
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const search_endo = useApiRequests('policySearch', 'POST');
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
    }, []);

    const handleSort = (columnName, sortOrder) => {
        console.log('sortState : ', sortState);
        setSortState({
            columnName,
            sortOrder,
        });
    };

    const handleNavigate = () => {
        dispatch(setReInsuranceId(''));
        navigate('/reInsurance');
    };

    const handleEdit = item => {
        dispatch(setReInsuranceId(item?.ID));
        navigate(`/reInsurance`);
    };

    const handleDeleteConfirm = async () => {
        setLoader(true);
        try {
            const response = await deleteRI('', {}, { tranId: deleteId?.ID });
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
            const response = await search_endo({
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
                    <p className='search-title'>Re-Insurance List</p>
                    <div className='search-bar mt-2'>
                        <TextInputWithSearchIcon placeholder='Search' value={search}
                            onChange={value => {
                                setSearch(value)
                                debouncedSearch(value)
                            }} />
                    </div>
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
                <EmptyTable msg={'Endorsment'} searchVal={search} />
            )}
            {deleteConfirmation && <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />}
        </div>
    );
};

export default ReInsuranceListing;
