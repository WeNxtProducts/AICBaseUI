import React, { useContext, useEffect } from 'react'
import useMRVListingPayload from '../../../../../components/mrvListing/useMRVListingPayload';
import SurrMrvList from '../SurrMrvList';
import { SurrMatContext } from '../../../SurrenderMaturity';

const SurrMRV = ({ editMRVId, setEditMRVId }) => {
    const { POL_NO, tranId } = useContext(SurrMatContext);
    const { rowData, columnData, handleMRVListingPayload } = useMRVListingPayload();

    useEffect(() => {
        handleMRVListingPayload({ queryId: 234, tranId });
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
