import React, { useState } from 'react';
import { Checkbox } from 'antd';
import './CustomList.scss';

const CustomList = ({
 tableColumn = '',
 tableData = [],
 handleEdit,
 handleDelete,
}) => {
 const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;
 const [selectedRows, setSelectedRows] = useState([]);

 const handleCheckboxChange = item => {
  const isSelected = selectedRows.some(
   selectedItem => selectedItem.ID === item.ID,
  );
  if (isSelected) {
   setSelectedRows(
    selectedRows.filter(selectedItem => selectedItem.ID !== item.ID),
   );
  } else {
   setSelectedRows([...selectedRows, item]);
  }
 };

 return (
  <div className='custom-list'>
   {selectedRows?.length > 0 && (
    <div className='flex items-center mb-1 custom-list-actions'>
     <p className='ml-1'>Delete ({selectedRows?.length})</p>
     <p className='ml-4' onClick={() => setSelectedRows([])}>
      Cancel
     </p>
    </div>
   )}
   <table className='custom-list-table'>
    <thead>
     <tr>
      <th></th>
      {Object.keys(column)?.map(item => (
       <th key={item}>{column[item]}</th>
      ))}
      <th className='last-column-action'>Action</th>
     </tr>
    </thead>
    {Object.keys(tableData[0])?.length > 0 && (
     <tbody>
      {tableData?.map(item => (
       <tr key={item?.ID}>
        <td>
         <Checkbox
          checked={selectedRows.some(
           selectedItem => selectedItem.ID === item.ID,
          )}
          onChange={() => handleCheckboxChange(item)}
         />
        </td>
        {Object.keys(column)?.map(currentValue => {
         const mainKey = column[currentValue];
         return (
          <td className='select-none' key={mainKey}>
           {item[currentValue]}
          </td>
         );
        })}
        <td>
         <div className='icon-container'>
          <i class='bi bi-eye' />
          <i class='bi bi-pencil-square' onClick={() => handleEdit(item)} />
          <i class='bi bi-trash' onClick={() => handleDelete(item)} />
         </div>
        </td>
       </tr>
      ))}
     </tbody>
    )}
   </table>
  </div>
 );
};

export default CustomList;
