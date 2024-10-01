import React, { useContext, useEffect, useState } from 'react'
import SurrDetails from './SurrDetails'
import SurrMRV from './surrMRV/SurrMRV';
import DeductionDetails from './deductionDetails/DeductionDetails';
import PaymentModes from './paymentModes/PaymentModes';
import { SurrMatContext } from '../../SurrenderMaturity';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';

const SurrPayment = () => {
    const { POL_NO, tranId, surrID } = useContext(SurrMatContext);
    const surrMatGet = useApiRequests('surrMatGet', 'POST');
    const [surrMatValues, setSurrMatValues] = useState(null)

    const handleGetSurrMat = async () => {
        try {
            const response = await surrMatGet('', { tranId: surrID });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                console.log(response?.Data);
                setSurrMatValues(response?.Data)
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        if (surrID)
            handleGetSurrMat()
    }, [surrID])

    return (
        <div className='surr_payment mt-4'>
            {/* <SurrMRV editMRVId={editMRVId} setEditMRVId={setEditMRVId} /> */}
            {surrMatValues &&
                <>
                    <SurrDetails surrMatValues={surrMatValues} />
                    <DeductionDetails surrMatValues={surrMatValues} />
                    <PaymentModes surrMatValues={surrMatValues} />
                </>
            }
        </div>
    )
}

export default SurrPayment
