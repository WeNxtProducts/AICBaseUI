import React, { createContext } from 'react'
import InsuranceHeader from './insuranceHeader/InsuranceHeader';
import CoverAndInsuranceDetails from './coverAndInsuranceDetails/CoverAndInsuranceDetails';
import { useSelector } from 'react-redux';
import './ReInsurance.scss';

export const ReInsuranceContext = createContext();

const ReInsurance = () => {
    const tranId = useSelector(state => state?.reInsurance?.tranId);

    const data = { tranId }

    return (
        <ReInsuranceContext.Provider value={data}>
            <div className='re_insrance'>
                <InsuranceHeader />
                <CoverAndInsuranceDetails />
            </div>
        </ReInsuranceContext.Provider>
    )
}

export default ReInsurance
