import React, { useEffect } from 'react'
import QuoteJSON from '../../../../getFormFields/GETQUOTE_getFieldList.json'
import QuoteLOVJSON from '../../../../getFormFields/EMAILTEMPLATE_getLOVList.json'
import { useSelector, useDispatch } from 'react-redux';
import {
    setCustAssuredDetails, setDropDown,
    setLoader,
    setStepper3
} from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';

const CustomerDetailsForm = () => {
    const dispatch = useDispatch();
    const custAssuredDetails = useSelector(state => state?.quote?.custAssuredDetails);
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const tranId = useSelector(state => state?.quote?.tranId);
    const LTQuoteAssuredDtlsCreate = useApiRequests('LTQuoteAssuredDtlsCreate', 'POST');
    const LTQuoteAssuredDtlsUpdate = useApiRequests('LTQuoteAssuredDtlsUpdate', 'POST');
    const LTQuoteAssuredDtlsGet = useApiRequests('LTQuoteAssuredDtlsGet', 'GET');
    const custDetailId = useSelector(state => state?.quote?.custDetailId);

    const onSubmit = async values => {
        // dispatch(setLoader(true));
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = {
            QuotAssuredDtls: { formFields: { ...modifiedData.QuotAssuredDtls?.formFields } }
        };
        console.log("Payload : ", payload)
        // try {
        //     const response = await LTQuoteAssuredDtlsCreate(payload, {}, { tranId });
        //     if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
        //     if (response?.status === 'SUCCESS') {
        //         console.log("Response : ", response)
        //         // dispatch(setStepper3('customerAddress'))
        //         // dispatch(setCustAssuredDetails(response?.Data))
        //     }
        // } catch (err) {
        //     console.log('err : ', err);
        // } finally {
        //     dispatch(setLoader(false));
        // }
    };

    useEffect(() => {
        if (custDetailId !== null) {
            console.log("Cust Detail ID : ", custDetailId)
            handleGetCustDetails()
        }
    }, [custDetailId]);

    const handleGetCustDetails = async () => {
        dispatch(setLoader(true));
        try {
            const queryParams = { tranId: custDetailId }
            const response = await LTQuoteAssuredDtlsGet('', queryParams);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                console.log("handleGetCustDetails : ", response)
                // dispatch(setCustAssuredDetails(response?.Data[0]))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    return (
        <div className='mt-2 basic_information'>
            {custAssuredDetails !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={custAssuredDetails}
                        formRender={custAssuredDetails}
                        root='QuotAssuredDtls'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={false}
                        btnText={{ btn1: 'Save' }}
                    />
                </div>
            )}
        </div>
    )
}

export default CustomerDetailsForm