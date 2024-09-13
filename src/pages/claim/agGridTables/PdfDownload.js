import * as XLSX from 'xlsx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const exportToPDF = gridApi => {
 const doc = getDocument(gridApi.current.api);
 pdfMake.createPdf(doc).download();
};

export const exportToExcel = gridApi => {
 const doc = gridApi.current.api;
 const headerRow = getHeaderToExport(doc);
 const rows = getRowsToExport(doc);
 const worksheetData = [
  headerRow.map(cell => cell.text),
  ...rows.map(row => row.map(cell => cell.text)),
 ];

 const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

 // Create a workbook and append the worksheet
 const workbook = XLSX.utils.book_new();
 XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

 // Generate Excel file and trigger download
 XLSX.writeFile(workbook, 'data.xlsx');
};

const getDocument = gridApi => {
 const columns = gridApi.getAllDisplayedColumns();
 const headerRow = getHeaderToExport(gridApi);
 const rows = getRowsToExport(gridApi);

 return {
  pageOrientation: 'landscape', // can also be 'portrait'
  content: [
   {
    table: {
     // the number of header rows
     headerRows: 1,

     // the width of each column, can be an array of widths
     widths: `${100 / columns.length}%`,

     // all the rows to display, including the header rows
     body: [headerRow, ...rows],

     // Header row is 40px, other rows are 15px
     heights: rowIndex => (rowIndex === 0 ? 40 : 15),
    },
    layout: createLayout(1),
   },
  ],
  pageMargins: [10, 10, 10, 10],
 };
};

const getHeaderToExport = gridApi => {
 const columns = gridApi.getAllDisplayedColumns();

 return columns.map(column => {
  const { field } = column.getColDef();
  const sort = column.getSort();
  // Enables export when row grouping
  const headerName = column.getColDef().headerName ?? field;
  const headerNameUppercase = headerName[0].toUpperCase() + headerName.slice(1);
  const headerCell = {
   text: headerNameUppercase + (sort ? ` (${sort})` : ''),

   // styles
   bold: true,
   margin: [0, 12, 0, 0],
  };
  return headerCell;
 });
};

const getRowsToExportPivot = gridApi => {
 const columns = gridApi.getAllDisplayedColumns();

 const getCellToExport = (column, node) => ({
  text: gridApi.getValue(column, node) ?? '',
  // styles
  ...column.getColDef().cellStyle,
 });

 const rowsToExport = [];
 gridApi.forEachNodeAfterFilterAndSort(node => {
  if (node.group) {
   const rowToExport = columns.map(column => getCellToExport(column, node));
   rowsToExport.push(rowToExport);
  }
 });

 return rowsToExport;
};

const getRowsToExport = gridApi => {
 //Enables export when pivoting
 if (gridApi.isPivotMode()) {
  return getRowsToExportPivot(gridApi);
 }
 const columns = gridApi.getAllDisplayedColumns();

 const getCellToExport = (column, node) => ({
  text: gridApi.getValue(column, node) ?? '',
  // styles
  ...column.getColDef().cellStyle,
 });

 const rowsToExport = [];
 gridApi.forEachNodeAfterFilterAndSort(node => {
  const rowToExport = columns.map(column => getCellToExport(column, node));
  rowsToExport.push(rowToExport);
 });

 return rowsToExport;
};

const HEADER_ROW_COLOR = '#f8f8f8';
const EVEN_ROW_COLOR = '#fcfcfc';
const ODD_ROW_COLOR = '#fff';

const PDF_INNER_BORDER_COLOR = '#dde2eb';
const PDF_OUTER_BORDER_COLOR = '#babfc7';

const createLayout = numberOfHeaderRows => ({
 fillColor: rowIndex => {
  if (rowIndex < numberOfHeaderRows) {
   return HEADER_ROW_COLOR;
  }
  return rowIndex % 2 === 0 ? EVEN_ROW_COLOR : ODD_ROW_COLOR;
 },
 //vLineHeight not used here.
 vLineWidth: (rowIndex, node) => (rowIndex === 0 || rowIndex === node.table.widths.length ? 1 : 0),
 hLineColor: (rowIndex, node) =>
  rowIndex === 0 || rowIndex === node.table.body.length
   ? PDF_OUTER_BORDER_COLOR
   : PDF_INNER_BORDER_COLOR,
 vLineColor: (rowIndex, node) =>
  rowIndex === 0 || rowIndex === node.table.widths.length
   ? PDF_OUTER_BORDER_COLOR
   : PDF_INNER_BORDER_COLOR,
});
