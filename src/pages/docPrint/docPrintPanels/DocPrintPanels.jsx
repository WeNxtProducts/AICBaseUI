import React, { useState } from 'react';
import { Collapse } from 'antd';
import CollapsePanelHeader from '../../../components/collapsePanelHeader/CollapsePanelHeader';
import DocPrintParam from './docPrintParam/DocPrintParam';

const { Panel } = Collapse;

const DocPrintPanels = () => {
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
     header={<CollapsePanelHeader color='#e9ecef' name='Doc Print Params' />}
     key={1}>
     <DocPrintParam
      queryID='Doc_Print_Param'
      root='Doc_Print_Param'
      mrvGet='getClaimEstimate'
      screenCode='CLAIMENTRY'
      screenName='CLAIMENTRY'
      saveRow='saveEstimate'
      editRow='editEstimate'
      deleteRow='deleteEstimate'
     />
    </Panel>
   </Collapse>
  </div>
 );
};

export default DocPrintPanels;
