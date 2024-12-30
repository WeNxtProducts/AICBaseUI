import React, { useEffect } from 'react';
import useMRVListingPayload from '../../../../../../components/mrvListing/useMRVListingPayload';
import MRVPanList from './MRVPanList';

const PlanMRV = ({ queryId, heading, tranId }) => {
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
                <MRVPanList tableColumn={columnData} tableData={rowData} heading={heading} />
            )}
        </div>
    );
};

export default PlanMRV;
