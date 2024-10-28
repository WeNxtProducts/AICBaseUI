import React, { createContext, useState } from 'react'
import InsuranceHeader from './insuranceHeader/InsuranceHeader';
import CoverAndInsuranceDetails from './coverAndInsuranceDetails/CoverAndInsuranceDetails';
import { useSelector } from 'react-redux';
import './ReInsurance.scss';
import EmptyMessage from '../../components/emptyMessage/EmptyMessage';

export const ReInsuranceContext = createContext();

const ReInsurance = () => {
    const insuranceIDs = useSelector(state => state?.reInsurance);
    const { tranId, rePol } = insuranceIDs
    const [seldAssrCode, setSeldAssrCode] = useState('')
    const [selectedCover, setSelectedCover] = useState('')

    const data = {
        tranId, rePol, seldAssrCode, setSeldAssrCode,
        selectedCover, setSelectedCover
    }

    return (
        <ReInsuranceContext.Provider value={data}>
            <div className='re_insrance'>
                <InsuranceHeader />
                {seldAssrCode ? (
                    <CoverAndInsuranceDetails />
                ) : (
                    <EmptyMessage
                        message="No Assured Details Found"
                        subMessage={`For Policy : ${rePol}`}
                    />
                )}
            </div>
        </ReInsuranceContext.Provider>
    )
}

export default ReInsurance
