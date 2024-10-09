import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { useDebounce } from 'use-debounce';
import './index.scss';

const data = Array.from({ length: 1000 }, (_, i) => ({
  key: i,
  name: `John Doe ${i}`,
  age: Math.floor(Math.random() * 60) + 18,
  address: `Street ${i}`,
  occupation: `Occupation ${i}`,
  company: `Company ${i}`,
  city: `City ${i}`,
  country: `Country ${i}`,
}));

const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.toString().split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} className="highlight">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const MultiRowTable = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Debounce the search term with a delay of 300 milliseconds
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  React.useEffect(() => {
    const filtered = data.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [debouncedSearchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => highlightText(text, debouncedSearchTerm),
      width: 130,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      width: 100,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      width: 200,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      key: 'occupation',
      width: 150,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      width: 150,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
  ];

  return (
    <div className="minimalist-table-container">
      {/* <Input
        placeholder="Search across all columns"
        value={searchTerm}
        onChange={handleSearch}
        className="minimalist-search"
      /> */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{
          ...pagination,
          total: filteredData.length,
          showTotal: (total) => `Total ${total} items`,
          size: 'small',
        }}
        onChange={handleTableChange}
        scroll={{
          x: 1000,
          y: 350,
        }}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'minimalist-row-light' : 'minimalist-row-dark'
        }
        sticky
      />
    </div>
  );
};

export default MultiRowTable;
