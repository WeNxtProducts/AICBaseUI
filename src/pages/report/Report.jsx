import React from 'react'
import { AutoSizer, Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';
import './Report.scss';

const Report = () => {
    const [arr, setArr] = React.useState([]);

    React.useEffect(() => {
        const data = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                column1: i,
                column2: `Name ${i}`,
                column3: `Value ${i}`,
                column4: `Category ${i}`,
                column5: `Type ${i}`,
            });
        }
        setArr(data);
    }, []);



    const rowStyle = ({ index }) => {
        if (index < 0) {
            return { className: 'table-header' }; // Header row style
        }
        return { className: `table-row` }; // Apply custom row styles
    };


    return (
        <div className='report'>
            <div style={{ height: '80vh', width: '100%' }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <Table
                            gridStyle={{ outline: 'none' }}
                            width={width}
                            height={height}
                            headerHeight={30}
                            rowHeight={50}
                            rowCount={arr.length}
                            rowGetter={({ index }) => arr[index]}
                            rowClassName={({ index }) =>
                                index === -1 ? 'table-header' : 'table-row'
                            }
                        >
                            <Column
                                width={200}
                                label="Number"
                                dataKey="column1"
                                className="table-cell"
                                headerClassName="table-header-cell"
                            />
                            <Column
                                width={200}
                                label="Name"
                                dataKey="column2"
                                className="table-cell"
                                headerClassName="table-header-cell"
                            />
                            <Column
                                width={200}
                                label="Value"
                                dataKey="column3"
                                className="table-cell"
                                headerClassName="table-header-cell"
                            />
                            <Column
                                width={200}
                                label="Category"
                                dataKey="column4"
                                className="table-cell"
                                headerClassName="table-header-cell"
                            />
                            <Column
                                width={200}
                                label="Type"
                                dataKey="column5"
                                className="table-cell"
                                headerClassName="table-header-cell"
                            />
                        </Table>
                    )}
                </AutoSizer>
            </div>
        </div>
    )
}

export default Report
