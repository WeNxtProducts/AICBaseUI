import React, { useContext, useEffect, useState } from 'react';
import { Collapse } from 'antd';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import { StepperContext } from '../Quotation';
import ChargsDisLoadConditions from './chargs-DisLoad-Conditions/ChargsDisLoadConditions';
import CheckList from './checkList/CheckList';
import MrvQuotation from '../mrvQuotation/MrvQuotation';
import showNotification from '../../../components/notification/Notification';
import useApiRequests from '../../../services/useApiRequests';
import BrokerAgent from './broker_Agent/BrokerAgent';
import { useSelector } from 'react-redux';

const { Panel } = Collapse;

const QuotationPanels = () => {
 const {
  currentStep,
  stepperData,
  handleNext,
  handlePrevious,
  handleSkip,
  id: tranId,
  proposalNumber,
  freeze,
  isPremCalc,
 } = useContext(StepperContext);
 const ds_type = useSelector(state => state?.tokenAndMenuList?.currentMenuId?.ds_type);
 const getPrimaryLifeAssuredId = useApiRequests('getPreClaimDate', 'POST');
 const [activePanal, setActivePanel] = useState(['0']);
 const [primaryLifeAssuredId, setPrimaryLifeAssuredId] = useState('');
 const [isAllCompleted, setIsAllCompleted] = useState(false);

 useEffect(() => {
  const panel = document.querySelector(`[data-id='panel-${currentStep}']`);
  if (panel) {
   setTimeout(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
   }, 500);
  }
  if (isAllCompleted) {
   if (activePanal.includes(currentStep?.toString())) {
    const arr = [
     ...activePanal.filter(step => step !== currentStep?.toString()),
     currentStep?.toString(),
    ];
    callback(arr);
   } else {
    const arr = [...activePanal, currentStep?.toString()];
    callback(arr);
   }
  }
 }, [currentStep]);

 const handleGetPrimaryId = async () => {
  try {
   const payloadBene = { queryParams: { PEMP_POL_TRAN_ID: tranId } };
   const response = await getPrimaryLifeAssuredId(payloadBene, {
    queryId: 156,
   });
   if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   if (response?.status === 'SUCCESS') {
    setPrimaryLifeAssuredId(response?.Data[0]?.PEMP_TRAN_ID || '');
   }
  } catch (err) {
   console.log(err);
  }
 };

 useEffect(() => {
  if (tranId && currentStep == 2 && !primaryLifeAssuredId) handleGetPrimaryId();
 }, [tranId, currentStep]);

 useEffect(() => {
  if (!isAllCompleted) {
   const condition = allStepsCompleted();
   setIsAllCompleted(condition);
  }
 }, [currentStep]);

 const allStepsCompleted = () => stepperData.every(item => item.status === 'completed');

 const callback = key => {
  const lastElement = key[key.length - 1];
  const lastElementAsNumber = parseInt(lastElement, 10);
  if (!isAllCompleted) {
   if (
    stepperData[lastElement]?.status === 'completed' ||
    stepperData[lastElement]?.status === 'inprogress'
   )
    handleSkip(lastElementAsNumber);
  } else {
   setActivePanel(key);
   handleSkip(lastElementAsNumber);
  }
 };

 const determinePanelClassName = index => {
  if (isAllCompleted) {
   return 'active-panel';
  } else if (
   stepperData[index]?.status === 'completed' ||
   stepperData[index]?.status === 'inprogress'
  ) {
   return 'active-panel';
  } else {
   return 'inactive-panel';
  }
 };

 return (
  <div className='quotation-panels'>
   <Collapse
    expandIconPosition='end'
    activeKey={!isAllCompleted ? currentStep : activePanal}
    onChange={callback}
    size='small'>
    <Panel
     className={determinePanelClassName(1)}
     data-id='panel-1'
     header={
      <CollapsePanelHeader ds_type={ds_type} name='Life Assured Details' saved={stepperData[1]} />
     }
     key={1}>
     <MrvQuotation
      queryID='getLifeAssuredDetails'
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
     className={determinePanelClassName(2)}
     data-id='panel-2'
     header={<CollapsePanelHeader ds_type={ds_type} name='Beneficiary' saved={stepperData[2]} />}
     key={2}>
     <MrvQuotation
      queryID='getBeneficiaryList'
      root='benificiary'
      mrvGet='getBeneficiaryDetails'
      screenCode='QUOTATIONENTRY'
      screenName='QUOTATIONENTRY'
      saveRow='saveBeneficiaryDetails'
      editRow='updateBeneficiaryDetails'
      deleteRow='deleteBeneficiaryDetails'
      title=''
      tranId={tranId}
      subId={primaryLifeAssuredId}
     />
    </Panel>
    <Panel
     className={determinePanelClassName(3)}
     data-id='panel-3'
     header={<CollapsePanelHeader ds_type={ds_type} name='Broker/Agent' saved={stepperData[3]} />}
     key={3}>
     <BrokerAgent />
    </Panel>
    <Panel
     className={determinePanelClassName(4)}
     data-id='panel-4'
     header={
      <CollapsePanelHeader
       ds_type={ds_type}
       name='Chargs/Discount-loading/Conditions'
       saved={stepperData[4]}
      />
     }
     key={4}>
     <ChargsDisLoadConditions tranId={tranId} />
    </Panel>
    <Panel
     className={determinePanelClassName(5)}
     data-id='panel-5'
     header={<CollapsePanelHeader ds_type={ds_type} name='Checklist' saved={stepperData[5]} />}
     key={5}>
     <CheckList tranId={tranId} proposalNumber={proposalNumber} queryID={149} freeze={freeze} />
    </Panel>
   </Collapse>
  </div>
 );
};

export default QuotationPanels;
