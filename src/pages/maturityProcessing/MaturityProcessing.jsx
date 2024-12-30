import React, { createContext } from 'react'
import MaturityMainForm from './maturityMainForm/MaturityMainForm';
import MaturityActionButtons from './maturityActionButtons/MaturityActionButtons';
import MaturityTabs from './maturityTabs/MaturityTabs';
import './MaturityProcessing.scss';

export const MaturityProcessingConext = createContext()

const MaturityProcessing = () => {
    const data = {}

    return (
        <MaturityProcessingConext.Provider value={data}>
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
        </MaturityProcessingConext.Provider>
    )
}

export default MaturityProcessing
