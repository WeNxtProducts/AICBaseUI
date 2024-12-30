import React from 'react';
import WithDrawMainForm from './withDrawMainForm/WithDrawMainForm';
import WithDrawActionButtons from './withDrawActionButtons/WithDrawActionButtons';
import WithdrawalTabs from './withdrawalTabs/WithdrawalTabs';
import './WithdrawalProcessing.scss';

const WithdrawalProcessing = () => {
    return (
        <div className='withdrawal_processing'>
            <div className='grid grid-cols-8'>
                <div className='col-span-7'>
                    <WithDrawMainForm />
                </div>
                <div className='col-span-1'>
                    <WithDrawActionButtons />
                </div>
            </div>
            <div className='withdrawal_tabs'>
                <WithdrawalTabs />
            </div>
        </div>
    )
}

export default WithdrawalProcessing
