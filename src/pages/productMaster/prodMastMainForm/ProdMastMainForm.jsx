import React from 'react'
import ProdMastEntryForm from './ProdMastEntryForm'
import PMActionButtons from './PMActionButtons/PMActionButtons'

const ProdMastMainForm = () => {
    return (
        <div className='front-form grid grid-cols-8 gap-1'>
            <div className='prod-mast-entry-form col-span-7'>
                <ProdMastEntryForm />
            </div>
            <div className='col-span-1'>
                <PMActionButtons />
            </div>
        </div>
    )
}

export default ProdMastMainForm
