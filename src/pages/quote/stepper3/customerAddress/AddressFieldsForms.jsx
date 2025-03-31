import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLoader, setStepper3 } from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import showNotification from '../../../../components/notification/Notification';

const AddressFieldsForms = ({ root, initialValues, setActiveTabKey }) => {
    const dispatch = useDispatch();
    const LTQuoteAssuredDtlsUpdate = useApiRequests('LTQuoteAssuredDtlsUpdate', 'POST');
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const custDetailId = useSelector(state => state?.quote?.custDetailId);

    const onSubmit = async values => {
        dispatch(setLoader(true));
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = {
            QuotAssuredDtls: { formFields: { ...modifiedData[root]?.formFields } }
        };
        console.log("Payload : ", payload)
        try {
            const response = await LTQuoteAssuredDtlsUpdate(payload, {}, { tranId: custDetailId });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                if (root === 'CurrentAddress') {
                    setActiveTabKey('2')
                } else if (root === 'ResidenceAddress') {
                    dispatch(setStepper3('nomineeDetails'))
                }
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

    const handlePrevious = () => {
        dispatch(setStepper3('customerDetails'))
    }

    return (
        <div className='mt-2 basic_information'>
            {initialValues !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={initialValues}
                        formRender={initialValues}
                        root={root}
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={true}
                        btnText={{ btn1: `${custDetailId ? 'Update' : 'Save'}`, btn2: 'Previous' }}
                        handlePrevious={handlePrevious}
                    />
                </div>
            )}
        </div>
    )
}

export default AddressFieldsForms