/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import FieldWithValue from '../fieldsWithValues/FieldWithValue';
import { createYupSchema } from '../commonHelper/SchemaGenerator';

const MainForm = ({
 initialValues,
 formRender,
 root,
 onSubmit,
 handleChangeValue,
 grid = '2',
 action = true,
 addOrUpdate,
 lovList,
 handleOnBlur,
}) => {
 const [initValues, setInitValues] = useState(null);
 const [validation, setValidation] = useState(null);

 useEffect(() => {
  const validationSchema = createYupSchema({
   [root]: formRender[root],
  });
  setValidation(validationSchema);

  if (addOrUpdate) {
   setInitValues(initialValues);
  } else {
   setInitValues(formRender);
  }
 }, [initValues]);

 return (
  <>
   {initValues !== null && validation !== null && (
    <Formik
     initialValues={initValues}
     values={initValues}
     //validationSchema={validation}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue, resetForm }) => {
      //   console.log('values : ', values);
      return (
       <Form onSubmit={handleSubmit}>
        <div className={`items-center grid grid-cols-${grid} gap-0`}>
         {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
          const dataId =
           formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
          return useMemo(() => {
           return (
            <React.Fragment key={dataId}>
             {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
              <div data-id={dataId}>
               <FieldWithValue
                currentData={formRender?.[root]?.formFields[fieldKey]}
                values={values}
                setFieldValue={setFieldValue}
                lovData={lovList?.[dataId]}
                handleOnBlur={handleOnBlur}
                handleChangeValue={handleChangeValue}
                parent={root}
               />
              </div>
             )}
            </React.Fragment>
           );
          }, [values?.[root]?.formFields[fieldKey], lovList?.[dataId]]);
         })}
        </div>
        {action && (
         <div className='w-full mt-5 mb-5 submit-button-form'>
          <button
           type='button'
           onClick={() => {
            resetForm();
           }}
           className='reset'>
           Reset
          </button>
          <button type='submit' className='save ml-9'>
           {addOrUpdate ? 'Update' : 'Submit'}
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

export default MainForm;
