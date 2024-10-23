import React, { useMemo } from 'react';
import { ErrorMessage } from 'formik';
import {
  CustomInput,
  CustomDatePicker,
  CustomNumberField,
  CustomSelect,
  CodeWithNumber,
  CustomTextArea,
  CustomPasswordField,
  CustomDropDown,
  CustomMediaUpload
} from '../../../../components/commonExportsFields/CommonExportsFields';

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

const QuotationFieldWithValue = ({
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
  imageData = null
}) => {
  const { PFD_FLD_NAME, PFD_COLUMN_NAME, PFD_DATA_TYPE, PFD_MANDATORY_YN, PFD_HINT, PFD_EDIT_YN } =
    currentData;

  const memoizedGetNestedValue = useMemo(() => getNestedValue, []);

  const onBlurHandler = (currentData, values, setFieldValue, val, label = '') => {
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
    <div className='col-span-1 grid grid-cols-3 items-center'>
      {PFD_DATA_TYPE !== 'media' &&
        <div className='col-span-1'>
          <p className={`${smallFont ? 'label_small_font' : 'label-font'}  select-none`}>
            {PFD_FLD_NAME}
            {PFD_MANDATORY_YN && <span className='mandatory-symbol'>*</span>}
          </p>
        </div>
      }
      <div className={`col-span-${PFD_DATA_TYPE !== 'media' ? 2 : 3} input-container fields-error pe-3`}>
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
                  disabled={!PFD_EDIT_YN}
                  readOnly={freeze}
                  onBlur={e => {
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
                  placeholder={PFD_HINT}
                  onSearch={e => {
                    onHandleSearch(currentData, values, setFieldValue, e);
                  }}
                  size='medium'
                  onBlur={e => {
                    onBlurHandler(currentData, values, setFieldValue, e);
                  }}
                  disabled={!PFD_EDIT_YN}
                  readOnly={freeze}
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
                    );
                  }}
                />
              );
            case 'number':
            case 'amount':
              return (
                <div className='flex items-center'>
                  <CustomNumberField
                    firstFieldRef={firstFieldRef}
                    name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                    placeholder={PFD_HINT}
                    size='medium'
                    format={PFD_DATA_TYPE}
                    value={value?.PFD_FLD_VALUE}
                    onBlur={e => {
                      onBlurHandler(currentData, values, setFieldValue, e.target.value, '');
                    }}
                    // onBlur={e => onBlurHandler(currentData, values, setFieldValue, e)}
                    readOnly={freeze}
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
                  {(PFD_COLUMN_NAME === 'PEMP_HEIGHT' || PFD_COLUMN_NAME === 'PEMP_WEIGHT') && (
                    <p className='ml-2'>{PFD_COLUMN_NAME === 'PEMP_HEIGHT' ? 'Cms' : 'Kgs'}</p>
                  )}
                </div>
              );
            case 'codedesc':
            case 'codedescsearch':
              return (
                <CustomDropDown
                  name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
                  options={lovData}
                  firstFieldRef={firstFieldRef}
                  format={PFD_DATA_TYPE}
                  readOnly={freeze}
                  onBlur={(e, label) => {
                    onBlurHandler(currentData, values, setFieldValue, e, label);
                  }}
                  onSearch={e => {
                    onHandleSearch(currentData, values, setFieldValue, e);
                  }}
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
                  size='medium'
                  readOnly={freeze}
                  onBlur={date => {
                    onBlurHandler(currentData, values, setFieldValue, date, '');
                  }}
                  value={value?.PFD_FLD_VALUE}
                  disabled={!PFD_EDIT_YN}
                  onChange={date => {
                    handleChangeValue(
                      date,
                      `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
                      setFieldValue,
                      parent,
                      values,
                      currentData,
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
                  disabled={!PFD_EDIT_YN}
                  readOnly={freeze}
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
            case 'media':
              return (
                <CustomMediaUpload imageData={imageData} />
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

export default QuotationFieldWithValue;
