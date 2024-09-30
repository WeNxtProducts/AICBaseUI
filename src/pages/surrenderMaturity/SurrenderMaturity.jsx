import React, { createContext, useEffect } from 'react'
import SurrMatHeader from './surrMatHeader/SurrMatHeader';
import { useSelector } from 'react-redux';
import SurrMatTabs from './surrMatTabs/SurrMatTabs';
import './SurrenderMaturity.scss';
import { useNavigate } from 'react-router-dom';

export const SurrMatContext = createContext();

const SurrenderMaturity = () => {
    const navigate = useNavigate();
    const EndoDetail = useSelector(state => state?.Endo);
    const { POL_NO, tranId, CUST_CODE } = EndoDetail
    const surrId = useSelector(state => state?.SurrId);

    const data = { POL_NO, tranId, CUST_CODE };

    useEffect(() => {
        console.log("surrId : ", surrId)
    }, [])

    const handleBack = () => {
        navigate('/endorsement')
    }

    return (
        <SurrMatContext.Provider value={data}>
            <div className='surrender_maturity'>
                <div className='flex items-center justify-between mb-1'>
                    <p className='mb-2 top_style'>Surrender/Maturity</p>
                    <button onClick={() => handleBack()} className="arrow-back-btn">
                        Back to history
                    </button>
                </div>
                <div className='surr_header'>
                    <SurrMatHeader />
                </div>
                <SurrMatTabs />
            </div>
        </SurrMatContext.Provider>
    )
}

export default SurrenderMaturity
