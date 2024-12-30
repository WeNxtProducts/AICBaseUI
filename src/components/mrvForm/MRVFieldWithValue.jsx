import React from 'react';
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

const MRVFieldWithValue = ({
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
     switch (PFD_DATA_TYPE) {
      case 'text':
       return (
        <CustomInput
         name={`${PFD_COLUMN_NAME}`}
         firstFieldRef={firstFieldRef}
         placeholder={PFD_HINT}
         value={values?.[PFD_COLUMN_NAME]}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          // setFieldValue(`${PFD_COLUMN_NAME}`, e.target.value);
          handleChangeValue(e.target.value, `${PFD_COLUMN_NAME}`, setFieldValue, values);
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
         name={`${PFD_COLUMN_NAME}`}
         placeholder={PFD_HINT}
         disabled={!PFD_EDIT_YN}
         showSearch={['searchlov', 'paramlov'].includes(PFD_DATA_TYPE)}
         value={values?.[PFD_COLUMN_NAME] || undefined}
         onChange={e => {
          handleChangeValue(e, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      case 'number':
       return (
        <CustomNumberField
         firstFieldRef={firstFieldRef}
         name={`${PFD_COLUMN_NAME}`}
         placeholder={PFD_HINT}
         value={values?.[PFD_COLUMN_NAME]}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          handleChangeValue(e.target.value, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      case 'codedesc':
       return (
        <CustomDropDown
         name={`${PFD_COLUMN_NAME}`}
         options={lovData}
         firstFieldRef={firstFieldRef}
         value={values?.[PFD_COLUMN_NAME] || undefined}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          handleChangeValue(e, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      case 'date':
       return (
        <CustomDatePicker
         firstFieldRef={firstFieldRef}
         name={`${PFD_COLUMN_NAME}`}
         placeholder={PFD_HINT}
         value={values?.[PFD_COLUMN_NAME]}
         disabled={!PFD_EDIT_YN}
         onChange={date => {
          handleChangeValue(date, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      case 'phonenumber':
       return (
        <CodeWithNumber
         firstFieldRef={firstFieldRef}
         name={`${PFD_COLUMN_NAME}`}
         value={values?.[PFD_COLUMN_NAME]}
         disabled={!PFD_EDIT_YN}
         onChange={value => {
          handleChangeValue(value, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      case 'textarea':
       return (
        <CustomTextArea
         firstFieldRef={firstFieldRef}
         value={values?.[PFD_COLUMN_NAME]}
         placeholder={PFD_HINT}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          handleChangeValue(e.target.value, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      case 'password':
       return (
        <CustomPasswordField
         firstFieldRef={firstFieldRef}
         name={`${PFD_COLUMN_NAME}`}
         placeholder={PFD_HINT}
         value={values?.[PFD_COLUMN_NAME]}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          handleChangeValue(e.target.value, `${PFD_COLUMN_NAME}`, setFieldValue, values);
         }}
        />
       );
      default:
       return null;
     }
    })()}
    <ErrorMessage name={`${PFD_COLUMN_NAME}`} component='div' className='error-message' />
   </div>
  </div>
 );
};

export default MRVFieldWithValue;
