import React from 'react';
import data from '../../../getFormFields/reports.json';

const TableComponent = () => {
 const renderTable = data => {
  return Object.entries(data).map(([key, value]) => (
   <React.Fragment key={key}>
    <tr>
     <tr>
      <td>{key}</td>
     </tr>
     <td>
      {typeof value === 'object' && !Array.isArray(value) ? (
       <tr>{renderTable(value)}</tr>
      ) : Array.isArray(value) ? (
       <>
        {value.map((item, index) => (
         <tr key={index}>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.city}</td>
         </tr>
        ))}
       </>
      ) : (
       value
      )}
     </td>
    </tr>
   </React.Fragment>
  ));
 };

 const renderTableOwn = data => {
  return Object.entries(data).map(([key, value]) => (
   <tr key={key}>
    <p>{key}</p>
   </tr>
  ));
 };

 return (
  <table className='own_table'>
   <thead>
    <tr>
     <th>Name</th>
     <th>Age</th>
     <th>City</th>
    </tr>
   </thead>
   {/* <tbody>{renderTable(data)}</tbody> */}
   <tbody>{renderTableOwn(data)}</tbody>
  </table>
 );
};

export default TableComponent;
