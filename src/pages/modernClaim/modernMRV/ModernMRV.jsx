/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import ModernMRVFieldWithValue from './ModernMRVFieldWithValue';
import { createYupSchema } from '../../../components/commonHelper/SchemaGenerator';
import { Button } from 'antd';

const ModernMRV = ({
 initialValues,
 formRender,
 root,
 onSubmit,
 handleChangeValue,
 grid = '2',
 action = true,
 addOrUpdate,
 resetForm: formReset,
 lovList,
 handleOnBlur,
 smallFont = false,
 title = '',
}) => {
 const [initValues, setInitValues] = useState(null);
 const [validation, setValidation] = useState(null);
 const [loader, setLoader] = useState(false);

 useEffect(() => {
  const validationSchema = createYupSchema({
   [root]: formRender[root],
  });
  setValidation(validationSchema);
  setInitValues(initialValues);
 }, [formRender, initialValues, root]);

 return (
  <>
   {validation !== null && (
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
        <div className='mb-4 flex items-center justify-between'>
         <p className='mrv_header'>{title}</p>
         {action && (
          <Button
           className='add-buttons me-5'
           type='primary'
           onClick={() => {
            if (addOrUpdate) formReset();
            else resetForm();
           }}
           icon={<i className='bi bi-plus icon-style' />}>
           Add New
          </Button>
         )}
        </div>

        <div className={`items-center grid grid-cols-${grid} gap-y-3`}>
         {title === 'Claim Covers' && (
          <>
           <div className='col-span-1 grid grid-cols-3 items-center mb-2'>
            <div className='col-span-1'>
             <p className={`label_small_font select-none`}>Cover Code</p>
            </div>
            <div className='col-span-2 pe-3'>
             <p className='cover_code_number'>A34R45T565R</p>
            </div>
           </div>
           <div className='col-span-1' />
          </>
         )}
         {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
          const dataId =
           formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
          return useMemo(() => {
           return (
            <React.Fragment key={dataId}>
             {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
              <div data-id={dataId}>
               <ModernMRVFieldWithValue
                currentData={formRender?.[root]?.formFields[fieldKey]}
                values={values}
                setFieldValue={setFieldValue}
                handleOnBlur={handleOnBlur}
                lovData={lovList?.[dataId]}
                handleChangeValue={handleChangeValue}
                parent={root}
                smallFont={smallFont}
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
          {/* {addOrUpdate && (
           <button
            type='button'
            onClick={() => {
             // setInitValues(null);
             resetForm();
            }}
            className='reset'>
            Reset
           </button>
          )} */}
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

export default ModernMRV;
