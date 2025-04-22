import React, { useEffect, useState } from 'react'
import CustomerPolicyTable from '../CusPolTable/CustomerPolicyTable'
import InstallmentModal from '../../../components/installmentModal/InstallmentModal'
import PolSummaryModal from './PolSummaryModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPolNo } from '../../../globalStore/slices/CustPolSlice'
import useMRVListingPayload from '../../../components/mrvListing/useMRVListingPayload'
import '../CustomerPolicy.scss'
import { Pagination } from 'antd'
import useApiRequests from '../../../services/useApiRequests'
import EmptyTable from '../../../components/emptyTable/EmptyTable'
import Loader from '../../../components/loader/Loader'
import showNotification from '../../../components/notification/Notification'

const CusPolList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listingAPI = useApiRequests('getMRVlistingPayload', 'POST');
    const [rowData, setRowData] = useState([]);
    const [installmentOpen, setInstallmentOpen] = useState(false)
    const [polSummaryOpen, setPolicySummaryOpen] = useState(false)
    const [policyDetails, setPolicyDetails] = useState(null)
    const [loader, setLoader] = useState(false);
    const [current, setCurrent] = useState(1);
    const [count, setCount] = useState(10);
    const [search, setSearch] = useState('');
    const limit = 20;

    const handleListingApi = async offset => {
        setLoader(true);
        try {
            const response = await listingAPI({
                queryId: 273, tranId: 'CUST001',
                limit,
                offset,
            });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                setRowData(response?.Data);
                setCount(response?.count);
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        handleListingApi(0);
        setSearch('')
    }, []);

    const handleClose = () => {
        setInstallmentOpen(false)
        setPolicySummaryOpen(false)
    };

    const handleInstallment = (item) => {
        setPolicyDetails(item)
        setInstallmentOpen(true)
    }

    const handlePolicySummary = (item) => {
        setPolicyDetails(item)
        setPolicySummaryOpen(true)
    }

    const handleSelectedPolicy = (route, item) => {
        dispatch(setPolNo(item))
        navigate(route)
    }

    function calculateOffset(pageNumber, limit = 20) {
        return (pageNumber - 1) * limit;
    }

    const onChange = page => {
        setCurrent(page);
        handleListingApi(calculateOffset(page));
    };

    return (
        <div className='cust_pol_list'>
            {loader && <Loader />}
            <p className='header-font'>Policy List</p>
            {rowData?.length > 0 ? (
                <>
                    <CustomerPolicyTable
                        rowData={rowData}
                        handleInstallment={handleInstallment}
                        handlePolicySummary={handlePolicySummary}
                        handleSelectedPolicy={handleSelectedPolicy}
                    />

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
                <EmptyTable searchVal={search} mainMessage={'No Policy Found'} />
            )}

            {installmentOpen && (
                <InstallmentModal
                    open={installmentOpen}
                    handleClose={handleClose}
                    tranId={policyDetails?.ID}
                    POL_NO={policyDetails?.Policy_No}
                />
            )}

            {polSummaryOpen && (
                <PolSummaryModal
                    open={polSummaryOpen}
                    handleClose={handleClose}
                    policyDetails={policyDetails}
                />
            )}

        </div>
    )
}

export default CusPolList