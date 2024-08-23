import React, { useContext, useEffect, useState } from 'react';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import { UWContext } from '../../UnderWriterWorkBench';

const BasicPremium = () => {
 const { policyNumber } = useContext(UWContext);
 const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
 const [preDetails, setPreDetails] = useState(null);

 const handleGetBasicPremium = async () => {
  try {
   const response = await getMapQuery({ queryParams: { POL_NO: policyNumber } }, { queryId: 165 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setPreDetails(response?.Data[0]);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  handleGetBasicPremium();
 }, [policyNumber]);

 const renderRows = (label, val, side = 'right') => (
  <div className='col-span-1'>
   <div className='flex items-center'>
    <div className='w-4/12'>
     <p className='label-font'>{label}</p>
    </div>
    <div className='w-1/2 ml-4 pl-1 ref_no_box'>
     <p className={`pl-2 float-${side}`}>{val}</p>
    </div>
   </div>
  </div>
 );

 return (
  <div className='basic_premium grid grid-cols-2 gap-y-2'>
   {preDetails !== null && (
    <>
     {renderRows('Plan Code', preDetails?.POL_PLAN_CODE || 0, 'left')}
     {renderRows('Basic Rate', preDetails?.POL_BASIC_RATE || 0, 'left')}
     {renderRows('FC Basic Premium', preDetails?.POL_FC_BASIC_PREM || 0)}
     {renderRows('LC Basic Premium', preDetails?.POL_LC_BASIC_PREM || 0)}
     {renderRows('FC Sum Assured', preDetails?.POL_FC_SA || 0)}
     {renderRows('LC Sum Assured', preDetails?.POL_LC_SA || 0)}
    </>
   )}
  </div>
 );
};

export default BasicPremium;
