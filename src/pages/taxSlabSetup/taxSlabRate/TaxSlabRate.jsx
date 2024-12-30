import React from 'react'
import FromHeader from '../../../components/fieldsWithValues/FromHeader'
import TaxSlabRateTable from './taxSlabRateTable/TaxSlabRateTable'

const TaxSlabRate = () => {
    return (
        <div className='tax_slab_rate mb-3'>
            <FromHeader name='Tax Slab Rate' />
            <TaxSlabRateTable />
        </div>
    )
}

export default TaxSlabRate
