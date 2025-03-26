import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setBasicInfoForm, setStepperIndex, setTranId } from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import showNotification from '../../../../components/notification/Notification';

const BasicInfo = () => {
    const dispatch = useDispatch();
    const tranId = useSelector(state => state?.quote?.tranId);
    const basicInfoForm = useSelector(state => state?.quote?.basicInfoForm);
    const prodCode = useSelector(state => state?.quote?.prodCode);
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const LTQuoteSave = useApiRequests('LTQuoteSave', 'POST');
    const LTQuoteUpdate = useApiRequests('LTQuoteUpdate', 'POST');

    const addOrUpdateBasicInfo = async (payload, addOrUpdate, values) => {
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
        addOrUpdateBasicInfo(payload, tranId ? LTQuoteUpdate : LTQuoteSave, values);
    };

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    return (
        <div className='mt-2 basic_information'>
            <p>Basic Information</p>
            {basicInfoForm !== null && dropDown !== null && (
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