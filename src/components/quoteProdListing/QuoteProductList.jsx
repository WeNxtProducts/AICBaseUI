import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button } from 'antd'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import useApiRequests from '../../services/useApiRequests';
import QuoteHeader from '../quoteHeader/QuoteHeader';
import Loader from '../loader/Loader';
import FromHeader from '../fieldsWithValues/FromHeader';
import ProductCard from './productCard/ProductCard';
import PlanCard from './productCard/PlanCard';
import showNotification from '../notification/Notification';
import { setProdCode } from '../../globalStore/slices/QuoteProdPlanSlice';
import './QuoteProdListing.scss'

const QuoteProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getProdList = useApiRequests('getPreClaimDate', 'POST');
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);
    const planCode = useSelector(state => state?.quoteProdPlanCode?.planCode);
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

    const handleGetListData = async (queryId = 410, apiCalls = getProdList
        , setState = setProductList, payload = { id: 1 }) => {
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
        setSelectedProduct(item?.PROD_CODE);
        navigate('/quote'); //quote
    };

    const handleSelectPlan = item => {
        console.log("item?.VALUE : ", item)
    };

    useEffect(() => {
        handleGetListData(410, getProdList, setProductList, { id: 1 });
    }, []);

    return (
        <div className='Quote_product_listing'>
            {loader && <Loader />}
            <QuoteHeader />
            {productList?.length > 0 ? (
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
            ) : (
                <div className='product_listing_empty'>
                    <Button onClick={() => handleGetListData()}>Try again</Button>
                </div>
            )}
        </div>
    )
}

export default QuoteProductList