import React, { useState } from 'react';
import RadioChip from '../../../components/radioChip/RadioChip';
import {
 claim_check,
 platforms,
} from './../../../components/tableComponents/sampleData';
import claimJSON from './../../../getFormFields/process.json';
import ClaimFieldRender from './ClaimFieldRender';

const ClaimTypeSelect = () => {
 const [initValues, setInitValues] = useState({
  claim_type: 'death',
  claim_type_fields: claimJSON?.death,
  claim_based: 'preclaimNo',
  claim_based_fields: claimJSON?.preclaimNo,
 });

 const handleSelectionChange = (selectedValue, type, mainKey) => {
  setInitValues({
   ...initValues,
   [mainKey]: selectedValue,
   [type]: claimJSON[selectedValue],
  });
 };

 const handleChangeValue = () => {
  console.log('handleChangeValue');
 };

 return (
  <div>
   <div className='flex items-center justify-between'>
    <p className='header-font pl-1'>Claim Entry</p>
   </div>

   <div className='mt-4 claim-type-form'>
    <div className='grid grid-cols-12 gap-3 items-center'>
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
      {Object.keys(initValues?.claim_type_fields?.formFields).map(
       (fieldKey, index) => {
        return (
         <div key={index}>
          <ClaimFieldRender
           fieldInfo={initValues?.claim_type_fields?.formFields[fieldKey]}
           handleChangeValue={handleChangeValue}
           values={initValues?.claim_type_fields}
          />
         </div>
        );
       },
      )}
     </div>
    </div>

    <div className='grid grid-cols-12 gap-3 mt-6 items-center'>
     <div className='col-span-2'>
      <p className='chip-label'>Select claim based </p>
     </div>
     <div className='col-span-10'>
      <RadioChip
       main='claim_based'
       type='claim_based_fields'
       items={claim_check}
       selectedValue={initValues?.claim_type}
       onSelectionChange={handleSelectionChange}
      />
     </div>

     <div className='col-span-2'></div>
     <div className='col-span-10 grid grid-cols-2 gap-0'>
      {Object.keys(initValues?.claim_based_fields?.formFields).map(
       (fieldKey, index) => {
        return (
         <div key={index}>
          <ClaimFieldRender
           fieldInfo={initValues?.claim_based_fields?.formFields[fieldKey]}
           handleChangeValue={handleChangeValue}
           values={initValues?.claim_based_fields}
          />
         </div>
        );
       },
      )}
     </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimTypeSelect;
