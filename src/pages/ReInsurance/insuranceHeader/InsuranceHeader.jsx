import React, { useContext, useEffect } from 'react'
import InsuranceTable from '../insuranceTable/InsuranceTable'
import { ReInsuranceContext } from '../ReInsurance';
import useMRVListingPayload from '../../../components/mrvListing/useMRVListingPayload';
import { useNavigate } from 'react-router-dom';

const InsuranceHeader = () => {
    const navigate = useNavigate();
    const { tranId, rePol, seldAssrCode, setSeldAssrCode } = useContext(ReInsuranceContext);
    const { rowData = [], columnData, handleMRVListingPayload } = useMRVListingPayload();

    useEffect(() => {
        if (tranId) {
            handleMRVListingPayload({ queryId: 240, tranId: rePol });
        }
    }, [tranId]);

    const hasValidRowData = rowData => {
        return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
    };

    const handleSelectedAssured = (id) => {
        setSeldAssrCode(id)
    }

    useEffect(() => {
        if (hasValidRowData(rowData)) {
            setSeldAssrCode(rowData[0]?.ID)
        }
    }, [rowData])

    return (
        <div className='in_header'>
            <div className='title flex items-center justify-between'>
                <div className='flex items-center'>
                    <i onClick={() => navigate('/reInsuranceList')} className='bi bi-arrow-left-short custom-icon' />
                    <p>Policy No <span>{rePol}</span></p>
                </div>

                <button>FAC</button>
            </div>
            <hr className='head_divider' />
            {hasValidRowData(rowData) &&
                <div className='in_header_table mt-5'>
                    <InsuranceTable columnData={columnData}
                        rowData={rowData} rowSelectable={true}
                        selectedRow={seldAssrCode}
                        handleSelected={handleSelectedAssured} />
                </div>
            }
        </div>
    )
}

export default InsuranceHeader
