import React from 'react'
import InsuranceTable from '../insuranceTable/InsuranceTable'

const InsuranceHeader = () => {
    return (
        <div className='in_header'>
            <div className='title flex items-center justify-between'>
                <p>Policy No <span>P/2981/0192/090/090</span></p>
                <button>FAC</button>
            </div>
            <hr className='head_divider' />
            <div className='in_header_table mt-5'>
                <InsuranceTable />
            </div>
        </div>
    )
}

export default InsuranceHeader
