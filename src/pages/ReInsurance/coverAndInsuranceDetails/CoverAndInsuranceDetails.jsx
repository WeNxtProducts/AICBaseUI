import React, { useContext, useEffect, useState } from 'react'
import CoverCodeSidbar from './coverCodeSidbar/CoverCodeSidbar'
import CoverCodeInsuranceDetais from './coverCodeInsuranceDetais/CoverCodeInsuranceDetais'
import showNotification from '../../../components/notification/Notification';
import { ReInsuranceContext } from '../ReInsurance';
import useApiRequests from '../../../services/useApiRequests';
import EmptyMessage from '../../../components/emptyMessage/EmptyMessage';

const CoverAndInsuranceDetails = () => {
    const { seldAssrCode, setSelectedCover } = useContext(ReInsuranceContext);
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [CoverCodeList, setCoverCodeList] = useState([])

    const getCoverCodeList = async () => {
        const payload = { queryParams: { tranId: seldAssrCode } }
        try {
            const response = await getMapQuery(payload, { queryId: 241 });
            if (response?.status === 'SUCCESS') {
                setCoverCodeList(response?.Data)
                if (response?.Data?.length > 0) {
                    setSelectedCover(response?.Data[0]?.RED_COVER_CODE)
                }
                console.log("response : ", response)
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            showNotification.ERROR('Error Fetching Cover Code');
        }
    };

    useEffect(() => {
        if (seldAssrCode)
            getCoverCodeList()
    }, [seldAssrCode])

    return (
        <div className='cover_insurance_details'>
            <div className='grid grid-cols-12 gap-x-1'>
                {CoverCodeList?.length > 0 ? (
                    <>
                        <div className='col-span-2'>
                            <CoverCodeSidbar CoverCodeList={CoverCodeList} />
                        </div>
                        <div className='col-span-10'>
                            <CoverCodeInsuranceDetais />
                        </div>
                    </>
                ) : (
                    <div className='col-span-12'>
                        <EmptyMessage
                            message="No Cover Available"
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CoverAndInsuranceDetails
