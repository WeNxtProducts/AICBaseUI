import React, { createContext, useEffect } from 'react'
import SurrMatHeader from './surrMatHeader/SurrMatHeader';
import { useSelector } from 'react-redux';
import SurrMatTabs from './surrMatTabs/SurrMatTabs';
import './SurrenderMaturity.scss';
import { useNavigate } from 'react-router-dom';
import PolTagDisplay from '../../components/polTagDisplay/PolTagDisplay';

export const SurrMatContext = createContext();

const SurrenderMaturity = () => {
    const navigate = useNavigate();
    const EndoDetail = useSelector(state => state?.Endo);
    const { POL_NO, tranId, CUST_CODE } = EndoDetail
    const surrId = useSelector(state => state?.SurrId);
    const { tranId: surrID, surrRefNo } = surrId

    const data = { POL_NO, tranId, CUST_CODE, surrRefNo, surrID };

    useEffect(() => {
        console.log("surrId : ", surrRefNo)
    }, [])

    const handleBack = () => {
        navigate('/endorsement')
    }

    return (
        <SurrMatContext.Provider value={data}>
            <div className='surrender_maturity'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <p className='top_style'>Surrender/Maturity</p>
                        <PolTagDisplay label={POL_NO} />
                    </div>
                    <button onClick={() => handleBack()} className="arrow-back-btn">
                        Back to history
                    </button>
                </div>
                <div className='surr_header'>
                    {/* <SurrMatHeader /> */}
                </div>
                <SurrMatTabs />
            </div>
        </SurrMatContext.Provider>
    )
}

export default SurrenderMaturity
