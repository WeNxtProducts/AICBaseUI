import React from 'react';
import { commissionTable } from '../../../../../components/tableComponents/sampleData';

const AgentCommission = () => {
 return (
  <div className='commission_table'>
   <div className='p-3 commission_header'>
    <p>
     Commission Code : <span>COMM-LPLAN</span>
    </p>
   </div>
   <div className='main_table p-3'>
    <table className='comm_table'>
     <thead>
      <tr>
       <th>Year From</th>
       <th>Year To</th>
       <th>Percentage</th>
      </tr>
     </thead>
     <tbody>
      {commissionTable?.map(item => (
       <tr key={item?.from}>
        <td>{item?.from}</td>
        <td>{item?.to}</td>
        <td>{item?.per}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default AgentCommission;
