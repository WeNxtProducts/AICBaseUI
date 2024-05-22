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
 action = true,
 addOrUpdate,
 resetForm,
}) => {
 const [initValues, setInitValues] = useState(null);
 const [validation, setValidation] = useState(null);
 const [resetMain, setResetMain] = useState(false);

 useEffect(() => {
  console.log('resetMain');
  const validationSchema = createYupSchema({
   frontForm: formRender?.frontForm,
  });
  setValidation(validationSchema);

  if (addOrUpdate) {
   console.log('if');
   setInitValues(initialValues);
  } else {
   console.log('else');
   setInitValues(formRender);
  }
 }, [initialValues, formRender, initValues, resetMain]);

 return (
  <>
   {validation !== null && (
    <Formik
     initialValues={initValues}
     values={initValues}
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
            <React.Fragment key={dataId}>
             {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
              <div data-id={dataId}>
               <FieldWithValue
                currentData={formRender?.[root]?.formFields[fieldKey]}
                values={values}
                setFieldValue={setFieldValue}
                handleChangeValue={handleChangeValue}
                parent={root}
               />
              </div>
             )}
            </React.Fragment>
           ),
           [values?.[root]?.formFields[fieldKey]],
          );
         })}
        </div>
        {action && (
         <div className='w-full mt-5 mb-5 submit-button-form'>
          {!addOrUpdate && (
           <button type='button' onClick={() => resetForm()} className='reset'>
            Reset
           </button>
          )}
          <button
           type='button'
           onClick={() => setResetMain(!resetMain)}
           className='reset'>
           Reset check
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
