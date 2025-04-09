import React, { useEffect } from 'react'
import QuoteJSON from '../../../../getFormFields/GETQUOTE_getFieldList.json'
import QuoteLOVJSON from '../../../../getFormFields/EMAILTEMPLATE_getLOVList.json'
import { useSelector, useDispatch } from 'react-redux';
import {
    setCurrentAddress,
    setCustAssuredDetails, setDropDown,
    setLoader,
    setNomineeDetails,
    setResidenceAddress,
    setStepper3
} from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../../components/commonHelper/SortBySequence';

const CustomerDetailsForm = () => {
    const dispatch = useDispatch();
    const custAssuredDetails = useSelector(state => state?.quote?.custAssuredDetails);
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);
    const LTQuoteAssuredDtlsUpdate = useApiRequests('LTQuoteAssuredDtlsUpdate', 'POST');
    const LTQuoteAssuredDtlsGet = useApiRequests('LTQuoteAssuredDtlsGet', 'GET');
    const custDetailId = useSelector(state => state?.quote?.custDetailId)

    const onSubmit = async values => {
        dispatch(setLoader(true));
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = {
            QuotAssuredDtls: { formFields: { ...modifiedData.QuotAssuredDtls?.formFields } }
        };
        try {
            const response = await LTQuoteAssuredDtlsUpdate(payload, {}, { tranId: custDetailId });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                dispatch(setStepper3('customerAddress'))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        if (custDetailId !== null) {
            handleGetCustDetails()
        }
    }, [custDetailId]);

    const handleGetCustDetails = async () => {
        dispatch(setLoader(true));
        try {
            const queryParams = { tranId: custDetailId, screenName: prodCode, screenCode: 'GETQUOTE' }
            const response = await LTQuoteAssuredDtlsGet('', queryParams);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                const orderedData = sortObjectByPFDSeqNo(response?.Data);
                dispatch(setCustAssuredDetails({ QuotAssuredDtls: orderedData?.QuotAssuredDtls || {} }))
                dispatch(setCurrentAddress({ CurrentAddress: orderedData?.CurrentAddress || {} }))
                dispatch(setResidenceAddress({ ResidenceAddress: orderedData?.ResidenceAddress || {} }))
                dispatch(setNomineeDetails({ Nominee: orderedData?.Nominee || {} }))
                setTimeout(() => {
                    dispatch(setStepper3('customerDetails'))
                }, 200)
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
                        btnText={{ btn1: `${custDetailId ? 'Update' : 'Save'}` }}
                    />
                </div>
            )}
        </div>
    )
}

export default CustomerDetailsForm