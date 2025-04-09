import React, { createContext, useState } from 'react';
import ProdMastMainForm from './prodMastMainForm/ProdMastMainForm';
import GroupLifeLov from '../../getFormFields/QUOTATIONENTRY_getLOVList.json';
import ProductMasterJSON from '../../getFormFields/PRODUCTMASTER_getFieldList.json';
import { useSelector } from 'react-redux';
import './ProductMaster.scss';

export const ProductMasterContext = createContext();

const ProductMaster = () => {
    const id = useSelector(state => state?.prodMast?.id);
    const [dropDown, setDropDown] = useState(GroupLifeLov);

    const data = {
        dropDown, setDropDown, id, ProductMasterJSON
    }

    return (
        <ProductMasterContext.Provider value={data}>
            <div className='product_master'>

                <div className='main-screen mt-0'>
                    <ProdMastMainForm />
                </div>
            </div>
        </ProductMasterContext.Provider>
    )
}

export default ProductMaster
