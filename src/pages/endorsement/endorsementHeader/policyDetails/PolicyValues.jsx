import React, { useContext } from 'react';
import dayjs from 'dayjs';
import { EndorsementContext } from '../../Endorsement';
import { formatNumber } from './../../../../components/commonHelper/CurrentFormatter';

const PolicyValues = () => {
 const { policyDetails } = useContext(EndorsementContext);
 const {
  POL_ASSURED_NAME = '',
  POL_MODE_OF_PYMT = '',
  POL_FM_DT = '',
  POL_TO_DT = '',
  POL_LC_SA = '',
  POL_PERIOD = '',
  POL_PREM_PAY_YRS = '',
 } = policyDetails;

 return (
  <div className='personal-values p-3'>
   <p>Policy Details</p>
   <div className='details mt-2'>
    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Assured Name</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{POL_ASSURED_NAME}</p>
     </div>
    </div>

    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Mode of Payment</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{POL_MODE_OF_PYMT}</p>
     </div>
    </div>

    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Policy From Date</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{dayjs(POL_FM_DT || dayjs()).format('YYYY-MM-DD')}</p>
     </div>
    </div>

    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Policy To Date</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{dayjs(POL_TO_DT || dayjs()).format('YYYY-MM-DD')}</p>
     </div>
    </div>

    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Sum Assured</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{formatNumber(POL_LC_SA)}</p>
     </div>
    </div>

    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Policy Period</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{POL_PERIOD}</p>
     </div>
    </div>

    <div className='w-full flex items-center'>
     <div className='w-2/5'>
      <p className='label-style'>Premium Paying Years</p>
     </div>
     <div className='w-3/5'>
      <p className='value-style'>{POL_PREM_PAY_YRS}</p>
     </div>
    </div>
   </div>
  </div>
 );
};

export default PolicyValues;
