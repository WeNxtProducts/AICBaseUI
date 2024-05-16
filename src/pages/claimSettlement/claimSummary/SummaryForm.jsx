import React from 'react';
import FieldWithValue from '../../../components/fieldsWithValues/FieldWithValue';

const SummaryForm = ({
 values,
 setFieldValue,
 handleChangeValue,
 formData,
 root,
}) => {
 const { frontForm } = formData;
 const { formFields = {} } = formData[root];

 return (
  <div className={`items-center grid grid-cols-${2} gap-0`}>
   {Object.keys(formFields).map(fieldKey => {
    const dataId = formFields[fieldKey]?.PFD_COLUMN_NAME;
    return (
     <div key={dataId} data-id={dataId}>
      <FieldWithValue
       currentData={formFields[fieldKey]}
       values={values}
       setFieldValue={setFieldValue}
       parent={root}
       handleChangeValue={handleChangeValue}
      />
     </div>
    );
   })}
  </div>
 );
};

export default SummaryForm;
