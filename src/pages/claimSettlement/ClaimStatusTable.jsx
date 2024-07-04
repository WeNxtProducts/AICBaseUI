import React from 'react';

const ClaimStatusTable = ({
 rowData = [],
 handleSelectCover,
 selectedCover,
}) => {
 const renderTableHead = () => (
  <thead>
   <tr>
    <th>Cover Code</th>
    <th>Approved Amount</th>
    <th>FC Amount</th>
    <th>LC Amount</th>
    <th>Status</th>
   </tr>
  </thead>
 );

 const renderRows = (item, index) => (
  <tr
   key={item?.ID}
   className={selectedCover?.ID === item?.ID ? 'selected_row' : ''}
   onClick={() => handleSelectCover(item)}>
   <td>{item?.Cover_Code}</td>
   <td>{item?.Local_Currency_Amount}</td>
   <td>{item?.Foreign_Currency_Amount}</td>
   <td>{item?.Local_Currency_Amount}</td>
   <td>
    <div>
     <p
      className={`status_notify ${
       item?.Status === 'P' ? 'approved' : 'pending'
      }`}>
      {item?.Status === 'P' ? 'Paid' : 'Unpaid'}
     </p>
    </div>
   </td>
  </tr>
 );

 return (
  <div className='mt-4 status_table_settlement rounded-lg'>
   <table className='status_main_table'>
    {renderTableHead()}
    <tbody>{rowData?.map((item, index) => renderRows(item, index))}</tbody>
   </table>
  </div>
 );
};

export default ClaimStatusTable;
