import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDFdata as data } from '../../components/tableComponents/sampleData';
import ExcelJS from 'exceljs';
import './PdfSample.scss';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PdfSample = () => {
 const [groupBy, setGroupBy] = useState('');
 const [groupedData, setGroupedData] = useState({});
 const [expandedGroups, setExpandedGroups] = useState([]);

 const exportToPdf = () => {
  const tableColumns = Object.keys(data[0]);

  const createTableBody = (group, level) => {
   let body = [];

   Object.entries(group).forEach(([key, items]) => {
    // Add group header
    body.push([
     {
      text: key,
      colSpan: tableColumns.length,
      alignment: 'left',
      margin: [10, 5, 0, 5],
      bold: true,
      fillColor: '#D3D3D3',
     },
     ...Array(tableColumns.length - 1).fill(''),
    ]);

    // Add group items
    items.forEach(item => {
     body.push(
      tableColumns.map(col => ({
       text: item[col],
       alignment: 'center',
       margin: [level * 10, 2, 0, 2],
       fillColor: '#F5F5F5',
      })),
     );
    });

    const totalAge = items.reduce(
     (sum, item) => sum + (parseFloat(item.age) || 0),
     0,
    );

    // Add total row
    body.push([
     {
      text: 'Total',
      alignment: 'right',
      bold: true,
      fillColor: '#F5F5F5',
     },
     {
      text: totalAge.toString(),
      alignment: 'center',
      fillColor: '#F5F5F5',
     },
     {
      text: '',
      alignment: 'center',
      fillColor: '#F5F5F5',
     },
     //  ...Array(tableColumns.length - 2).fill(''),
    ]);
   });

   return body;
  };

  // Define the document structure
  const docDefinition = {
   content: [
    { text: 'Reports', style: 'header' },
    {
     table: {
      headerRows: 1,
      widths: tableColumns.map(() => '*'),
      body: groupBy
       ? [
          tableColumns.map(col => ({
           text: col,
           alignment: 'center',
           bold: true,
           fillColor: '#B0E0E6',
          })),
          ...createTableBody(groupedData),
         ]
       : [
          tableColumns.map(col => ({
           text: col,
           alignment: 'center',
           bold: true,
           fillColor: '#B0E0E6',
          })),
          ...data.map(item =>
           tableColumns.map(col => ({
            text: item[col],
            alignment: 'center',
            fillColor: '#F5F5F5',
            // fillColor:
            //  col === 'age' && parseFloat(item[col]) > 30
            //   ? '#FFCCCB'
            //   : '#F5F5F5', // Red color for age > 20
            // fillColor: parseFloat(item.age) > 30 ? '#FFCCCB' : '#F5F5F5',
           })),
          ),
         ],
     },
     layout: 'lightHorizontalLines',
    },
   ],
   styles: {
    header: {
     fontSize: 18,
     bold: true,
     margin: [0, 0, 0, 10],
    },
   },
  };

  // Create and download the PDF
  pdfMake.createPdf(docDefinition).download('sample.pdf');
 };

 const exportToExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  const tableColumns = Object.keys(data[0]);

  // Add column headers with styling
  const headerRow = worksheet.addRow(tableColumns);
  headerRow.eachCell({ includeEmpty: true }, cell => {
   cell.alignment = { horizontal: 'center' };
   cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; // White text
   cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4F81BD' }, // Background color (e.g., light blue)
   };
  });

  // Add rows
  if (groupBy) {
   Object.entries(groupedData).forEach(([key, items], index) => {
    // Add group header
    const groupHeaderRow = worksheet.addRow(
     [key].concat(Array(tableColumns.length - 1).fill('')),
    );
    groupHeaderRow.eachCell({ includeEmpty: true }, cell => {
     cell.font = { bold: true };
     cell.alignment = { horizontal: 'center' };
    });

    // Add group items
    items.forEach(item => {
     worksheet.addRow(tableColumns.map(col => item[col]));
    });

    // Calculate total for 'age' column
    const totalAge = items.reduce(
     (sum, item) => sum + (parseFloat(item.age) || 0),
     0,
    );

    // Add total row
    worksheet.addRow(['Total', totalAge, '']);

    // Add an empty row after each group
    worksheet.addRow([]);
   });
  } else {
   data.forEach(item => {
    worksheet.addRow(tableColumns.map(col => item[col]));
   });
  }

  // Apply center alignment to all cells
  worksheet.eachRow({ includeEmpty: true }, row => {
   row.eachCell({ includeEmpty: true }, cell => {
    cell.alignment = { horizontal: 'center' };
   });
  });

  // Save to file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
   type:
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;',
  });
  const link = document.createElement('a');
  if (link.download !== undefined) {
   // feature detection
   const url = URL.createObjectURL(blob);
   link.setAttribute('href', url);
   link.setAttribute('download', 'grouped_table.xlsx');
   link.style.visibility = 'hidden';
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
  }
 };

 const handleGroupByChange = event => {
  const column = event.target.value;
  setGroupBy(column);
  if (column) {
   const grouped = data.reduce((acc, item) => {
    const key = item[column];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
   }, {});
   console.log('grouped : ', grouped);
   setGroupedData(grouped);
  } else {
   setGroupedData({});
  }
 };

 const handleCancel = () => {
  setGroupBy('');
  setGroupedData({});
  setExpandedGroups([]);
 };

 const toggleGroup = key => {
  setExpandedGroups(prev =>
   prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key],
  );
 };

 const renderTableRows = () => {
  if (!groupBy) {
   return data.map((item, index) => (
    <tr key={index}>
     {Object.values(item).map((value, idx) => (
      <td key={idx}>{value}</td>
     ))}
    </tr>
   ));
  } else {
   return Object.entries(groupedData).map(([key, group], index) => (
    <React.Fragment key={index}>
     <tr className='group-header' onClick={() => toggleGroup(key)}>
      <td colSpan={Object.keys(data[0]).length}>
       {expandedGroups.includes(key) ? '-' : '+'} {key} ({group.length})
      </td>
     </tr>
     {expandedGroups.includes(key) &&
      group.map((item, idx) => (
       <tr key={idx} className='group-item'>
        {Object.values(item).map((value, i) => (
         <td key={i}>{value}</td>
        ))}
       </tr>
      ))}
    </React.Fragment>
   ));
  }
 };

 return (
  <div className='grouped-table-container'>
   <div className='controls'>
    <label htmlFor='groupBy'>Group By: </label>
    <button onClick={exportToPdf} className='export-button'>
     Export to PDF
    </button>
    {/* <button onClick={exportToExcel}>Export to CSV</button> */}
    <select id='groupBy' value={groupBy} onChange={handleGroupByChange}>
     <option value=''>None</option>
     {Object.keys(data[0]).map((col, index) => (
      <option key={index} value={col}>
       {col}
      </option>
     ))}
    </select>
    <button onClick={handleCancel} className='cancel-button'>
     Cancel
    </button>
   </div>
   <table id='my-table' className='grouped-table'>
    <thead>
     <tr>
      {Object.keys(data[0]).map((col, index) => (
       <th key={index}>{col}</th>
      ))}
     </tr>
    </thead>
    <tbody>{renderTableRows()}</tbody>
   </table>
  </div>
 );
};

export default PdfSample;
