import React from 'react'
import YearEndProcessMainForm from './yearEndProcessMainForm/YearEndProcessMainForm';
import YearEndProcessActionButtons from './yearEndProcessActionButtons/YearEndProcessActionButtons';
import TableEditFields from './tableEditFields/TableEditFields';
import './YearEndProcessing.scss';

const YearEndProcessing = () => {
    return (
        <div className='year-end-process'>
            <div className='grid grid-cols-12'>
                <div className='col-span-10'>
                    <YearEndProcessMainForm />
                </div>
                <div className='col-span-2'>
                    <YearEndProcessActionButtons />
                </div>
            </div>
            <TableEditFields />
        </div>
    )
}

export default YearEndProcessing
