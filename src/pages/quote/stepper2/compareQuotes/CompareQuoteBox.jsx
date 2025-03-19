import React from 'react'
import { quoteCols, quoteRows } from '../../QuoteConstant'

const CompareQuoteBox = () => {
    return (
        <div className='quote-layout'>
            <div className='comp_item'>
                <ul>
                    <li>Quote Details</li>
                    {quoteCols.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </div>
            <div className='comp_item'>
                <ul>
                    <li>Quote 1:</li>
                    {quoteRows.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </div>
            <div className='comp_item'>
                <ul>
                    <li>Quote 2:</li>
                    {quoteRows.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </div>
            <div className='comp_item'>
                <ul>
                    <li>Quote 3:</li>
                    {quoteRows.map((item) => (
                        <li key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CompareQuoteBox
