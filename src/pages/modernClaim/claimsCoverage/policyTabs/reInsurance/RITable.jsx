import React from 'react';

const RITable = () => {
 return (
  <div className='mt-3'>
   <table className='claim_ri_table'>
    <thead>
     <tr>
      <th>Cover Code</th>
      <th>Description</th>
      <th>Treaty Type</th>
      <th>Retn Clm Paid</th>
      <th>RI Clm Paid</th>
      <th>Cust Code</th>
      <th>Cust Name</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>FR1</td>
      <td>Funeralbenefit</td>
      <td>RETN</td>
      <td>3,73,845</td>
      <td></td>
      <td>RI00002</td>
      <td>Alliance</td>
     </tr>
     <tr>
      <td>FR1</td>
      <td>Funeralbenefit</td>
      <td>CQS</td>
      <td></td>
      <td>23,94,8400</td>
      <td>RI00002</td>
      <td>Alliance</td>
     </tr>
    </tbody>
   </table>
  </div>
 );
};

export default RITable;
