'use strict';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import { exportToExcel, exportToPDF } from './PdfDownload';
import { olympics } from '../../../components/tableComponents/sampleData';
import './AgGridTables.scss';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AgGridTables = () => {
 const gridRef = useRef();
 const containerStyle = useMemo(() => ({ width: '100%', height: '80vh' }), []);
 const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
 const [rowData, setRowData] = useState();
 const [columnDefs, setColumnDefs] = useState([
  { field: 'athlete', minWidth: 200 },
  { field: 'age' },
  { field: 'country', minWidth: 200 },
  { field: 'year' },
  { field: 'date', minWidth: 150 },
  { field: 'sport', minWidth: 150 },
  { field: 'gold' },
  { field: 'silver' },
 ]);
 const defaultColDef = useMemo(() => {
  return {
   filter: true,
   minWidth: 100,
   flex: 1,
  };
 }, []);

 const onGridReady = useCallback(params => {
  //   setRowData(olympics);
  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
   .then(resp => resp.json())
   .then(data => setRowData(data));
 }, []);

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
    <div className='grid-wrapper'>
     <div style={gridStyle} className={'ag-theme-quartz-dark'}>
      <AgGridReact
       ref={gridRef}
       rowData={rowData}
       columnDefs={columnDefs}
       defaultColDef={defaultColDef}
       //    rowSelection={'multiple'}
       onGridReady={onGridReady}
      />
     </div>
    </div>
   </div>
  </div>
 );
};

export default AgGridTables;
