import React from 'react';
import ClaimStatusTable from './ClaimStatusTable';
import { Button } from 'antd';

const ClaimLevelDetails = () => {
 return (
  <div className='claim_level_details px-2'>
   <p className='settle_header'>Settlement Details</p>
   <div className='grid grid-cols-12 gap-1 mt-2'>
    <div className='col-span-10'>
     <ClaimStatusTable />
    </div>
    <div className='col-span-2'>
     <div className='action-buttons mt-3'>
      <div className='flex flex-col items-center gap-3'>
       <Button>Beneficiary</Button>
       <Button>Treaty</Button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ClaimLevelDetails;
