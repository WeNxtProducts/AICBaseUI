import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import useApiRequests from '../../../../../services/useApiRequests';
import showNotification from '../../../../../components/notification/Notification';
import { ClaimContext } from '../../../ModernClaim';
import { formatNumber } from '../../../../../components/commonHelper/CurrentFormatter';

const ClaimDeductionBreakUp = () => {
 const { selectedPolDetails, freeze } = useContext(ClaimContext);
 const { CLM_TRAN_ID } = selectedPolDetails;
 const deductionGet = useApiRequests('getPreClaimDate', 'POST');
 const deductionUpdate = useApiRequests('claimDeductionUpdate', 'POST');
 const [calculatedValue, setCalculatedValue] = useState(null);

 const handleGetDeductionBreakUp = async () => {
  try {
   const response = await deductionGet(
    { queryParams: { tranId: CLM_TRAN_ID } },
    { queryId: 121 },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setCalculatedValue(response?.Data[0]);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  handleGetDeductionBreakUp();
 }, []);

 const handleUpdate = async () => {
  const { CD_WAIVE_PREM_INT, CD_WAIVE_LOAN_INT, Id } = calculatedValue;
  try {
   const response = await deductionUpdate(
    {},
    { CD_WAIVE_PREM_INT, CD_WAIVE_LOAN_INT, tranId: Id },
   );
   if (response?.status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const renderHeader = () => (
  <>
   <div className='col-span-3'></div>
   <div className='col-span-4 content_header'>Local Currency</div>
   <div className='col-span-2'></div>
  </>
 );

 const renderRows = (fieldName, amount) => (
  <>
   <div className='col-span-3 field_name_style'>{fieldName}</div>
   <div className='col-span-4 field_val_style'>{formatNumber(amount)}</div>
   <div className='col-span-2'></div>
  </>
 );

 return (
  <div>
   <p className='breakup_title'>Claim deduction Breakup</p>
   <div className='breakUpContent p-1'>
    {calculatedValue && (
     <div className='grid grid-cols-10 items-center gap-y-2 gap-x-3'>
      {renderHeader()}
      {renderRows('O/S Premium', calculatedValue?.CD_LC_PREM_OS)}
      {renderRows('O/S Premium Interest', calculatedValue?.CD_LC_PREM_INT)}
      <div className='col-span-3' />
      <div className='col-span-6 flex items-center'>
       <Checkbox
        checked={calculatedValue?.CD_WAIVE_PREM_INT === 'Y'}
        disabled={freeze}
        onChange={e =>
         setCalculatedValue(pre => ({
          ...pre,
          CD_WAIVE_PREM_INT: e.target.checked ? 'Y' : 'N',
         }))
        }
       />
       <span className='total_intersect ml-2'>Waive O/S prem interest</span>
      </div>
      {renderRows('O/S Loan', calculatedValue?.CD_LC_LOAN_OS)}
      {renderRows('O/S Loan Interest', calculatedValue?.CD_LC_LOAN_INT)}
      <div className='col-span-3' />
      <div className='col-span-6 flex items-center'>
       <Checkbox
        checked={calculatedValue?.CD_WAIVE_LOAN_INT === 'Y'}
        disabled={freeze}
        onChange={e =>
         setCalculatedValue(pre => ({
          ...pre,
          CD_WAIVE_LOAN_INT: e.target.checked ? 'Y' : 'N',
         }))
        }
       />
       <span className='total_intersect ml-2'>Waive O/S Loan interest</span>
      </div>
     </div>
    )}

    {/* <div className='mt-7 field_name_style flex justify-center items-center gap-5'>
     <p>Total Deduction</p>
     <div className='total_value'> </div>
    </div> */}
    <div className='mt-5 flex items-center justify-end deduction_buttons'>
     <Button onClick={() => handleUpdate()}>Save</Button>
     <Button>Cancel</Button>
    </div>
   </div>
  </div>
 );
};

export default ClaimDeductionBreakUp;
