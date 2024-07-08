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

 const onBlurHandler = (currentData, values) => {
  if (handleOnBlur) {
   handleOnBlur(currentData, values);
  }
 };

 return (
  <div className='col-span-1 grid grid-cols-3 items-center'>
   <div className='col-span-1'>
    <p
     className={`${
      smallFont ? 'label_small_font' : 'label-font'
     }  select-none`}>
     {PFD_FLD_NAME}
     {PFD_MANDATORY_YN && <span className='mandatory-symbol'>*</span>}
    </p>
   </div>
   <div className='col-span-2 input-container fields-error pe-3'>
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
         onBlur={() => onBlurHandler(currentData, values)}
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
         size='medium'
         onBlur={() => onBlurHandler(currentData, values)}
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
       return (
        <CustomNumberField
         firstFieldRef={firstFieldRef}
         name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
         placeholder={PFD_HINT}
         size='medium'
         value={value?.PFD_FLD_VALUE}
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
       );
      case 'codedesc':
       return (
        <CustomDropDown
         name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
         options={lovData}
         firstFieldRef={firstFieldRef}
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
