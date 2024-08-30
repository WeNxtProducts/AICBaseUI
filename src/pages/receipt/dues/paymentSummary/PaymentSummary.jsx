import React, { useContext, useEffect, useState } from 'react';
import { ReceiptContext } from '../../Receipt';
import useApiRequests from '../../../../services/useApiRequests';
import {
 CustomNumberField,
 CustomSelect,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { Button } from 'antd';
import showNotification from '../../../../components/notification/Notification';
import { formatNumber } from './../../../../components/commonHelper/CurrentFormatter';

const PaymentSummary = () => {
 const { id: tranId, policyList, amountSummary, setIsModified } = useContext(ReceiptContext);
 const {
  RH_BATCH_LC_AMT = 0,
  RH_LC_AMT = '',
  RH_POL_NO = 0,
 } = amountSummary.receiptHeader.formFields;
 const updaeAmount = useApiRequests('updateReceiptHdr', 'POST');
 const [paidValue, setPaidValue] = useState(amountSummary);
 const [dropdown, setDropdown] = useState([]);

 useEffect(() => {
  if (policyList?.length > 0) {
   const formattedResponse = policyList.map(item => ({
    value: item.RP_POL_NO,
    label: item.RP_POL_NO,
   }));
   setDropdown(formattedResponse);
  }
 }, [policyList]);

 const handleSubmit = async () => {
  const { RH_BATCH_LC_AMT = 0, RH_LC_AMT = '', RH_POL_NO } = paidValue.receiptHeader.formFields;

  if (RH_LC_AMT < RH_BATCH_LC_AMT) {
   showNotification.ERROR('Paid Amount should not be less than Amount to be paid');
   return;
  }

  if (!RH_POL_NO) {
   showNotification.ERROR('Please Select Policy Number');
   return;
  }

  try {
   const response = await updaeAmount(paidValue, {}, { tranId });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    setIsModified(true);
    showNotification.SUCCESS(response?.status_msg);
   }
  } catch (err) {
   console.log(err);
  }
 };

 const handleChange = (key, val) => {
  setPaidValue(prevState => ({
   ...prevState,
   receiptHeader: {
    ...prevState.receiptHeader,
    formFields: {
     ...prevState.receiptHeader.formFields,
     [key]: val,
    },
   },
  }));
 };

 const renderFields = (label, val) => (
  <div className='col-span-1 grid grid-cols-4 items-center'>
   <p className='col-span-1 form-label'>{label}</p>
   {label === 'Paid Amount' ? (
    <div className='col-span-2'>
     <CustomNumberField
      placeholder='amount'
      value={paidValue?.receiptHeader?.formFields?.RH_LC_AMT}
      readOnly={false}
      onChange={e => {
       handleChange('RH_LC_AMT', e.target.value);
      }}
     />
    </div>
   ) : label === 'Proposal Number' ? (
    <div className='col-span-2'>
     <CustomSelect
      options={dropdown}
      readOnly={false}
      placeholder='select '
      size='large'
      showSearch={false}
      value={paidValue?.receiptHeader?.formFields?.RH_POL_NO || undefined}
      onChange={e => {
       handleChange('RH_POL_NO', e);
      }}
     />
    </div>
   ) : (
    <div className='col-span-2 form-value'>
     <p className='float-right pe-3'>{formatNumber(val)}</p>
    </div>
   )}
  </div>
 );

 return (
  <div className='pay_summary mt-10'>
   <p className='pay_title'>Payment Summary</p>
   <div className='mt-3 grid grid-cols-2 items-center gap-y-3'>
    <div className='col-span-1'>{renderFields('Amount to be Paid', RH_BATCH_LC_AMT)}</div>
    <div className='col-span-1'>{renderFields('Paid Amount', RH_LC_AMT)}</div>
    <div className='col-span-10' />
    {paidValue?.receiptHeader?.formFields?.RH_LC_AMT > RH_BATCH_LC_AMT && (
     <div className='col-span-1'>{renderFields('Proposal Number', RH_LC_AMT)}</div>
    )}
    <div className='submit_section mt-3 col-span-10 flex justify-center'>
     <Button className='submit_btn' onClick={() => handleSubmit()}>
      Submit
     </Button>
    </div>
   </div>
  </div>
 );
};

export default PaymentSummary;
