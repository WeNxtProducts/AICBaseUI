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
   <Collapse expandIconPosition='end' activeKey={activePanal} onChange={callback} size='small'>
    <Panel
     data-id='panel-1'
     header={<CollapsePanelHeader color='#e9ecef' name='Doc Print Params' />}
     key={1}>
     <DocPrintParam
      queryID='Doc_print_setup'
      root='Doc_Print_Param'
      mrvGet='getDocPrint'
      screenCode='DOCPRINTSETUP'
      screenName='DOCPRINTSETUP'
      saveRow='saveDocPrint'
      editRow='editDocPrint'
      deleteRow='deleteDocPrint'
     />
    </Panel>
   </Collapse>
  </div>
 );
};

export default DocPrintPanels;
