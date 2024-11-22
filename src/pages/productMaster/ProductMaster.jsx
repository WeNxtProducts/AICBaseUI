import React, { createContext, useState } from 'react';
import ProdMastMainForm from './prodMastMainForm/ProdMastMainForm';
import GroupLifeJSON from '../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import GroupLifeLov from '../../getFormFields/QUOTATIONENTRY_getLOVList.json';
import { useSelector } from 'react-redux';
import './ProductMaster.scss';

export const ProductMasterContext = createContext();

const ProductMaster = () => {
    const id = useSelector(state => state?.id?.id);
    const [dropDown, setDropDown] = useState(GroupLifeLov);

    const data = {
        dropDown, setDropDown, GroupLifeJSON, id
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
