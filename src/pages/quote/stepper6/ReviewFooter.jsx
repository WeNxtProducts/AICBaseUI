import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import useApiRequests from '../../../services/useApiRequests';
import { setLoader } from '../../../globalStore/slices/QuoteSlice';
import showNotification from '../../../components/notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import CusBroSign from './CusBroSign';

const ReviewFooter = () => {
    const dispatch = useDispatch();
    const quotationNo = useSelector(state => state?.quote?.quotationNo);
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const getSignDetails = useApiRequests('getPreClaimDate', 'POST');
    const tranId = useSelector(state => state?.quote?.tranId);
    const [clientSign, setClientSign] = useState(null);
    const [brokerSign, setBrokerSign] = useState(null);

    const handleFinalSubmit = async () => {
        // dispatch(setLoader(true));
        const payload = {
            inParams: {
                P_POL_TRAN_ID: tranId,
                P_POL_NO: quotationNo,
                V_POL_ISSUE_DT: dayjs().format('D/MM/YYYY')
            }
        }
        console.log(payload);
        // try {
        //     const response = await invokeClaimsProcedure(payload, {
        //         procedureName: 'PROP_CONVERT',
        //         packageName: 'WNPKG_QUICK_QUOTE',
        //     });
        //     if (response?.status === 'FAILURE') {
        //         showNotification.ERROR(response?.status_msg);
        //     } else if (response?.status === 'SUCCESS') {
        //         dispatch(setLoader(false));
        //     }
        // } catch (err) {
        //     dispatch(setLoader(false));
        // }
    };

    const handleGetSavedSign = async () => {
        try {
            const payload = { queryParams: { tranId: tranId, type: 'sign' } };
            const response = await getSignDetails(payload, { queryId: 267 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                if (Array.isArray(response?.Data)) {
                    const clientSignData = response?.Data?.find(sign => sign?.type === 'client');
                    const brokerSignData = response?.Data?.find(sign => sign?.type === 'broker');
                    if (clientSignData)
                        setClientSign({ name: clientSignData?.signName, signature: clientSignData?.filepath, ...clientSignData });
                    else
                        setClientSign({ name: null, signature: null });

                    if (brokerSignData)
                        setBrokerSign({ name: brokerSignData?.signName, signature: brokerSignData?.filepath, ...brokerSignData });
                    else
                        setBrokerSign({ name: null, signature: null });

                } else {
                    setClientSign({ name: null, signature: null });
                    setBrokerSign({ name: null, signature: null });
                }
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        }
    }

    useEffect(() => {
        handleGetSavedSign()
    }, [])

    return (
        <>
            <div className='digital_signature'>
                {clientSign || brokerSign ? (
                    <>
                        <CusBroSign title='Client Signature' doctype='client' data={clientSign} />
                        {/* <CusBroSign title='Broker Signature' doctype='broker' data={brokerSign} /> */}
                    </>
                ) : null}
            </div>
            <div className='review_footer_btn'>
                <Button onClick={() => handleFinalSubmit()} className='oth_btn'>Submit</Button>
                <Button className='acc_btn'>Back</Button>
            </div>
        </>
    );
};

export default ReviewFooter;
