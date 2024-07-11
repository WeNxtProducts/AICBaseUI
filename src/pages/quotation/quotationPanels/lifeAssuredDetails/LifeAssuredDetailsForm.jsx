/* eslint-disable no-prototype-builtins */
import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../Quotation';
import MRVform from '../../../../components/mrvForm/MRVform';

const LifeAssuredDetailsForm = ({ initValues, setInitValue }) => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  QuotationJSON,
 } = useContext(StepperContext);
 const [lifeAssuredDetails, setLifeAssuredDetails] = useState(QuotationJSON);
 const [lifeAssuredDetailsInitialValues, setLifeAssuredDetailsInitialValues] =
  useState(initValues);

 const onSubmit = values => {
  handleNext();
  console.log('values : ', values);
 };

 useEffect(() => {
  setLifeAssuredDetailsInitialValues(initValues);
 }, [initValues]);

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const resetForm = () => {
  setInitValue(null);
 };

 return (
  <div className='life-assured-details-form'>
   {lifeAssuredDetails?.hasOwnProperty('life_assured_details') && (
    <MRVform
     initialValues={lifeAssuredDetailsInitialValues}
     formRender={lifeAssuredDetails}
     root='life_assured_details'
     onSubmit={onSubmit}
     handleChangeValue={handleChangeValue}
     resetForm={resetForm}
    />
   )}
  </div>
 );
};

export default LifeAssuredDetailsForm;
