import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setLoader, setSameAddress, setStepper3 } from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import showNotification from '../../../../components/notification/Notification';
import { Checkbox } from 'antd';

const AddressFieldsForms = ({ root, initialValues, setActiveTabKey, freeze }) => {
    const dispatch = useDispatch();
    const LTQuoteAssuredDtlsUpdate = useApiRequests('LTQuoteAssuredDtlsUpdate', 'POST');
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const custDetailId = useSelector(state => state?.quote?.custDetailId);
    const sameAddress = useSelector(state => state?.quote?.sameAddress);
    const residenceAddress = useSelector(state => state?.quote?.residenceAddress);

    const onSubmit = async values => {
        // dispatch(setLoader(true));
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        let payload = {
            QuotAssuredDtls: { formFields: { ...modifiedData[root]?.formFields } }
        };
        if (sameAddress) {
            payload = {
                QuotAssuredDtls: {
                    formFields: {
                        ...modifiedData[root]?.formFields,
                        QQAD_RES_ADDRESS_1: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_ADDRESS_1,
                        QQAD_RES_ADDRESS_2: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_ADDRESS_2,
                        QQAD_RES_ADDRESS_3: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_ADDRESS_3,
                        QQAD_RES_CITY_CODE: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_CITY_CODE,
                        QQAD_RES_COUNTRY_CODE: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_COUNTRY_CODE,
                        QQAD_RES_POSTAL_CODE: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_POSTAL_CODE,
                        QQAD_RES_STATE: payload?.QuotAssuredDtls?.formFields?.QQAD_OFF_STATE
                    }
                }
            }
        }
        try {
            const response = await LTQuoteAssuredDtlsUpdate(payload, {}, { tranId: custDetailId });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                if (root === 'CurrentAddress') {
                    if (!sameAddress) setActiveTabKey('2')
                    else if (sameAddress) dispatch(setStepper3('nomineeDetails'))
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
            {root === 'CurrentAddress' && (
                <div className='mail_field mb-2'>
                    <Checkbox
                        checked={sameAddress}
                        onChange={() => dispatch(setSameAddress(!sameAddress))}
                        className='mail_check'>
                        Permanent Address is same as current address
                    </Checkbox>
                </div>
            )}
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
                        freeze={freeze}
                    />
                </div>
            )}
        </div>
    )
}

export default AddressFieldsForms