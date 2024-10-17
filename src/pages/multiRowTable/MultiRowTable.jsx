import React, { useState, useRef } from 'react';
import { Table, Input } from 'antd';
import { useDebounce } from 'use-debounce';
import './index.scss';

const data = Array.from({ length: 150 }, (_, i) => ({
  key: i,
  name: `John Doe ${i}`,
  age: Math.floor(Math.random() * 60) + 18,
  address: `Street ${i}`,
  occupation: `Occupation ${i}`,
  company: `Company ${i}`,
  city: `City ${i}`,
  country: `Country ${i}`,
}));

// Function to highlight the search term in text
const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.toString().split(regex);
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} className="highlight">{part}</span>
    ) : (
      part
    )
  );
};

// Helper function for column-specific search
const getColumnSearchProps = (dataIndex, searchTerm, setSearchTerm, setSortActive, inputRef) => ({
  title: (
    <div>
      {dataIndex.charAt(0).toUpperCase() + dataIndex.slice(1)}
      <Input
        ref={inputRef} // Add ref here
        placeholder={`Search ${dataIndex}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => {
          setSortActive(false);  // Disable sorting while focusing
        }}
        onBlur={() => {
          setSortActive(true);   // Re-enable sorting after leaving input
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering table row selection
          inputRef.current.focus(); // Focus the input on click
        }}
        style={{ marginTop: 8, marginBottom: 8, width: '100%' }}
        size="small"
      />
    </div>
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  render: (text) => highlightText(text, searchTerm),
});

const MultiRowTable = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [columnSearch, setColumnSearch] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const [sortActive, setSortActive] = useState(true);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Create refs for input fields
  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const occupationInputRef = useRef(null);
  const companyInputRef = useRef(null);

  // Apply Global Search
  React.useEffect(() => {
    const filtered = data.filter((item) => {
      const globalSearchMatch = Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

      // Apply Column-Specific Search Filters
      const columnFilterMatch = Object.keys(columnSearch).every((key) => {
        if (!columnSearch[key]) return true;
        return item[key]
          .toString()
          .toLowerCase()
          .includes(columnSearch[key].toLowerCase());
      });

      return globalSearchMatch && columnFilterMatch;
    });

    setFilteredData(filtered);
  }, [debouncedSearchTerm, columnSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    if (sortActive) {
      setFilteredData((prevData) => {
        const sortedData = [...prevData].sort((a, b) => {
          if (sorter.order === 'ascend') {
            return a[sorter.field] > b[sorter.field] ? 1 : -1;
          }
          if (sorter.order === 'descend') {
            return a[sorter.field] < b[sorter.field] ? 1 : -1;
          }
          return 0;
        });
        return sortedData;
      });
    }
  };

  const columns = [
    {
      title: getColumnSearchProps('name', columnSearch.name, (val) =>
        setColumnSearch({ ...columnSearch, name: val }), setSortActive, nameInputRef).title,
      dataIndex: 'name',
      key: 'name',
      sorter: sortActive && ((a, b) => a.name.localeCompare(b.name)),
      width: 130,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: getColumnSearchProps('age', columnSearch.age, (val) =>
        setColumnSearch({ ...columnSearch, age: val }), setSortActive, ageInputRef).title,
      dataIndex: 'age',
      key: 'age',
      sorter: sortActive && ((a, b) => a.age - b.age),
      width: 100,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: getColumnSearchProps('address', columnSearch.address, (val) =>
        setColumnSearch({ ...columnSearch, address: val }), setSortActive, addressInputRef).title,
      dataIndex: 'address',
      key: 'address',
      sorter: sortActive && ((a, b) => a.address.localeCompare(b.address)),
      width: 200,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: getColumnSearchProps('occupation', columnSearch.occupation, (val) =>
        setColumnSearch({ ...columnSearch, occupation: val }), setSortActive, occupationInputRef).title,
      dataIndex: 'occupation',
      key: 'occupation',
      width: 150,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
    {
      title: getColumnSearchProps('company', columnSearch.company, (val) =>
        setColumnSearch({ ...columnSearch, company: val }), setSortActive, companyInputRef).title,
      dataIndex: 'company',
      key: 'company',
      width: 150,
      render: (text) => highlightText(text, debouncedSearchTerm),
    },
  ];

  return (
    <div className="minimalist-table-container">
      {/* Global Search Input */}
      <Input
        placeholder="Search across all columns"
        value={searchTerm}
        onChange={handleSearch}
        className="minimalist-search"
        style={{ marginBottom: 16 }}
      />
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
