import React, { useEffect, useState } from 'react';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';

const BrokerRates = ({ brokerId, code, brokerName }) => {
    const { rowData, columnData, handleMRVListing } = useMRVListing();
    // const [heading, setHeading] = useState(null)

    const Heading = JSON.parse(
        '{"Commission Code":"Commission Code","Year From":"Year From","Year To":"Year To","Rate":"Rate","Rate Per":"Rate Per"}',
    );

    const columns = Object.keys(Heading);

    useEffect(() => {
        handleMRVListing(205, brokerId);
    }, [brokerId]);

    useEffect(() => {
        console.log('brokerId : ', brokerId, rowData);
    }, [rowData]);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    return (
        <div className='broker_content'>
            <div className='broker_title flex items-center'>
                <p className='broker_text'>{brokerName} -  {code}</p>
            </div>
            {hasValidRowData(rowData) ? (
                <div className='flex items-center justify-center'>
                    <table className='custom-table'>
                        <thead>
                            <tr>
                                {columns.map(key => (
                                    <th key={key}>{Heading[key]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map((row, index) => (
                                <tr key={index}>
                                    {columns.map(key => (
                                        <td key={key}>{row[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No Data</p>
            )}
        </div>
    );
};

export default BrokerRates;
