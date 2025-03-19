import React from 'react'
import { CustomSelect } from '../../../../components/commonExportsFields/CommonExportsFields';
import { Button } from 'antd';
import { quoteList } from '../../QuoteConstant';
import CompareQuoteBox from './CompareQuoteBox';

const CompareQuotes = () => {
    return (
        <div className='quote_compare'>
            <p className='head_benefits'>Comparison</p>
            <p className='head_benefits sub-head mb-3'>Choose Upto 3 Quotes to compare quotes</p>
            <div className='quote-Select'>
                <CustomSelect
                    options={quoteList}
                    mode='multiple'
                    name='comp_quotes'
                    placeholder='quote'
                    value={undefined}
                    onChange={e => {
                        console.log(e, 'RH_CURR_CODE');
                    }}
                />
                <Button className='comp_btn'>Compare Quote</Button>
            </div>

            <div className='comp_box'>
                <CompareQuoteBox />
            </div>
        </div>
    )
}

export default CompareQuotes
