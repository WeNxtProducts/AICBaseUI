import React, { createContext } from 'react';
import ProdMastMainForm from './prodMastMainForm/ProdMastMainForm';
import './ProductMaster.scss';

export const ProductMasterContext = createContext();

const ProductMaster = () => {
    const data = {}

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
