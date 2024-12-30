import React, { useState } from 'react';
import summaryJson from '../../../getFormFields/process.json';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../../components/fieldsWithValues/FieldWithValue';

const TotalFieldsSummary = () => {
 const [totalSummary, setTotalSummary] = useState(summaryJson);
 const [totalSummaryInitialValues, setTotalSummaryInitialValues] = useState(summaryJson);

 const onSubmit = async values => {
  //handleNext();
  console.log('values : ', values);
 };

 return (
  <div className='mt-1 mb-5'>
   <Formik
    initialValues={totalSummaryInitialValues}
    values={totalSummaryInitialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}>
    {({ handleSubmit, values, setFieldValue }) => {
     return (
      <Form onSubmit={handleSubmit}>
       <div className={`items-center grid grid-cols-${2} gap-0`}>
        {Object.keys(totalSummary?.summary?.formFields).map(fieldKey => {
         const dataId = totalSummary?.summary?.formFields[fieldKey]?.PFD_COLUMN_NAME;
         return (
          <React.Fragment key={dataId}>
           <div data-id={dataId}>
            <FieldWithValue
             currentData={totalSummary?.summary?.formFields[fieldKey]}
             values={values}
             setFieldValue={setFieldValue}
             parent='summary'
            />
           </div>
          </React.Fragment>
         );
        })}
       </div>
       <div className='mt-5 flex justify-center'>
        <button className='process_button' type='submit'>
         Process
        </button>
       </div>
      </Form>
     );
    }}
   </Formik>
  </div>
 );
};

export default TotalFieldsSummary;
