import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import FieldWithValue from '../fieldsWithValues/FieldWithValue';
import { createYupSchema } from '../commonHelper/SchemaGenerator';

const MainForm = ({
 initialValues,
 formRender,
 root,
 onSubmit,
 handleChangeValue,
 grid = '2',
}) => {
 const [validation, setValidation] = useState(null);

 useEffect(() => {
  const validationSchema = createYupSchema({
   frontForm: formRender?.frontForm,
  });
  setValidation(validationSchema);
 }, [initialValues, formRender]);

 return (
  <>
   {validation !== null && (
    <Formik
     initialValues={initialValues}
     values={initialValues}
    //  validationSchema={validation}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue }) => {
      // console.log('values : ', values);
      return (
       <Form onSubmit={handleSubmit}>
        <div className={`items-center grid grid-cols-${grid} gap-0`}>
         {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
          const dataId =
           formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
          return useMemo(
           () => (
            <div key={dataId} data-id={dataId}>
             <FieldWithValue
              currentData={formRender?.[root]?.formFields[fieldKey]}
              values={values}
              setFieldValue={setFieldValue}
              handleChangeValue={handleChangeValue}
              parent={root}
             />
            </div>
           ),
           [values?.[root]?.formFields[fieldKey]],
          );
         })}
        </div>

        <div className='w-full mt-5 mb-5 submit-button-form'>
         <button className='reset'>Reset</button>
         <button type='submit' className='save ml-9'>
          Submit
         </button>
        </div>
       </Form>
      );
     }}
    </Formik>
   )}
  </>
 );
};

export default MainForm;
