import React, { useState, useRef } from 'react';
import { Table, Input, Checkbox } from 'antd';
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

const getColumnSearchProps = (dataIndex, searchTerm, setSearchTerm, setSortActive, inputRef) => ({
  title: (
    <div>
      {dataIndex.charAt(0).toUpperCase() + dataIndex.slice(1)}
      <Input
        ref={inputRef}
        placeholder={`Search ${dataIndex}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setSortActive(false)}
        onBlur={() => setSortActive(true)}
        allowClear
        onClear={() => setSearchTerm('')}
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Track all keys
  const allRowKeys = data.map(item => item.key);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Create refs for input fields
  const nameInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const occupationInputRef = useRef(null);
  const companyInputRef = useRef(null);

  React.useEffect(() => {
    const filtered = data.filter((item) => {
      const globalSearchMatch = Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

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

  const handleSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
    // handleSelectAll()
  };

  const handleSelectAll = () => {
    setSelectedRowKeys(allRowKeys);
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
      <Input
        placeholder="Search across all columns"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
        rowSelection={{
          selectedRowKeys,
          onChange: handleSelectChange,
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
      {/* <h1>Custom Table Web Component in React</h1>
      <custom-table></custom-table> */}
    </div>
  );
};

export default MultiRowTable;
