import React, { createContext, useEffect, useState } from 'react'
import InsuranceHeader from './insuranceHeader/InsuranceHeader';
import CoverAndInsuranceDetails from './coverAndInsuranceDetails/CoverAndInsuranceDetails';
import { useSelector } from 'react-redux';
import EmptyMessage from '../../components/emptyMessage/EmptyMessage';
import './ReInsurance.scss';
import { useDispatch } from 'react-redux';
import { setReInsuranceId, setReInsurancePolNo } from '../../globalStore/slices/ReInsuranceSlices';

export const ReInsuranceContext = createContext();

const ReInsurance = () => {
    const dispatch = useDispatch();
    const insuranceIDs = useSelector(state => state?.reInsurance);
    const { tranId, rePol } = insuranceIDs
    const [seldAssrCode, setSeldAssrCode] = useState('')
    const [selectedCover, setSelectedCover] = useState('')

    const data = {
        tranId, rePol, seldAssrCode, setSeldAssrCode,
        selectedCover, setSelectedCover
    }

    useEffect(() => {
        return () => {
            dispatch(setReInsuranceId(''));
            dispatch(setReInsurancePolNo(''));
        }
    }, [])

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
