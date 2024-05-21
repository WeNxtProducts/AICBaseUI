import React, { useContext, useState } from 'react';
import { ClaimStepperContext } from '../../Claims';
import claim from '../../../../getFormFields/claims.json';
import CustomList from '../../../../components/customList/CustomList';
import MRVform from '../../../../components/mrvForm/MRVform';
import {
 bankColumn,
 bankData,
} from '../../../../components/tableComponents/sampleData';

const ClaimCover = ({ queryID, root }) => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  ClaimsJson,
 } = useContext(ClaimStepperContext);
 const [claimCoverDetails, setClaimCoverDetails] = useState(ClaimsJson);
 const [claimCoverInitialValues, setClaimCoverInitialValues] = useState(null);

 const onSubmit = values => {
  handleNext();
  const payload = { [root]: { formFields: values } };
  console.log('values : ', payload);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const resetForm = () => {
  setClaimCoverInitialValues(null);
 };

 return (
  <div className='front-form claim-cover grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-8'>
    {bankData?.length > 0 && (
     <div className='inline-table-details mb-1 mt-2 col-span-8'>
      <CustomList tableColumn={bankColumn} tableData={bankData} />
     </div>
    )}
    {claimCoverDetails?.hasOwnProperty(root) && (
     <MRVform
      initialValues={claimCoverInitialValues}
      formRender={claimCoverDetails}
      root={root}
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      resetForm={resetForm}
     />
    )}
   </div>
  </div>
 );
};

export default ClaimCover;
