import React from 'react';
import TaxSlabMainForm from './taxSlabMainForm/TaxSlabMainForm';
import './TaxSlabSetup.scss';
import TaxSlabRate from './taxSlabRate/TaxSlabRate';

const TaxSlabSetup = () => {
    return (
        <div className='tax_slab_setup'>
            <TaxSlabMainForm />
            <TaxSlabRate />
        </div>
    )
}

export default TaxSlabSetup
