import React from 'react';
import './ModernTable.scss';

const ModernTable = ({ tableColumn = {}, tableData = [] }) => {
 return (
  <div className='status_table rounded-lg'>
   <table className='status_main_table'>
    <thead>
     <tr>
      {Object.keys(tableColumn)?.map(item => (
       <th key={item}>{tableColumn[item]}</th>
      ))}
     </tr>
    </thead>
    <tbody>
     {tableData?.map((item, index) => {
      return (
       <tr key={index}>
        {Object.keys(tableColumn)?.map(currentValue => {
         const mainKey = tableColumn[currentValue];
         return (
          <td className='select-none' key={mainKey}>
           {item[currentValue]}
          </td>
         );
        })}
       </tr>
      );
     })}
    </tbody>
   </table>
  </div>
 );
};

export default ModernTable;
