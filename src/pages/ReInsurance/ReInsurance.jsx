import React, { createContext } from 'react'
import InsuranceHeader from './insuranceHeader/InsuranceHeader';
import CoverAndInsuranceDetails from './coverAndInsuranceDetails/CoverAndInsuranceDetails';
import './ReInsurance.scss';

export const ReInsuranceContext = createContext();

const ReInsurance = () => {
    const data = {}

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
