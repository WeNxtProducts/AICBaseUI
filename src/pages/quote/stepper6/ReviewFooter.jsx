import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import useApiRequests from '../../../services/useApiRequests';
import { setLoader, setQuoteStepStatus, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import showNotification from '../../../components/notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import CusBroSign from './CusBroSign';

const ReviewFooter = () => {
    const dispatch = useDispatch();
    const quotationNo = useSelector(state => state?.quote?.quotationNo);
    const { QUOT_FIRST_NAME: { PFD_FLD_VALUE: Fname } = {},
        QUOT_MIDDLE_NAME: { PFD_FLD_VALUE: Mname } = {},
        QUOT_LAST_NAME: { PFD_FLD_VALUE: Lname } = {} }
        = useSelector(state => state?.quote?.basicInfoForm?.frontForm?.formFields || {});
    const name = `${Fname} ${Mname} ${Lname}`.trim();
    const getSignDetails = useApiRequests('getPreClaimDate', 'POST');
    const emailTrigger = useApiRequests('emailTrigger', 'POST');
    const tranId = useSelector(state => state?.quote?.tranId);
    const [clientSign, setClientSign] = useState(null);
    const [brokerSign, setBrokerSign] = useState(null);

    const handleSendEmail = async () => {
        dispatch(setLoader(true));
        const payload = {
            toIds: [
                "kuzhandaivel.k@wenxttech.com",
            ],
            subject: `QuoteNo. - ${quotationNo}`,
            content: { name }
        }

        try {
            const response = await emailTrigger(payload, {
                templateId: 122,
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                dispatch(setQuoteStepStatus(6))
                showNotification.SUCCESS(response?.status_msg);
                dispatch(setStepperIndex(6))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    }

    const handleFinalSubmit = async () => {
        handleSendEmail()
    };

    const handleGetSavedSign = async () => {
        try {
            const payload = { queryParams: { tranId: tranId, type: 'sign' } };
            const response = await getSignDetails(payload, { queryId: 267 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                if (Array.isArray(response?.Data)) {
                    const clientSignData = response?.Data?.find(sign => sign?.type === 'client' && sign?.dms_status === 'Y');
                    const brokerSignData = response?.Data?.find(sign => sign?.type === 'broker' && sign?.dms_status === 'Y');
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
                        <CusBroSign title='Client Signature'
                            doctype='client'
                            data={clientSign}
                            signUpdate={setClientSign}
                        />
                        {/* <CusBroSign title='Broker Signature' doctype='broker' data={brokerSign} /> */}
                    </>
                ) : null}
            </div>
            {/* {clientSign?.signature !== null && */}
                <div className='review_footer_btn'>
                    <Button onClick={() => handleFinalSubmit()} className='oth_btn'>Submit</Button>
                    <Button onClick={() => dispatch(setStepperIndex(4))} className='acc_btn'>Back</Button>
                </div>
            {/* } */}
        </>
    );
};

export default ReviewFooter;
