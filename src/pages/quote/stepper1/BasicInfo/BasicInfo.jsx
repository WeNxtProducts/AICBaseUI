import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setBasicInfoForm, setLoader, setStepperIndex, setTranId } from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import showNotification from '../../../../components/notification/Notification';
import { basicInfoSchema } from '../../QuoteSchema';
import Loader from '../../../../components/loader/Loader';

const BasicInfo = () => {
    const dispatch = useDispatch();
    const tranId = useSelector(state => state?.quote?.tranId);
    const basicInfoForm = useSelector(state => state?.quote?.basicInfoForm);
    const prodCode = useSelector(state => state?.quote?.prodCode);
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const loader = useSelector(state => state?.quote?.loader);
    const LTQuoteSave = useApiRequests('LTQuoteSave', 'POST');
    const LTQuoteUpdate = useApiRequests('LTQuoteUpdate', 'POST');

    useEffect(() => {
        console.log("basicInfoForm : ", basicInfoForm)
    }, [basicInfoForm]);

    const addOrUpdateBasicInfo = async (payload, addOrUpdate, values) => {
        dispatch(setLoader(true));
        try {
            const params = tranId ? { tranId } : {};
            const response = await addOrUpdate(payload, '', params);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                dispatch(setBasicInfoForm(values))
                if (!tranId) dispatch(setTranId(response?.data?.Id));
                dispatch(setStepperIndex(1));
            }
        } catch (err) {
            console.error(err);
        } finally {
            dispatch(setLoader(false));
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

    const handleChangeValue = (value, path, setFieldValue, parent, values, currentData, PFD_COLUMN_NAME) => {
        if (PFD_COLUMN_NAME === 'QUOT_NAME_TITLE') {
            if (value == 1)
                setFieldValue('frontForm.formFields.QUOT_SEX.PFD_FLD_VALUE', 'M');
            else
                setFieldValue('frontForm.formFields.QUOT_SEX.PFD_FLD_VALUE', '');
        }
        setFieldValue(path, value);
    };

    return (
        <div className='mt-2 basic_information'>
            {loader && <Loader />}
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
                        validationSchema={basicInfoSchema}
                    />
                </div>
            )}
        </div>
    )
}

export default BasicInfo