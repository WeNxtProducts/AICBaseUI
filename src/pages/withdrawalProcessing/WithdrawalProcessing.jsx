import React from 'react';
import WithDrawMainForm from './withDrawMainForm/WithDrawMainForm';
import './WithdrawalProcessing.scss';

const WithdrawalProcessing = () => {
    return (
        <div className='withdrawal_processing'>
            <div className='grid grid-cols-12'>
                <div className='col-span-10'>
                    <WithDrawMainForm />
                </div>
                <div className='col-span-2'>
                    <p>buttons</p>
                </div>
            </div>
        </div>
    )
}

export default WithdrawalProcessing
