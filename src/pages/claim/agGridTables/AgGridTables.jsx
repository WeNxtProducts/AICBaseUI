'use strict';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { exportToExcel, exportToPDF } from './PdfDownload';
import './AgGridTables.scss';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TextFieldRenderer = props => {
 return <input type='text' value={props.value} onChange={e => props.setValue(e.target.value)} />;
};

const CustomCellRenderer = param => {
 return (
  <div className={`my-custom-cell-renderer`}>
   <div className='athlete-info'>
    <span>{param.data.age}</span>
   </div>
  </div>
 );
};

const ColourCellComp = param => {
 return <span style={{ color: param.color }}>{param.data.year}</span>;
};

const AgGridTables = () => {
 const gridRef = useRef();
 const containerStyle = useMemo(() => ({ width: '100%', height: '80vh' }), []);
 const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
 const [rowData, setRowData] = useState();
 const [columnDefs, setColumnDefs] = useState([
  {
   headerName: 'Athlete Name',
   field: 'athlete',
   minWidth: 200,
   cellStyle: { fontWeight: 'bold' },
   filter: 'agSetColumnFilter',
   wrapText: true,
   editable: true,
   //  cellClass: 'custom-athlete-cell', // applies style to particular cell
   //  cellRenderer: CustomCellRenderer,
   //  rowDrag: true
   //  getQuickFilterText: params => { // exclude in quick filter
   //   return params.value.name;
   //  },
  },
  {
   field: 'age',
   filter: true,
   floatingFilter: true,
   cellRenderer: CustomCellRenderer,
   tooltipValueGetter: p => p.value,
   headerTooltip: 'Tooltip for Year Column Header',
  },
  {
   field: 'country',
   minWidth: 200,
   filter: 'agTextColumnFilter',
   valueFormatter: p => p.value.toUpperCase(),
  },
  {
   field: 'year',
   filter: 'agNumberColumnFilter',
   sortable: false,
   cellRenderer: ColourCellComp,
   cellRendererParams: {
    color: 'red',
   },
  },
  {
   field: 'date',
   minWidth: 150,
   floatingFilter: true,
   suppressFloatingFilterButton: true,
   filterParams: {
    buttons: ['apply', 'reset'],
    closeOnApply: true,
    filterPlaceholder: 'date',
   },
  },
  {
   field: 'sport',
   minWidth: 150,
   floatingFilter: true,
   suppressFloatingFilterButton: true,
  },
  {
   field: 'gold',
   filter: 'numberFilter',
   cellStyle: params => {
    if (params.value == '1') {
     return { color: 'red', backgroundColor: 'lightgrey' };
    }
    return null;
   },
  },
  { field: 'silver', filter: 'agNumberColumnFilter' },
  {
   headerName: 'Total Medals (valueGetter)',
   valueGetter: p => p.data.gold + p.data.silver + p.data.bronze,
  },
 ]);
 const defaultColDef = useMemo(() => {
  return {
   filter: true,
   minWidth: 100,
   flex: 1,
   suppressMovable: true, // lock column move
   //sortable: false
  };
 }, []);

 const onGridReady = useCallback(params => {
  //   setRowData(olympics);
  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
   .then(resp => resp.json())
   .then(data => setRowData(data));
 }, []);

 const onFilterChanged = params => {
  const filters = params.api.getFilterModel();
  console.log('onFilterChanged  : ', filters);
 };

 const onFilterTextBoxChanged = useCallback(() => {
  gridRef.current.api.setGridOption(
   'quickFilterText',
   document.getElementById('filter-text-box').value,
  );
 }, []);

 // set background colour on every row, this is probably bad, should be using CSS classes
 const rowStyle = { background: 'black' };

 // set background colour on even rows again, this looks bad, should be using CSS classes
 const getRowStyle = params => {
  if (params.node.rowIndex % 2 === 0) {
   return { background: 'red' };
  }
 };

 const rowClassRules = {
  // apply green to 2008
  'rag-green-outer': params => {
   return params.data.year === 2008;
  },

  // apply amber 2004
  'rag-amber-outer': params => {
   return params.data.year === 2004;
  },

  // apply red to 2000
  'rag-red-outer': params => {
   return params.data.year === 2000;
  },

  //Another Way
  'rag-green': 'data.age < 20',
  'rag-amber': 'data.age >= 20 && data.age < 25',
  'rag-red': 'data.age >= 25',
 };

 const onCellValueChanged = NewValueParams => {
  console.log('onCellValueChanged : ', NewValueParams);
 };

 return (
  <div style={containerStyle}>
   <div className='container'>
    <div>
     <button
      onClick={() => exportToExcel(gridRef)}
      style={{ marginBottom: '5px', fontWeight: 'bold' }}>
      Export to Excel
     </button>
     <button
      className='ml-10'
      onClick={() => exportToPDF(gridRef)}
      style={{ marginBottom: '5px', fontWeight: 'bold' }}>
      Export to PDF
     </button>
    </div>
    <div className='example-header'>
     <span>Quick Filter:</span>
     <input
      type='text'
      id='filter-text-box'
      placeholder='Filter...'
      onInput={onFilterTextBoxChanged}
     />
    </div>
    <div className='grid-wrapper'>
     <div
      style={gridStyle}
      className={'ag-theme-quartz'}
      // className={'ag-theme-quartz-dark'}
     >
      <AgGridReact
       ref={gridRef}
       rowData={rowData}
       columnDefs={columnDefs}
       defaultColDef={defaultColDef}
       //  rowSelection={'multiple'}
       // pagination={true}
       // paginationPageSize={10}
       //  rowHeight={30}
       //  rowStyle={rowStyle}
       //  getRowStyle={getRowStyle}
       //  rowDragManaged={true}
       tooltipShowDelay={0}
       tooltipHideDelay={2000}
       onCellValueChanged={onCellValueChanged}
       rowClassRules={rowClassRules}
       onFilterChanged={onFilterChanged}
       onGridReady={onGridReady}
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default AgGridTables;
