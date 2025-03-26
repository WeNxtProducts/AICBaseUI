import React, { useMemo } from 'react';
import {
    CustomDatePicker,
    CustomInput,
    CustomNumberField,
    CustomSelect,
    CodeWithNumber,
    CustomTextArea,
    CustomPasswordField,
    CustomDropDown,
} from '../../../components/commonExportsFields/CommonExportsFields';
import { ErrorMessage } from 'formik';
import CustomCheckList from '../../../components/customCheckList/CustomCheckList';

const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined;
        }
    }
    return value;
};

const QuoteFieldWithValue = ({
    currentData,
    values,
    setFieldValue,
    parent,
    handleChangeValue,
    firstFieldRef = null,
    lovData = [],
    handleOnBlur,
    handleOnSearch,
    smallFont = false,
    freeze = false,
}) => {
    const {
        PFD_FLD_NAME,
        PFD_COLUMN_NAME,
        PFD_DATA_TYPE,
        PFD_MANDATORY_YN,
        PFD_HINT,
        PFD_EDIT_YN,
        PFD_HIDE_YN,
    } = currentData;

    const memoizedGetNestedValue = useMemo(() => getNestedValue, []);

    const onBlurHandler = (currentData, values, setFieldValue, val, label) => {
        if (handleOnBlur) {
            handleOnBlur(currentData, values, setFieldValue, val, label);
        }
    };

    const onHandleSearch = (currentData, values, setFieldValue, val) => {
        if (handleOnBlur) {
            handleOnSearch(currentData, values, setFieldValue, val);
        }
    };

    return (
        <div className='current-field col-span-1 items-center'>
            <div className='w-full'>
                <p className={`${smallFont ? 'label_small_font' : 'label-font'}  select-none`}>
                    {PFD_FLD_NAME}
                    {PFD_MANDATORY_YN && <span className='mandatory-symbol'>*</span>}
                </p>
            </div>
            <div className='input-container fields-error w-full mt-1'>
                {(() => {
                    const mainPath = `${parent}.formFields.${PFD_COLUMN_NAME}`;
                    const value = memoizedGetNestedValue(values, mainPath);
                    switch (PFD_DATA_TYPE) {
                        case 'text':
                            return (
                                <CustomInput
                                    //  value={values[parent]?.formFields[PFD_COLUMN_NAME]?.PFD_FLD_VALUE}
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    firstFieldRef={firstFieldRef}
                                    placeholder={PFD_HINT}
                                    value={value?.PFD_FLD_VALUE}
                                    readOnly={freeze}
                                    size='large'
                                    disabled={!PFD_EDIT_YN}
                                    onBlur={e => {
                                        // e.target.focus()
                                        onBlurHandler(currentData, values, setFieldValue, e.target.value, '');
                                    }}
                                    onChange={e => {
                                        handleChangeValue(
                                            e.target.value,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                            PFD_COLUMN_NAME,
                                        );
                                    }}
                                />
                            );
                        case 'lov':
                        case 'searchlov':
                        case 'paramlov':
                            return (
                                <CustomSelect
                                    firstFieldRef={firstFieldRef}
                                    options={lovData}
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    readOnly={freeze}
                                    placeholder={PFD_HINT}
                                    onSearch={e => {
                                        onHandleSearch(currentData, values, setFieldValue, e);
                                    }}
                                    size='large'
                                    onBlur={e => {
                                        onBlurHandler(currentData, values, setFieldValue, e, '');
                                    }}
                                    disabled={!PFD_EDIT_YN}
                                    showSearch={['searchlov', 'paramlov'].includes(PFD_DATA_TYPE)}
                                    value={value?.PFD_FLD_VALUE || undefined}
                                    onChange={e => {
                                        handleChangeValue(
                                            e,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                            PFD_COLUMN_NAME,
                                        );
                                    }}
                                />
                            );
                        case 'number':
                        case 'amount':
                            return (
                                <CustomNumberField
                                    firstFieldRef={firstFieldRef}
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    placeholder={PFD_HINT}
                                    format={PFD_DATA_TYPE}
                                    onBlur={e => {
                                        onBlurHandler(currentData, values, setFieldValue, e.target.value, '');
                                    }}
                                    size='large'
                                    readOnly={freeze}
                                    value={value?.PFD_FLD_VALUE}
                                    disabled={!PFD_EDIT_YN}
                                    onChange={e => {
                                        handleChangeValue(
                                            e.target.value,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                        );
                                    }}
                                />
                            );
                        case 'codedesc':
                        case 'codedescsearch':
                            return (
                                <CustomDropDown
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    options={lovData}
                                    firstFieldRef={firstFieldRef}
                                    readOnly={freeze}
                                    onBlur={(e, label) => {
                                        onBlurHandler(currentData, values, setFieldValue, e, label);
                                    }}
                                    onSearch={e => {
                                        onHandleSearch(currentData, values, setFieldValue, e);
                                    }}
                                    size='large'
                                    format={PFD_DATA_TYPE}
                                    value={value?.PFD_FLD_VALUE || undefined}
                                    disabled={!PFD_EDIT_YN}
                                    onChange={e => {
                                        handleChangeValue(
                                            e,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                        );
                                    }}
                                />
                            );
                        case 'date':
                            return (
                                <CustomDatePicker
                                    firstFieldRef={firstFieldRef}
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    placeholder={PFD_HINT}
                                    size='large'
                                    readOnly={freeze}
                                    value={value?.PFD_FLD_VALUE}
                                    disabled={!PFD_EDIT_YN}
                                    onBlur={date => {
                                        onBlurHandler(currentData, values, setFieldValue, date, '');
                                    }}
                                    onChange={date => {
                                        handleChangeValue(
                                            date,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                            PFD_COLUMN_NAME,
                                        );
                                    }}
                                />
                            );
                        case 'phonenumber':
                            return (
                                <CodeWithNumber
                                    firstFieldRef={firstFieldRef}
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    value={value?.PFD_FLD_VALUE}
                                    size='large'
                                    disabled={!PFD_EDIT_YN}
                                    onChange={value => {
                                        handleChangeValue(
                                            value,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                        );
                                    }}
                                />
                            );
                        case 'textarea':
                            return (
                                <CustomTextArea
                                    firstFieldRef={firstFieldRef}
                                    value={value?.PFD_FLD_VALUE}
                                    placeholder={PFD_HINT}
                                    readOnly={freeze}
                                    size='large'
                                    disabled={!PFD_EDIT_YN}
                                    onChange={e => {
                                        handleChangeValue(
                                            e.target.value,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                        );
                                    }}
                                />
                            );
                        case 'password':
                            return (
                                <CustomPasswordField
                                    firstFieldRef={firstFieldRef}
                                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                                    placeholder={PFD_HINT}
                                    value={value.PFD_FLD_VALUE}
                                    disabled={!PFD_EDIT_YN}
                                    size='large'
                                    onChange={e => {
                                        handleChangeValue(
                                            e.target.value,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                        );
                                    }}
                                />
                            );
                        case 'multiselect':
                            return (
                                <CustomCheckList
                                    options={lovData}
                                    size='large'
                                    value={value.PFD_FLD_VALUE ?? []}
                                    onChange={e => {
                                        handleChangeValue(
                                            e,
                                            `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                                            setFieldValue,
                                            parent,
                                            values,
                                            currentData,
                                        );
                                    }}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
                <ErrorMessage
                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                    component='div'
                    className='error-message'
                />
            </div>
        </div>
    );
};

export default QuoteFieldWithValue;
