import React, { useMemo } from 'react';
import {
 CustomDatePicker,
 CustomInput,
 CustomNumberField,
 CustomSelect,
 CodeWithNumber,
 CustomTextArea,
 CustomPasswordField,
} from '../commonExportsFields/CommonExportsFields';
import { ErrorMessage } from 'formik';
import CustomDropDown from '../customFieldComponents/customDropDown/CustomDropDown';

const getNestedValue = (obj, path) => {
 //  console.log('inside function');
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

const FieldWithValue = ({
 currentData,
 values,
 setFieldValue,
 parent,
 handleChangeValue,
 firstFieldRef = null,
 lovData = [],
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

 return (
  <div className='current-field p-2 flex items-center'>
   <div className='w-1/4'>
    <p className='label-font select-none'>
     {PFD_FLD_NAME}
     {PFD_MANDATORY_YN && <span className='mandatory-symbol'>*</span>}
    </p>
   </div>
   <div className='input-container fields-error w-3/4 pl-3'>
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
         onChange={e => {
          handleChangeValue(
           e.target.value,
           `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
           setFieldValue,
           parent,
           values,
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, e.target.value);
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
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, e);
         }}
        />
       );
      case 'number':
       return (
        <CustomNumberField
         firstFieldRef={firstFieldRef}
         name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
         placeholder={PFD_HINT}
         value={value?.PFD_FLD_VALUE}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          handleChangeValue(
           e.target.value,
           `${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`,
           setFieldValue,
           parent,
           values,
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, e.target.value);
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
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, e);
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
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, date);
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
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, value);
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
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, value);
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
          );
          // setFieldValue(`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`, e.target.value);
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

export default FieldWithValue;
