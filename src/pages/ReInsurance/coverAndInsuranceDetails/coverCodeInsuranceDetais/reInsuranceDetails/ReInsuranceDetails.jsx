import React, { useContext, useEffect } from 'react'
import InsuranceTable from '../../../insuranceTable/InsuranceTable'
import { ReInsuranceContext } from '../../../ReInsurance';
import useMRVListingPayload from '../../../../../components/mrvListing/useMRVListingPayload';

const ReInsuranceDetails = () => {
    const { seldAssrCode, selectedCover } = useContext(ReInsuranceContext);
    const { rowData = [], columnData, handleMRVListingPayload } = useMRVListingPayload();

    useEffect(() => {
        if (selectedCover) {
            handleMRVListingPayload({ queryId: 242, tranId: seldAssrCode, emptranId: selectedCover });
        }
    }, [selectedCover]);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    return (
        <div className='reinsurance_details'>
            <p>Re-Insurance Allocation</p>
            {hasValidRowData(rowData) &&
                <div className='mt-3'>
                    <InsuranceTable columnData={columnData}
                        rowData={rowData} rowSelectable={false}
                    />
                </div>
            }
        </div>
    )
}

export default ReInsuranceDetails
