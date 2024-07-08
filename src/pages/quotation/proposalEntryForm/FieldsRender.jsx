import React, { useEffect, useMemo, useState } from 'react';
import FieldWithValue from '../../../components/fieldsWithValues/FieldWithValue';

const FieldsRender = ({
 proposalEntry,
 values,
 setFieldValue,
 handleChangeValue,
 parent,
 renderPath,
}) => {
 const [currentPath, setCurrentPath] = useState('');

 function getNestedValue(obj, path) {
  const keys = path.split('.');
  let value = obj;
  for (const key of keys) {
   if (value && typeof value === 'object' && key in value) value = value[key];
   else return undefined;
  }
  return value;
 }

 useEffect(() => {
  setCurrentPath(getNestedValue(proposalEntry, parent));
 }, []);

 return (
  <div className='items-center grid grid-cols-2 gap-0'>
   {currentPath &&
    Object.keys(proposalEntry?.[currentPath]?.formFields).map(fieldKey => {
     const dataId =
      proposalEntry?.[currentPath]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
     return useMemo(
      () => (
       <div key={dataId} data-id={dataId}>
        <FieldWithValue
         currentData={proposalEntry?.[currentPath]?.formFields[fieldKey]}
         values={values}
         setFieldValue={setFieldValue}
         handleChangeValue={handleChangeValue}
         parent={parent}
        />
       </div>
      ),
      [values?.[currentPath]?.formFields[fieldKey]?.PFD_FLD_VALUE],
     );
    })}
  </div>
 );
};

export default FieldsRender;
