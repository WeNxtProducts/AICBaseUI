import React from 'react';
import CustomList from '../../../../components/customList/CustomList';
import ClaimEstimateForm from './ClaimEstimateForm';
import ClaimEstimateActions from './ClaimEstimateActions';
import { bankColumn, bankData } from '../../../../components/tableComponents/sampleData';

const ClaimEstimate = () => {
 return (
  <div className='front-form life-assured-details grid grid-cols-8 gap-1'>
   <div className='propasal-entry-form col-span-7'>
    <ClaimEstimateForm />
   </div>
   <div className='col-span-1 mt-3'>
    <ClaimEstimateActions />
   </div>
   <div className='inline-table-details mb-1 col-span-8'>
    <CustomList tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default ClaimEstimate;
