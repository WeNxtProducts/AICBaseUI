import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Radio, Tooltip } from 'antd';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import GrpQuoteForm from '../../GrpQuoteForm/GrpQuoteForm';
import Loader from '../../../../components/loader/Loader';
import { deepCopy, extractFieldValuesInPlace } from '../../../../components/commonHelper/DataSend';
import { setBasicInfoForm } from '../../../../globalStore/slices/QuoteSlice';
import { setLoader, setStepperIndex, setTranId } from '../../../../globalStore/slices/GroupQuoteSlice';
import PlanDetails from './PlanDetails';
import { plansListGroup, uploadOptions } from '../../GroupLifeQuoteConstants';
import EmployeeUpload from './EmployeeUpload';
import { CloudDownloadOutlined } from '@ant-design/icons';

const BasicInfoGrpQuote = () => {
    const dispatch = useDispatch();
    const { tranId, loader, basicInfoForm, dropDown } = useSelector(state => state?.grpQuote);
    const prodCode = useSelector(state => state?.quoteProdPlanCode?.prodCode);
    const LTQuoteSave = useApiRequests('LTQuoteSave', 'POST');
    const LTQuoteUpdate = useApiRequests('LTQuoteUpdate', 'POST');
    const [toggleOptions, setToggleOptions] = useState('n');

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
        // addOrUpdateBasicInfo(payload, tranId ? LTQuoteUpdate : LTQuoteSave, values);
        dispatch(setStepperIndex(1));
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

    const handleOnChange = (val) => {
        setToggleOptions(val);
    };

    const renderGrpBtn = () => (
        <div className="btn_grp_quote">
            <div className="center_radio">
                <Radio.Group
                    value={toggleOptions}
                    size="medium"
                    buttonStyle="solid"
                    disabled={false}
                    onChange={e => handleOnChange(e.target.value)}
                >
                    {uploadOptions.map(method => (
                        <Radio.Button key={method.value} value={method.value}>
                            {method.label}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </div>
            <Tooltip title="Download">
                <CloudDownloadOutlined className="download_btn" />
            </Tooltip>
        </div>
    );


    return (
        <div className='mt-2 basic_information'>
            {loader && <Loader />}
            <p>Basic Information</p>
            {basicInfoForm !== null && dropDown !== null && (
                <div className='basic_info_form'>
                    <GrpQuoteForm
                        initialValues={basicInfoForm}
                        formRender={basicInfoForm}
                        root='frontForm'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={false}
                        btnText={{ btn1: 'Get Quote' }}
                        // validationSchema={basicInfoSchema}
                        freeze={false}
                    >
                        <PlanDetails planList={plansListGroup} />
                        <EmployeeUpload toggleOptions={toggleOptions}>
                            {renderGrpBtn()}
                        </EmployeeUpload>
                    </GrpQuoteForm>
                </div>
            )}
        </div>
    )
}

export default BasicInfoGrpQuote