import React, { useEffect, useState } from 'react';
import Loader from '../../../../../../../../components/loader/Loader';
import { mergeDropdownData } from '../../../../../../../../components/commonHelper/ParamLov';
import showNotification from '../../../../../../../../components/notification/Notification';
import { sortObjectByPFDSeqNo } from '../../../../../../../../components/commonHelper/SortBySequence';
import { deepCopy, extractFieldValuesInPlace } from '../../../../../../../../components/commonHelper/DataSend';
import useApiRequests from '../../../../../../../../services/useApiRequests';
import FormPage from './FormPage';

const FormCreate = ({
    root,
    mrvGet,
    screenCode,
    screenName,
    saveRow,
    editRow,
    deleteRow,
    title = '',
    action = true,
    ClaimsJson,
    setDropDown,
    dropDown,
    freeze,
    setShowDisbursal,
    POL_NO,
    tranId,
    handleUpdateList
}) => {
    const mrvGetById = useApiRequests(mrvGet, 'GET');
    const getParamLov = useApiRequests('getParamLov', 'GET');
    const saveMRV = useApiRequests(saveRow, 'POST');
    const editMRV = useApiRequests(editRow, 'POST');
    const deleteMRV = useApiRequests(deleteRow, 'POST');
    const [formMRV, setFormMRV] = useState(null);
    const [formMRVInitialValues, setFormMRVInitialValues] = useState(null);
    const [editMRVId, setEditMRVId] = useState('');
    const [loader, setLoader] = useState(false);
    const [formInit, setFormInit] = useState(false);

    const addOrUpdateMRV = async (payload, addOrUpdate) => {
        try {
            const params = editMRVId ? { editMRVId } : {};
            const response = await addOrUpdate(payload, '', params);
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                if (!editMRVId) setFormInit(!formInit);
                showNotification.SUCCESS(response?.status_msg);
                handleUpdateList()
            }
            setLoader(false);
        } catch (err) {
            setLoader(false);
        }
    };

    const onSubmit = values => {
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = {
            [root]: {
                formFields: {
                    ...modifiedData[root]?.formFields,
                    LOAN_POL_TRAN_ID: tranId,
                    LOAN_POL_NO: POL_NO
                }
            }
        };
        addOrUpdateMRV(payload, editMRVId ? editMRV : saveMRV);
    };

    const handleInitData = response => {
        const orderedData = sortObjectByPFDSeqNo(response);
        setFormMRV({ [root]: orderedData[root] });
        setFormMRVInitialValues({ [root]: orderedData[root] });
    };

    useEffect(() => {
        handleInitData(ClaimsJson);
    }, []);

    // useEffect(() => {
    //     if (title === 'Claim Cover' && formValues !== null) {
    //         if (!Object.prototype.hasOwnProperty.call(dropDown, 'CE_COVER_CODE')) {
    //             const PFD_PARAM_2 = ['CE_COVER_CODE'];
    //             const valueKey = {
    //                 PEMP_ID: formValues?.CH_ASSR_CODE,
    //                 POL_NO: selectedPolicy,
    //             };
    //             const valueQueryId = { CE_COVER_CODE: 127 };
    //             apiCallsParamLov(PFD_PARAM_2, valueKey, valueQueryId);
    //         }
    //     }
    // }, [formValues]);

    const handleChangeValue = (value, path, setFieldValue, values) => {
        setFieldValue(path, value);
    };

    const resetForm = () => {
        setEditMRVId('');
        handleInitData(ClaimsJson);
    };

    const handleEdit = async item => {
        try {
            const response = await mrvGetById('', {
                screenCode,
                screenName,
                tranId: item?.ID,
            });
            //  if (response?.status === 'SUCCESS') {
            setEditMRVId(item?.ID);
            handleInitData(response?.Data);
            //  } else if (response?.status === 'FAILURE') {
            //   showNotification.ERROR(response?.status_msg);
            //  }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    const apiCallsParamLov = (PFD_PARAM_2, valueKey, valueQueryId) => {
        const promises = PFD_PARAM_2.map(item => {
            const queryParams = { queryId: valueQueryId[item], ...valueKey };
            return getParamLov('', queryParams);
        });

        Promise.all(promises)
            .then(responses => {
                if (responses[0].status === 'SUCCESS') {
                    const mergedData = mergeDropdownData(responses);
                    setDropDown(prevDropdown => {
                        return { ...prevDropdown, ...mergedData };
                    });
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleOnBlur = (currentData, values) => {
        console.log("handleOnBlur")
        // if (currentData.hasOwnProperty('PFD_PARAM_2')) {
        // if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_2')) {
        //     const PFD_PARAM_2 = currentData?.PFD_PARAM_2.split(',');
        //     const PFD_PARAM_3 = currentData?.PFD_PARAM_3.split(',');
        //     const valueKey = extractValues(PFD_PARAM_3, values, 'PFD_FLD_VALUE');
        //     const valueQueryId = extractValues(PFD_PARAM_2, formValues, 'PFD_PARAM_1');
        //     apiCallsParamLov(PFD_PARAM_2, valueKey, valueQueryId);
        // }
    };

    const handleBack = () => {
        setShowDisbursal(false)
    }

    return (
        <div className='grid grid-cols-8'>
            {loader && <Loader />}

            <div className='propasal-entry-form col-span-8 grid grid-cols-7'>
                <div className='col-span-8 mt-1'>
                    {formMRV && Object.prototype.hasOwnProperty.call(formMRV, root) && (
                        <FormPage
                            initialValues={formMRVInitialValues}
                            formRender={formMRV}
                            root={root}
                            lovList={dropDown}
                            onSubmit={onSubmit}
                            handleChangeValue={handleChangeValue}
                            resetForm={resetForm}
                            handleOnBlur={handleOnBlur}
                            addOrUpdate={!!editMRVId}
                            smallFont={true}
                            title={title}
                            action={action}
                            freeze={freeze}
                            formInit={formInit}
                            handleBack={handleBack}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormCreate;
