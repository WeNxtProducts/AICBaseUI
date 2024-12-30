import React, { useState } from 'react';
import { faker } from '@faker-js/faker';
import { Pagination } from 'antd'; // Import Ant Design Pagination
import './index.scss'; // Import your SCSS file

const MultiRowTable = () => {
  // Generate sample data using faker
  const generateData = () => {
    return Array.from({ length: 100 }, (_, index) => ({
      key: index + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.number.int({ min: 18, max: 65 }),
      company: faker.company.name(),
      website: faker.internet.url(),
      address: faker.location.streetAddress(),
    }));
  };


  const [data] = useState(generateData());
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Define how many rows per page

  const handleExpandRow = (rowKey) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowKey]: !prev[rowKey],
    }));
  };

  const handleSelectRow = (rowKey) => {
    setSelectedRows((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(rowKey)) {
        newSelected.delete(rowKey);
      } else {
        newSelected.add(rowKey);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowKeys = data.map((row) => row.key);
      setSelectedRows(new Set(allRowKeys));
    } else {
      setSelectedRows(new Set());
    }
  };

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = data.length;

  return (
    <div className="multi_row_tale">
      <table className="custom-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedRows.size === data.length}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Company</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((record) => (
            <React.Fragment key={record.key}>
              <tr className={selectedRows.has(record.key) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(record.key)}
                    onChange={() => handleSelectRow(record.key)}
                  />
                </td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.company}</td>
                <td>
                  <a href={record.website} target="_blank" rel="noopener noreferrer">
                    {record.website}
                  </a>
                </td>
                <td>
                  <button onClick={() => handleExpandRow(record.key)}>
                    {expandedRows[record.key] ? 'Collapse' : 'Expand'}
                  </button>
                </td>
              </tr>
              {expandedRows[record.key] && (
                <tr>
                  <td colSpan="7">{record.address}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        pageSize={rowsPerPage}
        total={totalPages}
        onChange={(page) => setCurrentPage(page)}
        showSizeChanger={false}
        style={{ marginTop: '20px', textAlign: 'right' }}
      />
    </div>
  );
};

export default MultiRowTable;
