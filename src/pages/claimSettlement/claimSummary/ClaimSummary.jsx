import React, { useContext, useState } from 'react';
import SummaryForm from './SummaryForm';
import SummaryActionButtons from './SummaryActionButtons';
import { ClaimSettlementContext } from '../ClaimSettlement';
import { Form, Formik } from 'formik';
import { Button } from 'antd';
import Beneficiary from './Beneficiary';
import RIRecovery from './RIRecovery/RIRecovery';
import FACEstimate from './FACEstimate';
import FACSettlement from './FACSettlement';

const ClaimSummary = () => {
 const { claimSettlementJSON } = useContext(ClaimSettlementContext);
 const [openBeneficiary, setOpenBeneficiary] = useState(false);
 const [openFACEstimate, setOpenFACEstimate] = useState(false);
 const [openFACSettlement, setOpenFACSettlement] = useState(false);
 const [openRIRecovery, setOpenRIRecovery] = useState(false);
 const [claimSummary, setClaimSummary] = useState(claimSettlementJSON);
 const [claimSummaryInitialValues, setClaimSummaryInitialValues] =
  useState(claimSettlementJSON);

 const handleClose = () => {
  setOpenBeneficiary(false);
  setOpenRIRecovery(false);
  setOpenFACEstimate(false);
  setOpenFACSettlement(false);
 };

 const onSubmit = values => {
  console.log('values check: ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 return (
  <>
   <Formik
    initialValues={claimSummaryInitialValues}
    values={claimSummaryInitialValues}
    onSubmit={onSubmit}
    enableReinitialize={true}>
    {({ handleSubmit, values, setFieldValue }) => {
     return (
      <Form onSubmit={handleSubmit}>
       <div className='claim_summary mt-4 grid grid-cols-12 gap-1'>
        <div className='col-span-10 p-5 summary_form'>
         <SummaryForm
          values={values}
          setFieldValue={setFieldValue}
          formData={claimSummary}
          handleChangeValue={handleChangeValue}
          root='frontForm'
         />
        </div>
        <div className='col-span-2 summary_action_buttons'>
         {/* <SummaryActionButtons onSubmit={onSubmit} /> */}
         <div className='action-buttons'>
          <div className='flex flex-col items-center'>
           <button type='submit'>Save</button>
           <Button onClick={() => setOpenBeneficiary(true)}>Beneficiary</Button>
           <Button onClick={() => setOpenRIRecovery(true)}>RI Recovery</Button>
           <Button onClick={() => setOpenFACEstimate(true)}>
            FAC Estimate
           </Button>
           <Button onClick={() => setOpenFACSettlement(true)}>
            FAC Settlement
           </Button>
           <Button>Approve</Button>
          </div>
         </div>
        </div>
       </div>
      </Form>
     );
    }}
   </Formik>
   {openBeneficiary && (
    <Beneficiary open={openBeneficiary} handleClose={handleClose} />
   )}
   {openRIRecovery && (
    <RIRecovery open={openRIRecovery} handleClose={handleClose} />
   )}
   {openFACEstimate && (
    <FACEstimate open={openFACEstimate} handleClose={handleClose} />
   )}
   {openFACSettlement && (
    <FACSettlement open={openFACSettlement} handleClose={handleClose} />
   )}
  </>
 );
};

export default ClaimSummary;
