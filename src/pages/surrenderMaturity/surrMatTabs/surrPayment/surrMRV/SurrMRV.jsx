import React, { useEffect } from 'react'
import useMRVListingPayload from '../../../../../components/mrvListing/useMRVListingPayload';
import SurrMrvList from '../SurrMrvList';

const SurrMRV = ({ editMRVId, setEditMRVId }) => {
    const { rowData, columnData, handleMRVListingPayload } = useMRVListingPayload();

    useEffect(() => {
        handleMRVListingPayload({ queryId: 224, tranId: 'PO/TM1//000081' });
    }, []);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    const handleEdit = (item) => {
        console.log("item : ", item)
    }
    return (
        <div>
            {hasValidRowData(rowData) ? (
                <div className=''>
                    <SurrMrvList
                        tableColumn={columnData}
                        tableData={rowData}
                        isSlide={true}
                        handleEdit={handleEdit}
                        selectedRow={editMRVId}
                    />
                </div>
            ) : (
                <p>No Dues</p>
            )}
        </div>
    )
}

export default SurrMRV
