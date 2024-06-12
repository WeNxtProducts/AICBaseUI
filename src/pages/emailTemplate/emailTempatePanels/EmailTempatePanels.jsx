import React, { useState } from 'react';
import { Collapse } from 'antd';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import EmailParameters from './emailParameters/EmailParameters';

const { Panel } = Collapse;

const EmailTempatePanels = () => {
 const [activePanal, setActivePanel] = useState(0);

 const callback = key => {
  setActivePanel(key);
 };

 return (
  <div className='mt-4'>
   <Collapse
    expandIconPosition='end'
    activeKey={activePanal}
    onChange={callback}
    size='small'>
    <Panel
     data-id='panel-1'
     header={<CollapsePanelHeader color='#e9ecef' name='Email Parameters' />}
     key={1}>
     <EmailParameters
      queryID='Email_Parameters'
      root='Email_Parameters'
      mrvGet='getEmailParameter'
      screenCode='EMAILTEMPLATE'
      screenName='EMAILTEMPLATE'
      saveRow='saveEmailParameter'
      editRow='editEmailParameter'
      deleteRow='deleteEmailParameter'
     />
    </Panel>
   </Collapse>
  </div>
 );
};

export default EmailTempatePanels;
