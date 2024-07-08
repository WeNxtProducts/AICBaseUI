import React, { useContext, useMemo, useState } from 'react';
import { Form, Formik } from 'formik';
import FieldWithValue from '../../../components/fieldsWithValues/FieldWithValue';
import { Checkbox } from 'antd';
import { StepperContext } from '../Quotation';

const FormFields = ({ proposalEntry, proposalEntryInitialValues }) => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useContext(StepperContext);
 const [policyFreeze, setPolicyFreeze] = useState(false);

 const onChange = e => {
  setPolicyFreeze(e.target.checked);
 };

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  // setFieldValue(
  //  `frontForm.section_2.formFields.user_initial.PFD_FLD_VALUE`,
  //  '123 check',
  // );
  setFieldValue(path, value);
 };

 return (
  <Formik
   initialValues={proposalEntryInitialValues}
   values={proposalEntryInitialValues}
   onSubmit={onSubmit}
   enableReinitialize={true}>
   {({ handleSubmit, values, setFieldValue }) => {
    // console.log('values : ', values);
    return (
     <Form onSubmit={handleSubmit}>
      <div className='items-center grid grid-cols-2 gap-0'>
       {Object.keys(proposalEntry?.frontForm?.section_1?.formFields).map(
        fieldKey => {
         const dataId =
          proposalEntry?.frontForm?.section_1?.formFields[fieldKey]
           ?.PFD_COLUMN_NAME;
         return useMemo(
          () => (
           <div key={dataId} data-id={dataId}>
            <FieldWithValue
             currentData={
              proposalEntry?.frontForm?.section_1?.formFields[fieldKey]
             }
             values={values}
             setFieldValue={setFieldValue}
             handleChangeValue={handleChangeValue}
             parent='frontForm.section_1'
            />
           </div>
          ),
          [
           values?.frontForm?.section_1?.formFields[fieldKey]?.PFD_FLD_VALUE,
           //  setFieldValue,
           //  proposalEntry,
           //  proposalEntryInitialValues,
          ],
         );
        },
       )}
      </div>

      <div className='flex items-center justify-between m-3'>
       <Checkbox checked={policyFreeze} onChange={onChange}>
        <span className='freeze-font'>FAC Y/N</span>
       </Checkbox>
       <Checkbox checked={policyFreeze} onChange={onChange}>
        <span className='freeze-font'>Staff Y/N</span>
       </Checkbox>
       <Checkbox checked={policyFreeze} onChange={onChange}>
        <span className='freeze-font'>Standard Risk Y/N</span>
       </Checkbox>
      </div>

      <div className='items-center grid grid-cols-2 gap-0'>
       {Object.keys(proposalEntry?.frontForm?.section_2?.formFields).map(
        fieldKey => {
         const dataId =
          proposalEntry?.frontForm?.section_2?.formFields[fieldKey]
           ?.PFD_COLUMN_NAME;
         return useMemo(
          () => (
           <div key={dataId} data-id={dataId}>
            <FieldWithValue
             currentData={
              proposalEntry?.frontForm?.section_2?.formFields[fieldKey]
             }
             values={values}
             setFieldValue={setFieldValue}
             handleChangeValue={handleChangeValue}
             parent='frontForm.section_2'
            />
           </div>
          ),
          [values?.frontForm?.section_2?.formFields[fieldKey]?.PFD_FLD_VALUE],
         );
        },
       )}
      </div>

      <div className='w-full mt-5 submit-button-MRV'>
       <button className='reset'>Reset</button>
       <button type='submit' className='save ml-9'>
        Submit
       </button>
      </div>
     </Form>
    );
   }}
  </Formik>
 );
};

export default FormFields;
