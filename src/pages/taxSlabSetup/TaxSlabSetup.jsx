import React from 'react';
import TaxSlabMainForm from './taxSlabMainForm/TaxSlabMainForm';
import TaxSlabRate from './taxSlabRate/TaxSlabRate';
import './TaxSlabSetup.scss';

const TaxSlabSetup = () => {
    return (
        <div className='tax_slab_setup'>
            <TaxSlabMainForm />
            <TaxSlabRate />
        </div>
    )
}

export default TaxSlabSetup
