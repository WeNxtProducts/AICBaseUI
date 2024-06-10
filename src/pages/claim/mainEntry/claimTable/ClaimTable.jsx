import React, { useState } from 'react';
import { Button, Checkbox } from 'antd';
import { CustomInput } from '../../../../components/commonExportsFields/CommonExportsFields';
import PriceBreakUpAndBonus from './PriceBreakUpAndBonus';
import ClaimCharges from '../ClaimCharges';
import './ClaimTable.scss';

const ClaimTable = ({ tableColumn = {}, tableData = [] }) => {
 const [expandedRows, setExpandedRows] = useState([]);
 const [openCharges, setOpenCharges] = useState(false);
 const [openReserve, setOpenReserve] = useState(false);

 const handleRowClick = rowId => {
  const currentExpandedRows = expandedRows;
  const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
  const newExpandedRows = isRowCurrentlyExpanded
   ? currentExpandedRows.filter(id => id !== rowId)
   : currentExpandedRows.concat(rowId);
  setExpandedRows(newExpandedRows);
 };

 const handleClose = () => {
  setOpenCharges(false);
  setOpenReserve(false);
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
     <Button onClick={() => setOpenCharges(true)} className='tab_buttons'>
      Charges
     </Button>
    </td>
    <td>
     <Button onClick={() => setOpenReserve(true)} className='tab_buttons'>
      Reserve
     </Button>
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
   {openCharges && (
    <ClaimCharges
     queryID='Claim_Estimate'
     root='Claim_Charges'
     mrvGet='getClaimEstimate'
     screenCode='CLAIMENTRY'
     screenName='CLAIMENTRY'
     saveRow='saveEstimate'
     editRow='editEstimate'
     deleteRow='deleteEstimate'
     handleCloseModal={handleClose}
     openModal={openCharges}
     title='Claim Charges'
    />
   )}
   {openReserve && (
    <ClaimCharges
     queryID='Claim_Estimate'
     root='Claim_Estimate' // Claim_Beneficiary
     mrvGet='getClaimEstimate'
     screenCode='CLAIMENTRY'
     screenName='CLAIMENTRY'
     saveRow='saveEstimate'
     editRow='editEstimate'
     deleteRow='deleteEstimate'
     handleCloseModal={handleClose}
     openModal={openReserve}
     title='Reserve'
    />
   )}
  </div>
 );
};

export default ClaimTable;
