import React from 'react'
import MaturityMainForm from './maturityMainForm/MaturityMainForm';
import MaturityActionButtons from './maturityActionButtons/MaturityActionButtons';
import MaturityTabs from './maturityTabs/MaturityTabs';
import './MaturityProcessing.scss';

const MaturityProcessing = () => {
    return (
        <div className='maturity_processing'>
            <div className='grid grid-cols-8'>
                <div className='col-span-7'>
                    <MaturityMainForm />
                </div>
                <div className='col-span-1'>
                    <MaturityActionButtons />
                </div>
            </div>
            <div className='withdrawal_tabs'>
                <MaturityTabs />
            </div>
        </div>
    )
}

export default MaturityProcessing
