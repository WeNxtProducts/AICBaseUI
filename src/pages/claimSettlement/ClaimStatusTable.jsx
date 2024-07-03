import React from 'react';

const ClaimStatusTable = () => {
 return (
  <div className='mt-4 status_table rounded-lg'>
   <table className='status_main_table'>
    <thead>
     <tr>
      <th>Cover Code</th>
      <th>LC Amount</th>
      <th>Status</th>
     </tr>
    </thead>
    <tbody>
     <tr>
      <td>1000</td>
      <td>2,00,000</td>
      <td>
       <div>
        <p className='status_notify approved'>Paid</p>
       </div>
      </td>
     </tr>
     <tr>
      <td>1000</td>
      <td>2,00,000</td>
      <td>
       <div>
        <p className='status_notify pending'>Unpaid</p>
       </div>
      </td>
     </tr>
     <tr>
      <td>1000</td>
      <td>2,00,000</td>
      <td>
       <div>
        <p className='status_notify pending'>Unpaid</p>
       </div>
      </td>
     </tr>
    </tbody>
   </table>
  </div>
 );
};

export default ClaimStatusTable;
