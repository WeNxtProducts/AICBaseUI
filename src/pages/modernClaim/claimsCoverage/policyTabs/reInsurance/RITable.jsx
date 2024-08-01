import React from 'react';

const RITable = ({ rowData = [], columnData }) => {
 return (
  <div className='mt-3'>
   <table className='claim_ri_table'>
    <thead>
     {Object.keys(columnData)?.map(item => {
      return (
       <th key={item}>
        <div className='flex'>{columnData[item]}</div>
       </th>
      );
     })}
    </thead>

    {rowData?.length > 0 && (
     <tbody>
      {rowData?.map((item, index) => {
       return (
        <tr key={index} data-id={index}>
         {Object.keys(columnData)?.map(currentValue => {
          const mainKey = columnData[currentValue];
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
    )}
   </table>
  </div>
 );
};

export default RITable;
