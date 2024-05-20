import React, { useState } from 'react';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import { Collapse } from 'antd';
import PaymentDetails from './paymentDetails/PaymentDetails';
import Charges from './Charges';
import CheckList from './../../claims/claimsPanel/checkList/CheckList';

const { Panel } = Collapse;

const SurrenderPanels = () => {
 const [activePanal, setActivePanel] = useState(1);

 const callback = key => {
  setActivePanel(key);
 };

 return (
  <div className='acc-payment-details'>
   <Collapse
    expandIconPosition='end'
    activeKey={activePanal}
    onChange={callback}
    size='small'>
    <Panel
     data-id='panel-1'
     header={<CollapsePanelHeader name='Payment Details' />}
     key={1}>
     <PaymentDetails />
    </Panel>
    <Panel
     data-id='panel-2'
     header={<CollapsePanelHeader name='Charges' />}
     key={2}>
     <Charges />
    </Panel>
    <Panel
     data-id='panel-3'
     header={<CollapsePanelHeader name='Checklist' />}
     key={3}>
     <CheckList />
    </Panel>
   </Collapse>
  </div>
 );
};

export default SurrenderPanels;
