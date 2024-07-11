import React, { useContext, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import { StepperContext } from '../Quotation';
import LifeAssuredDetails from './lifeAssuredDetails/LifeAssuredDetails';
import Beneficiary from './beneficiary/Beneficiary';
import ChargsDisLoadConditions from './chargs-DisLoad-Conditions/ChargsDisLoadConditions';
import CheckList from './checkList/CheckList';
import CommentsMaturityRemainderDispatchDetails from './comments-Maturity-Remainder-DispatchDetails/CommentsMaturityRemainderDispatchDetails';
import MrvQuotation from '../mrvQuotation/MrvQuotation';

const { Panel } = Collapse;

const QuotationPanels = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  flag,
  id: tranId,
 } = useContext(StepperContext);
 const [activePanal, setActivePanel] = useState(1);

 const callback = key => {
  if (flag !== 'completed') {
   const lastElement = key[key.length - 1];
   const lastElementAsNumber = parseInt(lastElement, 10);
   handleSkip(lastElementAsNumber);
  } else setActivePanel(key);
 };

 return (
  <div className='quotation-panels'>
   <Collapse
    expandIconPosition='end'
    activeKey={flag !== 'completed' ? currentStep : activePanal}
    onChange={callback}
    size='small'>
    <Panel
     data-id='panel-1'
     header={
      <CollapsePanelHeader
       completed={flag}
       name='Life Assured Details'
       saved={stepperData[1]}
      />
     }
     key={1}>
     {/* <LifeAssuredDetails /> */}
     <MrvQuotation
      queryID='Life Assured Details'
      root='life_assured_details'
      mrvGet='getLifeAssuredDetails'
      screenCode='QUOTATIONENTRY'
      screenName='QUOTATIONENTRY'
      saveRow='saveLifeAssuredDetails'
      editRow='updateLifeAssuredDetails'
      deleteRow='deleteLifeAssuredDetails'
      title=''
      tranId={tranId}
     />
    </Panel>
    <Panel
     data-id='panel-2'
     header={
      <CollapsePanelHeader
       completed={flag}
       name='Beneficiary'
       saved={stepperData[2]}
      />
     }
     key={2}>
     {/* <Beneficiary /> */}
     <MrvQuotation
      queryID='ClaimChargeDetailsList'
      root='ClaimCharges'
      mrvGet='getClaimChargesDetailsEdit'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='claimChargeCreate'
      editRow='claimChargeUpdate'
      deleteRow='claimChargeDelete'
      title='Beneficiary'
     />
    </Panel>
    <Panel
     data-id='panel-3'
     header={
      <CollapsePanelHeader
       completed={flag}
       name='Chargs/Dis-load/Conditions'
       saved={stepperData[3]}
      />
     }
     key={3}>
     <ChargsDisLoadConditions />
    </Panel>
    <Panel
     data-id='panel-4'
     header={
      <CollapsePanelHeader
       completed={flag}
       name='Checklist'
       saved={stepperData[4]}
      />
     }
     key={4}>
     <CheckList />
    </Panel>
    <Panel
     data-id='panel-5'
     header={
      <CollapsePanelHeader
       completed={flag}
       name='Comments/Maturity/Remainder/Dispatch details'
       saved={stepperData[5]}
      />
     }
     key={5}>
     <CommentsMaturityRemainderDispatchDetails />
    </Panel>
   </Collapse>
  </div>
 );
};

export default QuotationPanels;
