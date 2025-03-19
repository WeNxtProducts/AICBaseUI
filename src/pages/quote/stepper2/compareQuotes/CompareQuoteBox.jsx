import React from 'react'
import { quoteCols, quoteRows } from '../../QuoteConstant'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { setStepperIndex } from '../../../../globalStore/slices/QuoteSlice'

const CompareQuoteBox = () => {
    const dispatch = useDispatch();

    return (
        <div className='quote-layout mt-2'>
            <div className='comp_item'>
                <ul>
                    <li>Quote Details</li>
                    {quoteCols.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </div>
            <div className='comp_item'>
                <CloseOutlined className='close_icon' />
                <ul>
                    <li>Quote 1:</li>
                    {quoteRows.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
                <Button className='quote_sel_btn'>Select Quote</Button>
            </div>
            <div className='comp_item'>
                <CloseOutlined className='close_icon' />
                <ul>
                    <li>Quote 2:</li>
                    {quoteRows.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
                <Button className='quote_sel_btn'>Select Quote</Button>
            </div>
            <div className='comp_item'>
                <CloseOutlined className='close_icon' />
                <ul>
                    <li>Quote 3:</li>
                    {quoteRows.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
                <Button
                    onClick={() => {
                        dispatch(setStepperIndex(2));
                    }}
                    className='quote_sel_btn'
                >
                    Select Quote
                </Button>
            </div>
        </div>
    )
}

export default CompareQuoteBox
