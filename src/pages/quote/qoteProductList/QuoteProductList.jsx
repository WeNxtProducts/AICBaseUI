import React, { useEffect, useState } from 'react'
import QuoteHeader from '../quoteHeader/QuoteHeader'
import { Breadcrumb } from 'antd'
import { IoIosArrowForward } from 'react-icons/io'
import FromHeader from '../../../components/fieldsWithValues/FromHeader'
import showNotification from '../../../components/notification/Notification'
import { setProdCode, setPlanCode, setDropDown, setBasicInfoForm } from '../../../globalStore/slices/QuoteSlice'
import { useDispatch } from 'react-redux';
import useApiRequests from '../../../services/useApiRequests'
import ProductCard from './productCard/ProductCard'
import PlanCard from './productCard/PlanCard'
import { useNavigate } from 'react-router-dom'
import '../Quote.scss'
import Loader from '../../../components/loader/Loader'

const QuoteProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getProdList = useApiRequests('getPreClaimDate', 'POST');
    const [locationState, setLocationState] = useState('Product List');
    const breadCrumbsItem = [{ title: 'Product List' }, { title: 'Plan List' }];
    const [selectedProduct, setSelectedProduct] = useState('');
    const [productList, setProductList] = useState([]);
    const [planList, setPlanList] = useState([]);
    const [loader, setLoader] = useState(false);

    const hasValidRowData = list => {
        return list && list.length > 0 && Object.keys(list[0]).length > 0;
    };

    // const handleBreadCrumbs = item => {
    //     if (selectedProduct) setLocationState(item?.title);
    //     setSelectedProduct('');
    // };

    const handleGetListData = async (queryId, apiCalls, setState, payload) => {
        setLoader(true);
        try {
            const response = await apiCalls(payload, {
                queryId,
            });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                setState(response?.Data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    };

    const handleSelectProduct = item => {
        dispatch(setProdCode(item?.PROD_CODE));
        dispatch(setBasicInfoForm(null))
        dispatch(setDropDown(null))
        setSelectedProduct(item?.PROD_CODE);
        navigate('/quote');
    };

    const handleSelectPlan = item => {
        console.log("item?.VALUE : ", item)
    };

    useEffect(() => {
        handleGetListData(410, getProdList, setProductList, { id: 1 });
    }, []);

    return (
        <div className='Quote'>
            {loader && <Loader />}
            <QuoteHeader />
            <div className='product_listing'>
                {/* <div className='pl-3 mb-1'>
                    <Breadcrumb separator={<IoIosArrowForward className='mt-1' />}>
                        {breadCrumbsItem.map((item, index) => (
                            <Breadcrumb.Item key={index}>
                                <span
                                    className={`breadcrumb-title ${item?.title === locationState ? 'highlight' : ''}`}
                                    onClick={() => handleBreadCrumbs(item)}>
                                    {item.title}
                                </span>
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </div> */}
                <FromHeader name={locationState} />
                {locationState === 'Product List'
                    ? hasValidRowData(productList) && (
                        <div className='mt-1 grid grid-cols-4 gap-5 pl-2'>
                            {productList?.map(item => (
                                <div key={item?.value} className='col-span-1'>
                                    <ProductCard value={item} onSelect={handleSelectProduct} />
                                </div>
                            ))}
                        </div>
                    )
                    : hasValidRowData(planList) && (
                        <div className='mt-1 grid grid-cols-4 gap-5 pl-2'>
                            {planList?.map(item => (
                                <div key={item?.value} className='col-span-1'>
                                    <PlanCard value={item} onSelect={handleSelectPlan} />
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    )
}

export default QuoteProductList