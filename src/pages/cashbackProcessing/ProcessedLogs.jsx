import React, { useState } from 'react';
import { Collapse } from 'antd';
import CollapsePanelHeader from '../../components/collapsePanelHeader/CollapsePanelHeader';
import TableComponent from '../../components/tableComponents/TableComponent';
import { bankColumn, bankData } from '../../components/tableComponents/sampleData';

const { Panel } = Collapse;

const ProcessedLogs = () => {
 const [activePanal, setActivePanel] = useState(1);

 const callback = key => {
  setActivePanel(key);
 };

 return (
  <div className='customer-tab mt-4 p-5'>
   <Collapse expandIconPosition='end' activeKey={activePanal} onChange={callback} size='small'>
    <Panel header={<CollapsePanelHeader name='Processed Logs' />} key={1}>
     <div className='listing-table p-3'>
      <TableComponent tableColumn={bankColumn} tableData={bankData} action={false} />
     </div>
    </Panel>
   </Collapse>
  </div>
 );
};

export default ProcessedLogs;
