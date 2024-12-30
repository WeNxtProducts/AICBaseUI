import React, { useContext, useState } from 'react';
import { ClaimStepperContext } from '../Claims';
import { Collapse } from 'antd';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import ClaimCover from './claimCover/ClaimCover';
import ClaimCharges from './claimCharges/ClaimCharges';
import ClaimEstimate from './claimEstimate/ClaimEstimate';
import CheckList from './checkList/CheckList';
import ClaimDecision from './claimDecision/ClaimDecision';

const { Panel } = Collapse;

const ClaimsPanel = () => {
 const { currentStep, stepperData, handleNext, handlePrevious, handleSkip } =
  useContext(ClaimStepperContext);
 const [activePanal, setActivePanel] = useState(0);

 const callback = key => {
  const lastElement = key[key.length - 1];
  const lastElementAsNumber = parseInt(lastElement, 10);
  handleSkip(lastElementAsNumber);
  setActivePanel(key);
 };

 return (
  <div className='quotation-panels'>
   <Collapse expandIconPosition='end' activeKey={currentStep} onChange={callback} size='small'>
    <Panel
     data-id='panel-1'
     header={<CollapsePanelHeader name='Claim Estimate' saved={stepperData[1]} />}
     key={1}>
     <ClaimCover
      queryID='Claim_Estimate'
      root='Claim_Estimate'
      mrvGet='getClaimEstimate'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='saveEstimate'
      editRow='editEstimate'
      deleteRow='deleteEstimate'
     />
    </Panel>
    <Panel
     data-id='panel-2'
     header={<CollapsePanelHeader name='Claim Charges' saved={stepperData[2]} />}
     key={2}>
     <ClaimCover
      queryID='Claim_Estimate'
      root='Claim_Estimate'
      mrvGet='getClaimEstimate'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='saveEstimate'
      editRow='editEstimate'
      deleteRow='deleteEstimate'
     />
     {/* <ClaimCharges /> */}
    </Panel>
    <Panel
     data-id='panel-4'
     header={<CollapsePanelHeader name='Checklist' saved={stepperData[3]} />}
     key={3}>
     <CheckList />
    </Panel>
    {/* <Panel
     data-id='panel-5'
     header={
      <CollapsePanelHeader name='Claim Decision' saved={stepperData[5]} />
     }
     key={4}> */}
    {/* <ClaimDecision /> */}
    {/* </Panel> */}
   </Collapse>
  </div>
 );
};

export default ClaimsPanel;
