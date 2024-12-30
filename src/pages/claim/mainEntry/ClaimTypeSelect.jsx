import React, { useState } from 'react';
import RadioChip from '../../../components/radioChip/RadioChip';
import { claim_check, platforms } from './../../../components/tableComponents/sampleData';
import claimJSON from './../../../getFormFields/process.json';
import ClaimFieldRender from './ClaimFieldRender';
import { Button } from 'antd';

const ClaimTypeSelect = () => {
 const [initValues, setInitValues] = useState({
  claim_type: 'death',
  claim_type_fields: claimJSON?.death,
  claim_based: 'policyNo',
  claim_based_fields: claimJSON?.policyNo,
 });

 const handleSelectionChange = (selectedValue, type, mainKey) => {
  setInitValues(prevValues => ({
   ...prevValues,
   [mainKey]: selectedValue,
   [type]: claimJSON[selectedValue],
  }));
 };

 const handleChangeValue = (val, type, col_name) => {
  setInitValues(prevValues => ({
   ...prevValues,
   [type]: {
    ...prevValues[type],
    formFields: {
     ...prevValues[type].formFields,
     [col_name]: {
      ...prevValues[type].formFields[col_name],
      PFD_FLD_VALUE: val,
     },
    },
   },
  }));
 };

 return (
  <div>
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Claim Entry</p>
   </div>

   <div className='mt-4 claim-type-form'>
    <div className='grid grid-cols-12 gap-3 items-center'>
     <div className='col-span-2'>
      <p className='chip-label'>Select claim based </p>
     </div>
     <div className='col-span-10'>
      <RadioChip
       main='claim_based'
       type='claim_based_fields'
       items={claim_check}
       selectedValue={initValues?.claim_based}
       onSelectionChange={handleSelectionChange}
      />
     </div>
     <div className='col-span-2'></div>
     <div className='col-span-10 grid grid-cols-2 gap-0'>
      {Object.keys(initValues?.claim_based_fields?.formFields).map((fieldKey, index) => {
       return (
        <div key={index}>
         <ClaimFieldRender
          fieldInfo={initValues?.claim_based_fields?.formFields[fieldKey]}
          handleChangeValue={handleChangeValue}
          values={initValues?.claim_based_fields}
          keyField='claim_based_fields'
         />
        </div>
       );
      })}
      <div className=' flex items-center'>
       <Button className='ml-3 ok_button'>OK</Button>
      </div>
     </div>
    </div>

    <div className='grid grid-cols-12 gap-3 mt-6  items-center'>
     <div className='col-span-2'>
      <p className='chip-label'>Select type of claim</p>
     </div>
     <div className='col-span-10'>
      <RadioChip
       main='claim_type'
       type='claim_type_fields'
       items={platforms}
       selectedValue={initValues?.claim_type}
       onSelectionChange={handleSelectionChange}
      />
     </div>
     <div className='col-span-2'></div>
     <div className='col-span-10 grid grid-cols-2 gap-0'>
      {Object.keys(initValues?.claim_type_fields?.formFields).map((fieldKey, index) => {
       return (
        <div key={index}>
         <ClaimFieldRender
          fieldInfo={initValues?.claim_type_fields?.formFields[fieldKey]}
          handleChangeValue={handleChangeValue}
          values={initValues?.claim_type_fields}
          keyField='claim_type_fields'
         />
        </div>
       );
      })}
     </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimTypeSelect;
