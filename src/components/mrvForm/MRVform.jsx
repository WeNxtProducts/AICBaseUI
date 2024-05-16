import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import MRVFieldWithValue from './MRVFieldWithValue';
import { generateMRVValidationSchema } from '../commonHelper/SchemaGenerator';

const MRVform = ({
 initialValues,
 formRender,
 root,
 onSubmit,
 handleChangeValue,
 grid = '2',
 resetForm,
 isSubmit = true,
 lovObject = {},
}) => {
 const [initValues, setInitValues] = useState(null);
 const [validation, setVaidation] = useState(null);

 useEffect(() => {
  const validationSchema = generateMRVValidationSchema(
   formRender[root]?.formFields,
  );
  setVaidation(validationSchema);
  if (initialValues === null) {
   const simplifiedFormFields = {};
   for (const key in formRender[root]?.formFields) {
    simplifiedFormFields[key] = '';
   }
   setInitValues(simplifiedFormFields);
  } else {
   setInitValues(initialValues);
  }
 }, [initialValues]);

 return (
  <>
   {initValues !== null && validation !== null && (
    <Formik
     initialValues={initValues}
     values={initValues}
    //  validationSchema={validation}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue }) => {
      // console.log('values check : ', values);
      return (
       <Form onSubmit={handleSubmit}>
        <div className={`items-center grid grid-cols-${grid} gap-0`}>
         {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
          const dataId =
           formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
          return useMemo(
           () => (
            <div key={dataId} data-id={dataId}>
             <MRVFieldWithValue
              currentData={formRender?.[root]?.formFields[fieldKey]}
              values={values}
              setFieldValue={setFieldValue}
              handleChangeValue={handleChangeValue}
              lovData={lovObject?.[dataId]}
              parent={root}
             />
            </div>
           ),
           [values?.[fieldKey]],
          );
         })}
        </div>
        {isSubmit && (
         <div className='w-full mt-5 mb-5 submit-button-MRV'>
          <button type='button' onClick={() => resetForm()} className='reset'>
           Reset
          </button>
          <button type='submit' className='save ml-9'>
           Submit
          </button>
         </div>
        )}
       </Form>
      );
     }}
    </Formik>
   )}
  </>
 );
};

export default MRVform;
