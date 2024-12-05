import React, { useEffect, useState } from 'react'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import CustomNumberField from '../../../components/customFieldComponents/customNumberField/CustomNumberField';
import TableWithFields from './TableWithFields';
import './TableEditFields.scss';

const TableEditFields = ({ rows, setRows, editingRow, handleDeleteRow, handleChange,
    tableFields
}) => {
    const [extractedObjectKeys, setExtractedObjectKeys] = useState([])

    const handleAddRow = () => {
        setRows([...rows, extractedObjectKeys])
    };

    useEffect(() => {
        const extractedObject = Object.keys(tableFields).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {});
        setRows([extractedObject])
        setExtractedObjectKeys(extractedObject)
    }, [])

    return (
        <div className='table_edit_fields mb-3 mt-5'>
            <div className="table_edit_fields_table">
                <div className="add-btn pt-3 mb-9">
                    <Button type="primary" onClick={handleAddRow} className="add-row-btn">
                        <PlusOutlined /> Add
                    </Button>
                </div>
                <div className='mb-6'>
                    <table className="borderless-table-tax">
                        <thead>
                            <tr>
                                {Object.entries(tableFields)?.map(([key, col]) => (
                                    <th key={`${key}-col`}>{col.label}</th>
                                ))}
                                <th></th>
                            </tr>
                        </thead>
                        {rows?.length > 0 ?
                            <tbody>
                                {rows?.map((row, index) => (
                                    <tr
                                        key={`${index}`}
                                        className={editingRow === row?.index ? 'editing-row' : ''}
                                    >
                                        {Object.entries(tableFields)?.map(([key, col]) => (
                                            <td style={{ width: `${col?.width}` }}
                                                key={`${col?.label}-${index}-row`}>
                                                <TableWithFields
                                                    colDetails={{ ...col, key, index }}
                                                    handleChange={handleChange}
                                                    value={row?.[key]}
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <DeleteOutlined
                                                className="delete-icon"
                                                onClick={() => handleDeleteRow(index)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            : <p>NO Data</p>}
                    </table>

                    <div className='mt-1 flex justify-center'>
                        <Button onClick={() => console.log("rows : ", rows)} className="sub-btn">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TableEditFields
