import React, { useEffect, useState } from 'react';
import ProductCard from './productCard/ProductCard';
import FromHeader from '../../../../components/fieldsWithValues/FromHeader';
import PlanCard from './productCard/PlanCard';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import { Breadcrumb } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import '../../Quotations.scss';
import {
   setFreezeStatus,
   setPlanCode,
   setProdCode,
   setProRules,
   setStepperId,
} from '../../../../globalStore/slices/IdSlices';

const ProductList = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const breadCrumbsItem = [{ title: 'Product List' }, { title: 'Plan List' }];
   const [locationState, setLocationState] = useState('Product List');
   const getLovList = useApiRequests('getLovList', 'GET');
   const getPlanList = useApiRequests('getPreClaimDate', 'POST');
   const getProRules = useApiRequests('getProRules', 'POST');
   const [productList, setProductList] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState('');
   const [planList, setPlanList] = useState([]);

   const handleGetListData = async (queryId, apiCalls, setState, payload) => {
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
      }
   };

   useEffect(() => {
      handleGetListData(160, getLovList, setProductList, '');
   }, []);

   const hasValidRowData = list => {
      return list && list.length > 0 && Object.keys(list[0]).length > 0;
   };

   const handleGetProductRuleJSON = async (prodCode) => {
      try {
         const response = await getProRules({ prodCode });
         if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
         if (response?.status === 'SUCCESS') {
            dispatch(setProRules(response?.Data))
            dispatch(setFreezeStatus(false));
            dispatch(setPlanCode(prodCode));
            dispatch(setStepperId(0));
            navigate('/quotation/0');
            console.log(response?.Data);
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleSelectProduct = item => {
      dispatch(setProdCode(item?.value));
      setLocationState('Plan List');
      setSelectedProduct(item?.value);
      if (!hasValidRowData(planList)) {
         const payload = { queryParams: { prodCode: item?.value } };
         handleGetListData(161, getPlanList, setPlanList, payload);
      }
   };

   const handleBreadCrumbs = item => {
      if (selectedProduct) setLocationState(item?.title);
      setSelectedProduct('');
   };

   const handleSelectPlan = item => {
      // dispatch(setProRules())
      console.log("item?.VALUE : ",item?.VALUE)
      handleGetProductRuleJSON(item?.VALUE)
   };

   return (
      <div className='product_listing'>
         <div className='pl-3 mb-1'>
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
         </div>
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
   );
};

export default ProductList;
