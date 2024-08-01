import React, { useEffect, useState } from 'react';
import data from '../../../getFormFields/reports.json';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TableComponent = () => {
 const [columns, setColumns] = useState([
  { id: 'name', label: 'Name' },
  { id: 'age', label: 'Age' },
  { id: 'city', label: 'City' },
 ]);
 const [groupBy, setGroupBy] = useState([]);
 const [collapsed, setCollapsed] = useState({});

 const flattenGroupedData = data => {
  let flatData = [];

  const flatten = data => {
   for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
     const value = data[key];
     if (Array.isArray(value)) {
      flatData = flatData.concat(value);
     } else {
      flatten(value);
     }
    }
   }
  };

  flatten(data);
  return flatData;
 };

 const groupData = (data, groupBy, level = 0) => {
  if (level >= groupBy.length) return data;

  const currentGroupKey = groupBy[level];
  const groupedData = data.reduce((acc, item) => {
   const key = item[currentGroupKey];
   if (!acc[key]) acc[key] = [];
   acc[key].push(item);
   return acc;
  }, {});

  for (const key in groupedData) {
   if (Object.hasOwnProperty.call(groupedData, key)) {
    groupedData[key] = groupData(groupedData[key], groupBy, level + 1);
   }
  }

  return groupedData;
 };

 const reorderGroupedData = (groupedData, newGroupBy) => {
  // Flatten the already grouped data
  const flatData = flattenGroupedData(groupedData);
  // Regroup data based on the new groupBy array
  return groupData(flatData, newGroupBy);
 };

 const toggleCollapse = key => {
  setCollapsed(prevState => ({ ...prevState, [key]: !prevState[key] }));
 };

 const renderTableOwn = (data, level = 0, parentKey = '') => {
  return Object.entries(data).map(([key, value]) => {
   const uniqueKey = parentKey ? `${parentKey}-${key}` : key;
   const isCollapsed = collapsed[uniqueKey];
   return (
    <React.Fragment key={uniqueKey}>
     <tr>
      <td
       onClick={() => toggleCollapse(uniqueKey)}
       // width: `${level + 1 * 10}px`
       style={{ width: `${level + 1 * 10}px`, padding: `${level + 1 * 10}px` }}>
       <span style={{ paddingLeft: `${level * 20}px` }}>
        <button>{isCollapsed ? '+' : '-'}</button>
       </span>
      </td>
      <td
       colSpan={3}
       style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
       {`${groupBy[level]} : ${key}`}
      </td>
     </tr>
     {!isCollapsed &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      renderTableOwn(value, level + 1, uniqueKey)}
     {!isCollapsed &&
      Array.isArray(value) &&
      value.map((item, index) => (
       <tr key={index}>
        <td />
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.city}</td>
       </tr>
      ))}
    </React.Fragment>
   );
  });
 };

 const onDragEnd = result => {
  const { source, destination } = result;

  // If there's no destination, do nothing
  if (!destination) return;

  // Prevent moving items within the same droppable area
  if (
   source.droppableId === destination.droppableId &&
   source.index === destination.index
  )
   return;

  // Moving from columns to groupBy
  if (
   source.droppableId === 'columns' &&
   destination.droppableId === 'groupBy'
  ) {
   const column = columns[source.index];
   if (!groupBy.some(item => item.id === column.id)) {
    console.log('[...groupBy, column?.id] : ', [...groupBy, column?.id]);
    setGroupBy([...groupBy, column?.label]);
   }
  }
 };

 return (
  <DragDropContext onDragEnd={onDragEnd}>
   <div className='own-table'>
    <Droppable droppableId='groupBy' direction='horizontal'>
     {(provided, snapshot) => (
      <div
       className='groupBy_list'
       ref={provided.innerRef}
       {...provided.droppableProps}
       style={{
        minHeight: '50px',
        border: '1px solid #ccc',
        padding: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        background: snapshot.isDraggingOver ? 'lightblue' : 'white',
       }}>
       {groupBy.map((item, index) => (
        <Draggable key={item} draggableId={item} index={index}>
         {provided => (
          <p
           ref={provided.innerRef}
           {...provided.draggableProps}
           {...provided.dragHandleProps}
           style={{
            margin: '0 10px',
            ...provided.draggableProps.style,
            userSelect: 'none',
           }}>
           {item}
          </p>
         )}
        </Draggable>
       ))}
       {provided.placeholder}
      </div>
     )}
    </Droppable>
    <table className='own_table'>
     <thead>
      <Droppable
       droppableId='columns'
       direction='horizontal'
       isDropDisabled={true}>
       {provided => (
        <tr ref={provided.innerRef} {...provided.droppableProps}>
         <th></th>
         {columns.map((column, index) => {
          const isGrouped = groupBy.includes(column.label);
          return (
           <Draggable
            key={column.id}
            draggableId={column.id}
            index={index}
            isDragDisabled={isGrouped}>
            {(provided, snapshot) => (
             <th
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
               padding: '10px',
               border: '1px solid #ddd',
               cursor: 'grab',
               background: snapshot.isDragging ? 'lightblue' : 'inherit',
               opacity: snapshot.isDragging ? 0.5 : 1,
               ...provided.draggableProps.style,
              }}>
              {column.label}
             </th>
            )}
           </Draggable>
          );
         })}
         {provided.placeholder}
        </tr>
       )}
      </Droppable>
     </thead>
     <tbody>{renderTableOwn(data)}</tbody>
    </table>
   </div>
  </DragDropContext>
 );
};

export default TableComponent;
