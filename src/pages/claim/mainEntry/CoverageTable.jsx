import React from 'react';
import ClaimTable from './claimTable/ClaimTable';
import { CoverageTableData } from '../../../components/tableComponents/sampleData';

const CoverageTable = () => {
 return (
  <div className='mt-5'>
   <ClaimTable tableData={CoverageTableData} />
   <div className='mt-5 flex justify-center'>
    <button className='process_button' type='submit'>
     Process
    </button>
   </div>
  </div>
 );
};

export default CoverageTable;
