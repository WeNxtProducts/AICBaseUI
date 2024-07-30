import React from 'react';
import ProductCard from './productCard/ProductCard';
import '../../Quotations.scss';
import FromHeader from '../../../../components/fieldsWithValues/FromHeader';
import PlanCard from './productCard/PlanCard';

const ProductList = () => {
 return (
  <div className='product_listing'>
   <FromHeader name='Product List' />
   <div className='mt-2 grid grid-cols-4 gap-5'>
    <div className='col-span-1'>
     <PlanCard />
    </div>
    <div className='col-span-1'>
     <ProductCard />
    </div>
    <div className='col-span-1'>
     <ProductCard />
    </div>
    <div className='col-span-1'>
     <ProductCard />
    </div>
   </div>
  </div>
 );
};

export default ProductList;
