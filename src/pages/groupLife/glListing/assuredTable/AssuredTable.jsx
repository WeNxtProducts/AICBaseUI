import React, { useState } from 'react';
import { Table, Input, Checkbox, Button, Popover } from 'antd';
import { useDebounce } from 'use-debounce';
import { faker } from '@faker-js/faker';
import './AssuredTable.scss';
import ChecklistSVG from '../../../../svg/ChecklistSVG';

const generateData = () => {
    return Array.from({ length: 500 }, (_, i) => ({
        key: i,
        mem_id: faker.string.alpha(5),
        mem_name: faker.person.fullName(),
        occ: faker.person.jobTitle(),
        age: faker.number.int({ min: 18, max: 65 }),
        medical: faker.datatype.boolean() ? 'Y' : 'N'
    }));
};



const data = generateData();

const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text?.toString().split(regex);
    return parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="highlight">{part}</span>
        ) : (
            part
        )
    );
};

const AssuredTable = () => {
    const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [selectedColumns, setSelectedColumns] = useState(['All']);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

    const handleColumnFilterChange = (column) => {
        setSelectedColumns((prev) => {
            if (column === 'All') return ['All'];
            const newSelection = prev.includes(column)
                ? prev.filter((col) => col !== column)
                : [...prev.filter((col) => col !== 'All'), column];
            return newSelection.length === 0 ? ['All'] : newSelection;
        });
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    React.useEffect(() => {
        const filtered = data.filter((item) => {
            return selectedColumns.includes('All')
                ? Object.values(item).some((val) =>
                    val?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )
                : selectedColumns.some((col) =>
                    item[col]?.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                );
        });
        setFilteredData(filtered);
    }, [debouncedSearchTerm, selectedColumns]);

    const paginatedData = filteredData.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize
    );

    const columns = [
        {
            title: 'MEMBER ID',
            dataIndex: 'mem_id',
            key: 'mem_id',
            width: '30%',
            render: (text) =>
                selectedColumns.includes('mem_id') || selectedColumns.includes('All')
                    ? highlightText(text, debouncedSearchTerm)
                    : text,
        },
        {
            title: 'MEMBER NAME',
            dataIndex: 'mem_name',
            key: 'mem_name',
            width: '50%',
            render: (text) =>
                selectedColumns.includes('mem_name') || selectedColumns.includes('All')
                    ? highlightText(text, debouncedSearchTerm)
                    : text,
        },
        {
            title: 'OCC CATEGORY',
            dataIndex: 'occ',
            key: 'occ',
            width: '50%',
            render: (text) =>
                selectedColumns.includes('occ') || selectedColumns.includes('All')
                    ? highlightText(text, debouncedSearchTerm)
                    : text,
        },
        {
            title: 'AGE',
            dataIndex: 'age',
            key: 'age',
            width: '10%',
            render: (text) =>
                selectedColumns.includes('age') || selectedColumns.includes('All')
                    ? highlightText(text, debouncedSearchTerm)
                    : text,
        },
        {
            title: 'MEDICAL Y/N',
            dataIndex: 'medical',
            key: 'medical',
            width: '19%',
            render: (text) =>
                selectedColumns.includes('medical') || selectedColumns.includes('All')
                    ? highlightText(text, debouncedSearchTerm)
                    : text,
        },
        {
            title: 'ACTIONS',
            width: '50%',
            render: (text, record) => (
                <div className='action_buttons'>
                    <div className="action_item">
                        <ChecklistSVG className='custom-svg' />
                        <p className='action_names'>Checklist</p>
                    </div>
                </div>
            )
        },
    ];

    const filterOptions = ['All', 'mem_id', 'mem_name', 'occ', 'age', 'medical'];

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys) => {
            setSelectedRowKeys(selectedKeys);
        },
    };

    const expandedRowRender = (record) => (
        <div style={{ marginLeft: '40px' }}>
            <p><strong>City:</strong> {record?.city || ''}</p>
            <p><strong>Country:</strong> {record?.country || ''}</p>
        </div>
    );

    return (
        <div className="minimalist-table-container-assured">
            <div className='column_seletion'>
                <Popover
                    trigger="click"
                    content={
                        <div>
                            {filterOptions.map((col) => (
                                <div key={col}>
                                    <Checkbox
                                        checked={selectedColumns.includes(col)}
                                        onChange={() => handleColumnFilterChange(col)}
                                    >
                                        {col.charAt(0).toUpperCase() + col.slice(1)}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    }
                >
                    <Button
                        className='fil_btn'
                        type='primary'
                        icon={<i className='bi bi-funnel-fill icon-style' />}>
                        Filter
                    </Button>
                </Popover>
                <Input
                    placeholder="Search across selected columns"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="minimalist-search"
                />
            </div>
            <Table
                columns={columns}
                dataSource={paginatedData}
                expandable={{ expandedRowRender }}
                // rowSelection={rowSelection}
                pagination={{
                    ...pagination,
                    total: filteredData.length,
                    showTotal: (total) => `Total ${total} items`,
                    size: 'small',
                }}
                onChange={handleTableChange}
                scroll={{ x: 1000, y: 305 }}
                rowClassName={(record, index) => (index % 2 === 0
                    ? 'minimalist-row-light'
                    : 'minimalist-row-light')} //minimalist-row-dark
                sticky
            />
        </div>
    );
};

export default AssuredTable;
