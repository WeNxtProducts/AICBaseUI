import React from 'react';
import './InsuranceTable.scss';

const InsuranceTable = ({ rowSelectable = false, rowData = [], columnData, selectedRow,
    handleSelected
}) => {
    const column = columnData?.length > 0 ? JSON.parse(columnData) : columnData;

    const handleSelectRow = (item) => {
        if (rowSelectable) {
            handleSelected(item?.ID);
        }
    };

    return (
        <div className="insurance-table-container">
            <table className="insurance-table">
                <thead>
                    <tr>
                        {Object.keys(column)?.map(item => (
                            <th key={item}>{column[item]}</th>
                        ))}
                    </tr>
                </thead>
                {rowData?.length > 0 && (
                    <tbody>
                        {rowData?.map((item, index) => (
                            <tr
                                key={index}
                                className={`${rowSelectable && selectedRow === item?.ID ? 'selected' : ''} ${!rowSelectable ? 'hoverable' : ''}`}
                            >
                                {Object.keys(column)?.map((currentValue, colIndex) => {
                                    const mainKey = column[currentValue];
                                    const isFirstColumn = colIndex === 0;

                                    return (
                                        <td
                                            key={mainKey}
                                            className={`select-none ${isFirstColumn && rowSelectable ? 'plan-type clickable' : ''}`}
                                            onClick={() => isFirstColumn && handleSelectRow(item)}
                                        >
                                            {item[currentValue]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default InsuranceTable;
