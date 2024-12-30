import React from 'react'
import GroupLifeEntryForm from './GroupLifeEntryForm'
import GLActionButtons from './GLActionButtons/GLActionButtons'

const GroupLifeMainForm = () => {
    return (
        <div data-id='panel-0' className='front-form grid grid-cols-8 gap-1'>
            <div className='group-life-entry-form col-span-7'>
                <GroupLifeEntryForm />
            </div>
            <div className='col-span-1'>
                <GLActionButtons />
            </div>
        </div>
    )
}

export default GroupLifeMainForm
