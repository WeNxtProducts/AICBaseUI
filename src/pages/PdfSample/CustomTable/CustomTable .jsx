import React, { useState } from 'react';

const CustomTable = ({ data, columns }) => {
 const [tableColumns, setTableColumns] = useState(columns);
 const [groupedColumns, setGroupedColumns] = useState([]);
 const [expandedGroups, setExpandedGroups] = useState({});

 const handleDragStart = (e, index) => {
  e.dataTransfer.setData('text/plain', index);
 };

 const handleDragOver = e => {
  e.preventDefault();
 };

 const handleDrop = (e, targetIndex) => {
  e.preventDefault();
  const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
  const newColumns = [...tableColumns];
  const [removed] = newColumns.splice(sourceIndex, 1);
  newColumns.splice(targetIndex, 0, removed);
  setTableColumns(newColumns);
 };

 const handleGroupDrop = e => {
  e.preventDefault();
  const columnIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
  const column = tableColumns[columnIndex];

  if (!groupedColumns.some(gc => gc.id === column.id)) {
   setGroupedColumns([...groupedColumns, column]);
   setTableColumns(tableColumns.filter((_, index) => index !== columnIndex));
  }
 };

 const groupData = data => {
  if (groupedColumns.length === 0) return { '': data };

  return data.reduce((acc, row) => {
   const key = groupedColumns.map(col => `${col.title}: ${row[col.field]}`).join(', ');
   if (!acc[key]) {
    acc[key] = [];
   }
   acc[key].push(row);
   return acc;
  }, {});
 };

 const toggleGroup = groupKey => {
  setExpandedGroups(prev => ({
   ...prev,
   [groupKey]: !prev[groupKey],
  }));
 };

 const renderGroupedData = groupedData => {
  return Object.entries(groupedData).map(([groupKey, group], groupIndex) => {
   const isExpanded = expandedGroups[groupKey];

   return (
    <React.Fragment key={groupIndex}>
     <tr>
      <td
       colSpan={tableColumns.length}
       style={{
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
       }}
       onClick={() => toggleGroup(groupKey)}>
       <span style={{ marginRight: '10px' }}>{isExpanded ? '▼' : '▶'}</span>
       {groupKey || 'All Data'}
      </td>
     </tr>
     {isExpanded &&
      group.map((row, rowIndex) => (
       <tr key={rowIndex}>
        {tableColumns.map(column => (
         <td key={column.id}>{row[column.field]}</td>
        ))}
       </tr>
      ))}
    </React.Fragment>
   );
  });
 };

 return (
  <div>
   <div
    onDragOver={handleDragOver}
    onDrop={handleGroupDrop}
    style={{
     border: '1px dashed #ccc',
     padding: '10px',
     marginBottom: '10px',
    }}>
    Drag columns here to group: {groupedColumns.map(col => col.title).join(', ')}
   </div>
   <table style={{ borderCollapse: 'collapse', width: '100%' }}>
    <thead>
     <tr>
      {tableColumns.map((column, index) => (
       <th
        key={column.id}
        draggable={true}
        onDragStart={e => handleDragStart(e, index)}
        onDragOver={handleDragOver}
        onDrop={e => handleDrop(e, index)}
        style={{
         padding: '10px',
         backgroundColor: '#f0f0f0',
         borderBottom: '2px solid #ddd',
         cursor: 'move',
        }}>
        {column.title}
       </th>
      ))}
     </tr>
    </thead>
    <tbody>{renderGroupedData(groupData(data))}</tbody>
   </table>
  </div>
 );
};

export default CustomTable;
