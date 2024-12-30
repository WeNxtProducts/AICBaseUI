import React, { useState } from 'react';
import { Button } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import CustomSelect from './../../../../components/customFieldComponents/customSelect/CustomSelect';
import CustomNumberField from './../../../../components/customFieldComponents/customNumberField/CustomNumberField';
import './TaxSlabRateTable.scss';

const TaxSlabRateTable = () => {
    const [rows, setRows] = useState([{ id: Date.now(), TYPE: '', LIMIT: '', RATE: '', RATE_PER: '' }]);
    const [editingRow, setEditingRow] = useState(null);

    const handleAddRow = () => {
        setRows([...rows, { id: Date.now(), TYPE: '', LIMIT: '', RATE: '', RATE_PER: '' }]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleChange = (id, field, value) => {
        setEditingRow(id);
        setRows(
            rows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        [field]: value,
                    }
                    : row
            )
        );
    };

    return (
        <div className="tax-slab-rate-table">
            <div className="add-btn">
                <Button type="primary" onClick={handleAddRow} className="add-row-btn">
                    <PlusOutlined /> Add
                </Button>
            </div>
            <div className='mb-6'>
                <table className="borderless-table-tax">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Limit</th>
                            <th>Rate</th>
                            <th>Rate Per</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr
                                key={row.id}
                                className={editingRow === row.id ? 'editing-row' : ''}
                            >
                                <td>
                                    <CustomSelect
                                        name='TYPE'
                                        size='large'
                                        showSearch={false}
                                        readOnly={false}
                                        options={[]}
                                        placeholder='select'
                                        value={row?.TYPE || undefined}
                                        onChange={(e) => handleChange(row.id, 'TYPE', e)}
                                    />
                                </td>
                                <td>
                                    <CustomNumberField
                                        name='LIMIT'
                                        placeholder='.00'
                                        size='large'
                                        readOnly={false}
                                        value={row?.LIMIT}
                                        onChange={(e) => handleChange(row.id, 'LIMIT', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <CustomNumberField
                                        name='RATE'
                                        placeholder='.00'
                                        size='large'
                                        readOnly={false}
                                        value={row?.RATE}
                                        onChange={(e) => handleChange(row.id, 'RATE', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <CustomNumberField
                                        name='RATE_PER'
                                        placeholder='.00'
                                        size='large'
                                        readOnly={false}
                                        value={row?.RATE_PER}
                                        onChange={(e) => handleChange(row.id, 'RATE_PER', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <DeleteOutlined
                                        className="delete-icon"
                                        onClick={() => handleDeleteRow(row.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='mt-1 flex justify-center'>
                    <Button className="sub-btn">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaxSlabRateTable;
