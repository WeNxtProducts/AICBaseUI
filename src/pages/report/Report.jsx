import React, { useRef, useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import reportsJSON from '../../getFormFields/reportsSam.json';
import './Report.scss';

const Row = ({ index, style, data }) => {
    const row = data[index];
    return (
        <div className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`} style={style}>
            <div className="table-cell">{row?.POL_PROP_NO}</div>
            <div className="table-cell">{row?.POL_ASSURED_NAME}</div>
            <div className="table-cell">{row?.BANKNAME}</div>
            <div className="table-cell">{row?.POL_APPRV_STATUS}</div>
            <div className="table-cell">{row?.CREATED_BY}</div>
            <div className="table-cell">{row?.RECP_DT}</div>
            <div className="table-cell">{row?.PREMIUM_COUNT}</div>
            <div className="table-cell">{row?.DEP_DOC_NO}</div>
            <div className="table-cell">{row?.TRAN_CODE}</div>
            <div className="table-cell">{row?.ACTUAL_PREM}</div>
            <div className="table-cell">{row?.COLLECTED_PREM}</div>
        </div>
    );
};

const VirtualizedTable = ({ data }) => {
    const [tableWidth, setTableWidth] = useState(0);
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            setTableWidth(tableRef.current.scrollWidth);
        }
    }, []);

    return (
        <div className="table-container-report" ref={tableRef}>
            <div className="table-content" style={{ width: tableWidth }}>
                <div className="table-header">
                    <div className="table-cell">POL_PROP_NO</div>
                    <div className="table-cell">POL_ASSURED_NAME</div>
                    <div className="table-cell">BANKNAME</div>
                    <div className="table-cell">POL_APPRV_STATUS</div>
                    <div className="table-cell">CREATED_BY</div>
                    <div className="table-cell">RECP_DT</div>
                    <div className="table-cell">PREMIUM_COUNT</div>
                    <div className="table-cell">DEP_DOC_NO</div>
                    <div className="table-cell">TRAN_CODE</div>
                    <div className="table-cell">ACTUAL_PREM</div>
                    <div className="table-cell">COLLECTED_PREM</div>
                </div>
                <List
                    height={400}
                    itemCount={data?.length}
                    itemSize={50}
                    width={tableWidth}
                    itemData={data}
                    className="window-scroll"
                >
                    {Row}
                </List>
            </div>
        </div>
    );
};

const Report = () => {
    return (
        <div>
            <VirtualizedTable data={reportsJSON} />
        </div>
    );
};

export default Report;