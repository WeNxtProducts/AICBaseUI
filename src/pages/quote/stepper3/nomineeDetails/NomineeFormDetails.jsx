import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    setLoader,
    setNomineeDetails,
    setNomineeId,
    setStepper3
} from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../../components/commonHelper/SortBySequence';

const NomineeFormDetails = () => {
    const dispatch = useDispatch();
    const LTQuoteBeneficiaryCreate = useApiRequests('LTQuoteBeneficiaryCreate', 'POST');
    const LTQuoteBeneficiaryUpdate = useApiRequests('LTQuoteBeneficiaryUpdate', 'POST');
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const getNomineeDetails = useApiRequests('LTQuoteBeneficiaryGet', 'GET');
    const nomineeDetails = useSelector(state => state?.quote?.nomineeDetails);
    const nomineeId = useSelector(state => state?.quote?.nomineeId);
    const activeSection = useSelector(state => state?.quote?.stepper_3);
    const tranId = useSelector(state => state?.quote?.tranId);
    const dropDown = useSelector(state => state?.quote?.dropDown);
    const prodCode = useSelector(state => state?.quote?.prodCode);

    const addOrUpdate = async (payload, api) => {
        try {
            const pathParam = {
                id: nomineeId || tranId
            };
            const response = await api(payload, {}, pathParam);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                if (nomineeId === null) {
                    dispatch(setNomineeId(response?.data?.Id))
                }
                dispatch(setStepper3(''))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    }

    const onSubmit = async values => {
        dispatch(setLoader(true));
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = {
            Nominee: { formFields: { ...modifiedData.Nominee?.formFields } }
        };
        addOrUpdate(payload, nomineeId ? LTQuoteBeneficiaryUpdate : LTQuoteBeneficiaryCreate);
    };

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    const handlePrevious = () => {
        dispatch(setStepper3('customerAddress'))
    }

    const handleFetchNomineeId = async () => {
        dispatch(setLoader(true));
        try {
            const payload = { queryParams: { tranId } }
            const response = await getMapQuery(payload, { queryId: 261 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                if (Array.isArray(response?.Data)) {
                    dispatch(setNomineeId(response?.Data[0]?.ID))
                    handleGetNomineeDetails()
                }
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleGetNomineeDetails = async () => {
        dispatch(setLoader(true));
        try {
            const queryParams = { tranId: nomineeId, screenName: prodCode, screenCode: 'GETQUOTE' }
            const response = await getNomineeDetails('', queryParams);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                const orderedData = sortObjectByPFDSeqNo(response?.Data);
                dispatch(setNomineeDetails({ Nominee: orderedData?.Nominee || {} }))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        if (activeSection === 'nomineeDetails') {
            if (nomineeId === null) {
                handleFetchNomineeId()
            } else {
                handleGetNomineeDetails()
            }
        }
    }, [activeSection])


    return (
        <div className='mt-2 basic_information'>
            {nomineeDetails !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={nomineeDetails}
                        formRender={nomineeDetails}
                        root='Nominee'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={true}
                        btnText={{ btn1: `${nomineeId ? 'Update' : 'Save'}`, btn2: 'Previous' }}
                        handlePrevious={handlePrevious}
                    />
                </div>
            )}
        </div>
    )
}

export default NomineeFormDetails