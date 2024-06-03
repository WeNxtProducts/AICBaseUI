import React, { useMemo } from 'react';
import { CustomDatePicker } from '../../../components/commonExportsFields/CommonExportsFields';

const ClaimFieldRender = ({ fieldInfo, handleChangeValue, values }) => {
 const {
  PFD_FLD_NAME,
  PFD_COLUMN_NAME,
  PFD_DATA_TYPE,
  PFD_MANDATORY_YN,
  PFD_HINT,
  PFD_EDIT_YN,
  PFD_HIDE_YN,
 } = fieldInfo;

 console.log('values : ', values);

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
      case 'date':
       return (
        <CustomDatePicker
         name={`${parent}.formFields.${PFD_COLUMN_NAME}.PFD_FLD_VALUE`}
         placeholder={PFD_HINT}
         size='medium'
        //  value={value?.PFD_FLD_VALUE}
         disabled={!PFD_EDIT_YN}
         onChange={date => {
          handleChangeValue(date, `check`);
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
