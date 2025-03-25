import React, { useEffect } from 'react'
import QuoteJSON from '../../../../getFormFields/GETQUOTE_getFieldList.json'
import QuoteLOVJSON from '../../../../getFormFields/GETQUOTE_getLOVList.json'
import { useSelector, useDispatch } from 'react-redux';
import { setBasicInfoForm, setDropDown, setStepperIndex, setTranId } from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import { sortObjectByPFDSeqNo } from '../../../../components/commonHelper/SortBySequence';
import useApiRequests from '../../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import showNotification from '../../../../components/notification/Notification';

const BasicInfo = () => {
    const dispatch = useDispatch();
    const tranId = useSelector(state => state?.quote?.tranId);
    const basicInfoForm = useSelector(state => state?.quote?.basicInfoForm);
    const prodCode = useSelector(state => state?.quote?.prodCode);
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const getFieldList = useApiRequests('LTQuoteBasicFieldList', 'POST');
    const LTQuoteSave = useApiRequests('LTQuoteSave', 'POST');
    const LTQuoteUpdate = useApiRequests('LTQuoteUpdate', 'POST');

    useEffect(() => {
        if (basicInfoForm === null) {
            handleGetFieldList();
        }
    }, [])

    const handleGetFieldList = async () => {
        try {
            const response = await getFieldList('', {
                screenName: prodCode,
                screenCode: 'GETQUOTE',
                serviceName: 'getfield',
            });
            console.log("response : ", response)
            const orderedData = sortObjectByPFDSeqNo(response);
            dispatch(setBasicInfoForm(orderedData))
            dispatch(setDropDown(QuoteLOVJSON))
        } catch (err) {
            console.log(err);
        }
    };

    const addOrUpdateMRV = async (payload, addOrUpdate, values) => {
        try {
            const params = tranId ? { tranId } : {};
            const response = await addOrUpdate(payload, '', params);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                dispatch(setBasicInfoForm(values))
                if (!tranId) dispatch(setTranId(response?.data?.Id));
                dispatch(setStepperIndex(1));
            }
        } catch (err) {
            console.error(err);
        }
    };


    const onSubmit = async values => {
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = {
            frontForm: { formFields: { ...modifiedData.frontForm?.formFields, QUOT_PROD_CODE: prodCode, } }
        };
        console.log("Payload : ", payload)
        addOrUpdateMRV(payload, tranId ? LTQuoteUpdate : LTQuoteSave, values);
    };

    console.log("dropDown : ", dropDown)

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    return (
        <div className='mt-2 basic_information'>
            <p>Basic Information</p>
            {basicInfoForm !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={basicInfoForm}
                        formRender={basicInfoForm}
                        root='frontForm'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={false}
                        btnText={{ btn1: 'Get Quote' }}
                    />
                </div>
            )}
        </div>
    )
}

export default BasicInfo