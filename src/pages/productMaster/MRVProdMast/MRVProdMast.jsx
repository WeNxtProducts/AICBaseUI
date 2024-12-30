import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../components/mrvListing/useMRVListing';
import useParamLov from '../../../components/useParamLov/useParamLov';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import { deepCopy, extractFieldValuesInPlace } from '../../../components/commonHelper/DataSend';
import { getQueryId } from '../../../components/commonHelper/QueryIdFetch';
import { mergeDropdownData } from '../../../components/commonHelper/ParamLov';
import Loader from '../../../components/loader/Loader';
import { CustomMediaUpload } from '../../../components/commonExportsFields/CommonExportsFields';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import { ProductMasterContext } from '../ProductMaster';
import MRVProdMastForm from './MRVProdMastForm';
import MRVListProdMast from './MRVListProdMast';


const MRVProdMast = ({
    tranId,
    queryID,
    root,
    mrvGet,
    screenCode,
    screenName,
    saveRow,
    editRow,
    deleteRow,
    title,
    action = true,
    isView = true,
    isEdit = true,
    isDelete = true,
    subId = '',
    medicalId = '',
    schemaValidation
}) => {
    const { GroupLifeJSON, formValues, setDropDown, dropDown, freeze = false
        , handleNext, userRules, isPremCalc, proRules } =
        useContext(ProductMasterContext);
    const { mrvListingId } = GroupLifeJSON;
    const { rowData, columnData, handleMRVListing } = useMRVListing();
    const { onSearch } = useParamLov();
    const mrvGetById = useApiRequests(mrvGet, 'GET');
    const getParamLov = useApiRequests('getParamLov', 'GET');
    const saveMRV = useApiRequests(saveRow, 'POST');
    const editMRV = useApiRequests(editRow, 'POST');
    const deleteMRV = useApiRequests(deleteRow, 'POST');
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const [groupLifeMRV, setGroupLifeMRV] = useState(null);
    const [groupLifeMRVInitialValues, setGroupLifeMRVInitialValues] = useState(null);
    const [editMRVId, setEditMRVId] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [loader, setLoader] = useState(false);
    const [formInit, setFormInit] = useState(false);
    const [modalType, setModalType] = useState('');

    const onSubmit = values => {
        const val = deepCopy(values);
        const modifiedData = extractFieldValuesInPlace(val);
        const payload = { [root]: { formFields: modifiedData[root]?.formFields } };
        console.log("payload : ", payload)
    };

    const handleInitData = async response => {
        const orderedData = sortObjectByPFDSeqNo(response);
        setGroupLifeMRV({ [root]: orderedData[root] });
        setGroupLifeMRVInitialValues({ [root]: orderedData[root] });
    };

    const MRVListing = () => {
        if (tranId) {
            const queryId = getQueryId(queryID, mrvListingId);
            handleMRVListing(queryId, tranId, subId, medicalId);
        }
    };

    useEffect(() => {
        setEditMRVId('');
        MRVListing();
        handleInitData(GroupLifeJSON);
    }, [tranId, subId, freeze, isPremCalc]);

    const handleChangeValue = (value, path, setFieldValue, values) => {
        setFieldValue(path, value);
    };

    const resetForm = () => {
        setEditMRVId('');
        handleInitData(GroupLifeJSON);
    };

    const handleEdit = async item => {
        try {
            const response = await mrvGetById('', {
                screenCode,
                screenName,
                tranId: item?.ID,
            });
            setEditMRVId(item?.ID);
            handleInitData(response?.Data);
        } catch (err) {
            console.log('err : ', err);
        }
    };

    const handleDeleteConfirm = async id => {
        setLoader(true);
        try {
            const response = await deleteMRV('', {}, { id });
            if (response?.status === 'SUCCESS') {
                MRVListing();
                if (id === editMRVId) resetForm();
                showNotification.SUCCESS(response?.status_msg);
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            }
            setEditMRVId('');
            setDeleteConfirmation(false);
            setLoader(false);
        } catch (err) {
            console.log('err  : ', err);
        }
    };

    const handleClose = status => {
        const deleteId = editMRVId;
        // setEditMRVId('');
        if (status) handleDeleteConfirm(deleteId);
        else if (!status) setDeleteConfirmation(false);
    };

    const handleDelete = item => {
        setEditMRVId(item?.ID);
        setDeleteConfirmation(true);
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

    const procedureCall = async (height, weight) => {
        const payload = {
            inParams: {
                P_HEIGHT: height,
                P_WEIGHT: weight,
                P_HEIGHT_UNIT: 'CM',
                P_WEIGHT_UNIT: 'KG',
            },
        };
        try {
            const response = await invokeClaimsProcedure(payload, {
                procedureName: 'PR_BMI_CALC',
                packageName: 'WNPKG_COMMON',
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
                return null;
            } else if (response?.status === 'SUCCESS') {
                return response?.Data?.P_BMI;
            }
        } catch (err) {
            setLoader(false);
            return null;
        }
    };

    const handleGetData = async (payload, qId) => {
        try {
            const response = await getMapQuery(payload, { queryId: qId });
            if (response?.status === 'SUCCESS') {
                return response?.Data[0];
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            console.log('err  : ', err);
        }
    };

    const changeState = (root, field, key, value) => {
        setGroupLifeMRV(prevState => ({
            ...prevState,
            [root]: {
                ...prevState[root],
                formFields: {
                    ...prevState[root].formFields,
                    [field]: {
                        ...prevState[root].formFields[field],
                        [key]: value,
                    },
                },
            },
        }));
    };

    const procedureCallAgeCheck = async (payload) => {
        try {
            const response = await invokeClaimsProcedure(payload,
                { procedureName: 'PR_AGE_CAL' }
            );
            if (response?.status === "SUCCESS") {
                const { PROD_MAX_AGE } = proRules
                const { P_AGE } = response.Data
                if (P_AGE) {
                    if (P_AGE <= PROD_MAX_AGE) {
                        return true
                    } else if (P_AGE > PROD_MAX_AGE) {
                        showNotification.WARNING(`Assured code age should be less than ${PROD_MAX_AGE}`);
                        return false
                    }
                }
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
                return false
            }
            setLoader(false);
        } catch (err) {
            setLoader(false);
        }
    };

    const commonAgeCheck = async (val, setFieldValue, POL_FM_DT) => {
        if (val && POL_FM_DT?.PFD_FLD_VALUE) {
            const payload = {
                inParams: { P_ASSR_CODE: val, P_START_DT: POL_FM_DT?.PFD_FLD_VALUE }
            }
            const validateAge = await procedureCallAgeCheck(payload);
            if (!validateAge) {
                setFieldValue('life_assured_details.formFields.PEMP_ID.PFD_FLD_VALUE', '');
                setFieldValue('life_assured_details.formFields.PEMP_NAME.PFD_FLD_VALUE', '');
            } else if (validateAge) {
                const payload = { queryParams: { CUST_CODE: val } };
                const response = await handleGetData(payload, 190);
                for (let key in response) {
                    if (Object.prototype.hasOwnProperty.call(response, key)) {
                        setFieldValue(`life_assured_details.formFields.${key}.PFD_FLD_VALUE`, response[key]);
                    }
                }
            }
        }
    }

    const handleOnBlur = async (currentData, values, setFieldValue, val, label) => {
        console.log("Blur")
    };

    const handleCardActions = (type, item) => {
        handleEdit(item);
        setEditMRVId(item?.ID);
        setModalType(type);
    };

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    const handleOnSearch = async (currentData, values, setFieldValue, val) => {
        const key = currentData?.PFD_COLUMN_NAME;
        if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_4')) {
            if (
                [
                    'PGBEN_BNF_CODE',
                    //  'PCHRG_CODE',
                    'PDL_DISC_LOAD_CODE',
                    'PDL_COVER_CODE',
                    'PEMP_ID',
                    'PEC_COVER_CODE',
                ].includes(key)
            ) {
                let payload;
                if (key === 'PDL_DISC_LOAD_CODE') {
                    payload = {
                        type: values?.Discount_Loading?.formFields?.PDL_DISC_LOAD_TYPE?.PFD_FLD_VALUE || '',
                    };
                } else if (key === 'PDL_COVER_CODE' || key === 'PEC_COVER_CODE') {
                    payload = { tranId };
                }

                if (val?.length > 0) {
                    const response = await onSearch(currentData?.PFD_PARAM_4, val, payload);
                    setDropDown(prev => ({
                        ...prev,
                        [key]: response?.Data?.[key],
                    }));
                }
            }
        }
    };

    return (
        <div className='front-form claim-cover grid grid-cols-8 gap-1'>
            {loader && <Loader />}
            <div className='propasal-entry-form col-span-8 grid grid-cols-9'>
                <div className={`col-span-${hasValidRowData(rowData) ? '7' : '9'} mt-1`}>
                    {groupLifeMRV && Object.prototype.hasOwnProperty.call(groupLifeMRV, root) && (
                        <>
                            <MRVProdMastForm
                                initialValues={groupLifeMRVInitialValues}
                                formRender={groupLifeMRV}
                                schemaValidation={schemaValidation}
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
                                handleOnSearch={handleOnSearch}
                                formInit={formInit}
                                imageData={{
                                    DocType: 'proposal_medical', TranId: '1', module: 'medical', dms_status: 'N',
                                    screenName: 'DMS', uploadscrn: 'MEDICAL'
                                }}
                            />
                            {medicalId && editMRVId &&
                                <CustomMediaUpload imageData={{
                                    DocType: 'proposal_medical', TranId: editMRVId, module: 'medical', dms_status: 'N',
                                    screenName: 'DMS', uploadscrn: 'MEDICAL'
                                }} />
                            }
                        </>
                    )}
                </div>
                {hasValidRowData(rowData) && (
                    <div className='col-span-2 p-3 border_left_divider'>
                        <MRVListProdMast
                            root={root}
                            tableColumn={columnData}
                            tableData={rowData}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            selectedRow={editMRVId}
                            action={action}
                            isView={isView}
                            isEdit={isEdit}
                            isDelete={isDelete}
                            freeze={freeze}
                            handleCardActions={handleCardActions}
                            isPremCalc={isPremCalc}
                        />
                    </div>
                )}
            </div>
            {deleteConfirmation && <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />}
        </div>
    );
};

export default MRVProdMast;
