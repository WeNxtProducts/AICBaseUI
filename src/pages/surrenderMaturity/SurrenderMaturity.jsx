import React, { createContext } from 'react'
import SurrMatHeader from './surrMatHeader/SurrMatHeader';
import { useSelector } from 'react-redux';
import './SurrenderMaturity.scss';
import SurrMatTabs from './surrMatTabs/SurrMatTabs';

export const SurrMatContext = createContext();

const SurrenderMaturity = () => {
    const EndoDetail = useSelector(state => state?.Endo);
    const { POL_NO, tranId, CUST_CODE } = EndoDetail

    const data = { POL_NO, tranId, CUST_CODE };

    return (
        <SurrMatContext.Provider value={data}>
            <div className='surrender_maturity'>
                <div className='surr_header'>
                    <p className='mb-2 top_style'>Surrender/Maturity</p>
                    <SurrMatHeader />
                </div>
                <SurrMatTabs />
            </div>
        </SurrMatContext.Provider>
    )
}

export default SurrenderMaturity
