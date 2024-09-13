import React, { useMemo } from 'react';
import {
 CustomDatePicker,
 CustomInput,
} from '../../../components/commonExportsFields/CommonExportsFields';

const ClaimFieldRender = ({ fieldInfo, handleChangeValue, values, keyField }) => {
 const { PFD_FLD_NAME, PFD_COLUMN_NAME, PFD_DATA_TYPE, PFD_MANDATORY_YN, PFD_HINT, PFD_EDIT_YN } =
  fieldInfo;

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
         name={`${PFD_FLD_NAME}`}
         placeholder={PFD_HINT}
         value={values?.formFields[PFD_COLUMN_NAME]?.PFD_FLD_VALUE}
         disabled={!PFD_EDIT_YN}
         onChange={e => {
          handleChangeValue(e.target.value, keyField, PFD_COLUMN_NAME);
         }}
        />
       );
      case 'date':
       return (
        <CustomDatePicker
         name={`${PFD_FLD_NAME}`}
         placeholder={PFD_HINT}
         size='medium'
         value={values?.formFields[PFD_COLUMN_NAME]?.PFD_FLD_VALUE}
         disabled={!PFD_EDIT_YN}
         onChange={date => {
          handleChangeValue(date, keyField, PFD_COLUMN_NAME);
         }}
        />
       );
      default:
       return null;
     }
    })()}
   </div>
  </div>
 );
};

export default ClaimFieldRender;
