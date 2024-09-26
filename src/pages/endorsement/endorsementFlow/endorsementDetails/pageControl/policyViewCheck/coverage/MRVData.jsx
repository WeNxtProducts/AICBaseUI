import React, { useContext, useEffect, useState } from 'react';
import MRVCoverage from './MRVCoverage';
import useMRVListing from '../../../../../../../components/mrvListing/useMRVListing';
import useMRVListingPayload from '../../../../../../../components/mrvListing/useMRVListingPayload';

const MRVData = ({ queryId, heading, tranId }) => {
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
                <MRVCoverage tableColumn={columnData} tableData={rowData} heading={heading} tranId={tranId} />
            )}
        </div>
    );
};

export default MRVData;
