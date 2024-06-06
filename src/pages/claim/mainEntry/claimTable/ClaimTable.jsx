import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
import { CustomInput } from '../../../../components/commonExportsFields/CommonExportsFields';
import './ClaimTable.scss';
import PriceBreakUpAndBonus from './PriceBreakUpAndBonus';

const ClaimTable = ({ tableColumn = {}, tableData = [] }) => {
 const [expandedRows, setExpandedRows] = useState([1]);

 const handleRowClick = rowId => {
  const currentExpandedRows = expandedRows;
  const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
  const newExpandedRows = isRowCurrentlyExpanded
   ? currentExpandedRows.filter(id => id !== rowId)
   : currentExpandedRows.concat(rowId);
  setExpandedRows(newExpandedRows);
 };

 const renderRow = item => {
  const clickCallback = () => handleRowClick(item.key);

  const itemRows = [
   <tr key={`row-data-${item?.key}`}>
    <td className='policy_number_click' onClick={clickCallback}>
     {item?.pol}
    </td>
    <td>{item?.claim}</td>
    <td>
     <div>
      <CustomInput
       value={item?.amount}
       placeholder={'remarks'}
       onChange={e => {
        // handleSelect(index, 'Remarks', e.target.value);
       }}
      />
     </div>
    </td>
    <td>
     <Button className='tab_buttons'>Charges</Button>
    </td>
    <td>
     <Button className='tab_buttons'>Reserve</Button>
    </td>
    <td>
     <div>
      <Checkbox checked={item?.process} />
     </div>
    </td>
   </tr>,
  ];

  if (expandedRows.includes(item.key)) {
   itemRows.push(
    <tr key={`row-expanded-${item.key}`}>
     <td colSpan='6' className='price_breakup_bonus'>
      <PriceBreakUpAndBonus />
     </td>
    </tr>,
   );
  }
  return itemRows;
 };

 return (
  <div className='claim_status_table rounded-lg'>
   <table className='status_main_table'>
    <thead>
     <tr>
      <th>POLICY</th>
      <th>CLAIM</th>
      <th>AMOUNT</th>
      <th>CHARGES</th>
      <th>RESERVE</th>
      <th>PROCESS</th>
     </tr>
    </thead>
    <tbody>{tableData?.map(item => renderRow(item))}</tbody>
   </table>
  </div>
 );
};

export default ClaimTable;
