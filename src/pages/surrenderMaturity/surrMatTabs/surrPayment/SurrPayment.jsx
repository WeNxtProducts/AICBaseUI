import React, { useState } from 'react'
import SurrDetails from './SurrDetails'
import SurrMRV from './surrMRV/SurrMRV';
import DeductionDetails from './deductionDetails/DeductionDetails';
import PaymentModes from './paymentModes/PaymentModes';

const SurrPayment = () => {
    const [editMRVId, setEditMRVId] = useState('');

    return (
        <div className='surr_payment mt-4'>
            <SurrMRV editMRVId={editMRVId} setEditMRVId={setEditMRVId} />
            <hr />
            <SurrDetails />
            <DeductionDetails />
            <PaymentModes />
        </div>
    )
}

export default SurrPayment
