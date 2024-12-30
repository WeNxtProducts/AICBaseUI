import React, { useEffect } from 'react';
import MedFeeMRVList from './MedFeeMRVList';
import useMRVListingPayload from '../../../../components/mrvListing/useMRVListingPayload';

const MedFeeMRV = ({ queryId, heading, tranId }) => {
    const { rowData, columnData, handleMRVListingPayload } = useMRVListingPayload();

    useEffect(() => {
        if (tranId) {
            handleMRVListingPayload({ queryId, tranId });
        }
    }, [tranId]);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    return (
        <div className='mrv_data'>
            {hasValidRowData(rowData) && (
                <MedFeeMRVList tableColumn={columnData} tableData={rowData} heading={heading} />
            )}
        </div>
    );
};

export default MedFeeMRV;
