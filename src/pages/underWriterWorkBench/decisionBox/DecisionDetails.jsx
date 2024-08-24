import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'antd';
import {
 CustomSelect,
 CustomTextArea,
} from '../../../components/commonExportsFields/CommonExportsFields';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { UWContext } from '../UnderWriterWorkBench';

const DecisionDetails = () => {
 const { tranId, policyNumber } = useContext(UWContext);
 const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
 const getLovList = useApiRequests('getLovList', 'GET');
 const UWSubmit = useApiRequests('UWSubmit', 'POST');
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const [decionList, setDecisionList] = useState([]);
 const [values, setValues] = useState({
  DECISION: '',
  REASON: '',
 });

 const handleGetDecisionList = async () => {
  try {
   const response = await getLovList('', { queryId: 200 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setDecisionList(response?.Data);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleProcedureOnDecision = async msg => {
  const payload = {
   inParams: {
    P_POL_TRAN_ID: tranId,
    P_POL_NO: policyNumber,
   },
  };
  try {
   const response = await invokeClaimsProcedure( payload, {
    procedureName: 'PROP_DIR_APPROVAL',
    packageName: 'WNPKG_POLICY',
   });
   console.log('handleProcedureOnDecision : ', response);
   //    showNotification.SUCCESS(msg);
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    //
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 const handleGetUpdatedStaus = async () => {
  try {
   const response = await getMapQuery({ queryParams: { tranId } }, { queryId: 201 });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setValues(response?.Data[0]);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 useEffect(() => {
  handleGetDecisionList();
  handleGetUpdatedStaus();
 }, [tranId]);

 const handleInputChange = (name, value) => {
  setValues(prevValues => ({
   ...prevValues,
   [name]: value,
  }));
 };

 const handleOnSubmit = async () => {
  console.log('values : ', values); //handleProcedureOnDecision
  try {
   const response = await UWSubmit('', { ...values, tranId });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    if (values?.DECISION === 'A') {
     handleProcedureOnDecision(response?.status_msg);
    } else showNotification.SUCCESS(response?.status_msg);
    console.log('values : ', response);
   }
  } catch (err) {
   console.log('err : ', err);
  }
 };

 return (
  <div className='decision_details mt-5 mb-7'>
   {decionList?.length > 0 && (
    <div className='grid grid-cols-2 items-center gap-y-2'>
     <div className='col-span-1 grid grid-cols-4 items-center'>
      <p className='col-span-1 label-style'>Decision</p>
      <div className='col-span-3'>
       <CustomSelect
        name={`DECISION`}
        options={decionList}
        value={values?.DECISION || undefined}
        placeholder={'select'}
        showSearch={false}
        size='medium'
        onChange={value => handleInputChange('DECISION', value)}
       />
      </div>
     </div>

     <div className='col-span-1' />

     <div className='col-span-1 grid grid-cols-4 items-center'>
      <p className='col-span-1 label-style'>Reason</p>
      <div className='col-span-3'>
       <CustomTextArea
        placeholder={'Reason'}
        value={values?.REASON}
        onChange={e => handleInputChange('REASON', e.target.value)}
       />
      </div>
     </div>
    </div>
   )}
   <div className='mt-4 flex justify-center'>
    <Button className='sub_btn' onClick={() => handleOnSubmit()}>
     Submit
    </Button>
   </div>
  </div>
 );
};

export default DecisionDetails;
