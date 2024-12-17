import React, { useState } from 'react'
import TableEditFields from '../../../../components/tableEditFields/TableEditFields';
import { maturityChargeDetailsFields } from '../../../../components/tableEditFields/TableFiedConstants';

const MChargeDetails = () => {
    const [rows, setRows] = useState([]);
    const [editingRow, setEditingRow] = useState(null);

    const handleDeleteRow = (index) => {
        setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows.splice(index, 1);
            return updatedRows;
        });
    };

    const handleChange = (index, field, value) => {
        setEditingRow(index);
        const updatedRows = [...rows];
        updatedRows[index] = {
            ...updatedRows[index],
            [field]: value,
        };
        setRows(updatedRows);
    };

    return (
        <div className='charge_details_table_withdrawal'>
            <TableEditFields
                rows={rows}
                setRows={setRows}
                editingRow={editingRow}
                handleDeleteRow={handleDeleteRow}
                handleChange={handleChange}
                tableFields={maturityChargeDetailsFields}
            />
        </div>
    )
}

export default MChargeDetails

