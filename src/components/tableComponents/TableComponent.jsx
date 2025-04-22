import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import './TableComponent.scss';

const TableComponent = ({
  tableColumn,
  tableData,
  action = true,
  handleSort,
  process = false,
  handleEdit,
  handleDelete,
  isDelete = true,
  editIcon = 'bi bi-pencil-square',
  handleProcessData = () => { },
}) => {
  const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;
  const tableRefs = useRef([]);
  const [sortState, setSortState] = useState({});

  useEffect(() => {
    document.documentElement.style.setProperty('--column-count', Object.keys(column).length);
  }, [tableColumn]);

  const sortTable = (columnName) => {
    const currentSort = sortState[columnName] || 'none';
    const nextSort = currentSort === 'none' ? 'asc' : currentSort === 'asc' ? 'desc' : 'none';

    setSortState((prevState) => ({
      ...prevState,
      [columnName]: nextSort,
    }));

    handleSort(columnName, nextSort);
  };

  const scrollToRow = (id) => {
    const row = tableRefs.current.find((ref) => {
      return ref.getAttribute('data-id') == id;
    });
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className='table-container-common-table'>
      {tableData?.length > 0 && (
        <table className='custom-table'>
          <thead>
            <tr>
              {Object.keys(column)?.map((item) => {
                const currentSort = sortState[item] || 'none';
                let iconClass = 'bi bi-filter';
                let highlight = false;

                if (currentSort === 'asc') {
                  iconClass = 'bi bi-sort-alpha-up';
                  highlight = true;
                } else if (currentSort === 'desc') {
                  iconClass = 'bi bi-sort-alpha-down';
                  highlight = true;
                }

                return (
                  <th key={item}>
                    <div className='flex'>
                      <p className='select-none'>{column[item]}</p>
                      <div className='sort-icon-container ml-3 cursor-pointer'>
                        <i
                          className={`${iconClass} sort-icon ${highlight ? 'highlight' : ''}`}
                          onClick={() => sortTable(item)}
                        ></i>
                      </div>
                    </div>
                  </th>
                );
              })}
              {action && <th className='last-column-action'>Actions</th>}
            </tr>
          </thead>
          {tableData?.length > 0 && (
            <tbody>
              {tableData?.map((item, index) => {
                return (
                  <tr key={index} data-id={index} ref={(ref) => (tableRefs.current[index] = ref)}>
                    {Object.keys(column)?.map((currentValue) => {
                      const mainKey = column[currentValue];
                      return (
                        <td className='select-none' key={mainKey}>
                          {item[currentValue]}
                        </td>
                      );
                    })}
                    {action && (
                      <td>
                        <div className='icon-container'>
                          <i onClick={() => handleEdit(item)} className={editIcon} />
                          {isDelete && <i className='bi bi-trash' onClick={() => handleDelete(item)} />}
                          {process && (
                            <Button onClick={() => handleProcessData(item)} className='process-button'>
                              Process
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
};

export default TableComponent;
