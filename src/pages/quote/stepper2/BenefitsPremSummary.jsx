import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { Button } from 'antd'
import { setComQuote } from '../../../globalStore/slices/QuoteSlice';

export const BenefitsPremSummary = () => {
    const dispatch = useDispatch();

    return (
        <div className='benefits_prem_summary mt-3'>
            <p className='head_benefits'>Premium Summary</p>
            <div className='summary_box'>
                <div className='flex justify-between'>
                    <p className='sum_name'>Sum Assured</p>
                    <p className='sum_val'>AED 1,000,000</p>
                </div>
                <div className='flex justify-between mt-3'>
                    <p className='sum_name'>Total monthly premium</p>
                    <p className='sum_val'>AED 10,000</p>
                </div>
            </div>

            <div className='btn-grp'>
                <Button className='oth_btn'>Modify Quote</Button>
                <Button className='oth_btn'>View Illustration</Button>
                <Button
                    onClick={() => {
                        dispatch(setComQuote(true))
                    }}
                    className='oth_btn'>Compare Quote</Button>
                <Button className='acc_btn'>Accept</Button>
            </div>
        </div>
    )
}
