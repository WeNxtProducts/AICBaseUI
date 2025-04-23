import React from 'react';
import { Outlet } from 'react-router-dom';
import QuoteHeader from '../../components/quoteHeader/QuoteHeader';
import { useSelector } from 'react-redux';

const PublicLayoutQuote = () => {
    const quotationNo = useSelector(state => state?.quote?.quotationNo);
    const { QUOT_FIRST_NAME: { PFD_FLD_VALUE: Fname } = {},
        QUOT_MIDDLE_NAME: { PFD_FLD_VALUE: Mname } = {},
        QUOT_LAST_NAME: { PFD_FLD_VALUE: Lname } = {} }
        = useSelector(state => state?.quote?.basicInfoForm?.frontForm?.formFields || {});
    const name = `${Fname} ${Mname} ${Lname}`.trim();

    return (
        <div className='public_Quote_layout'>
            <QuoteHeader id={quotationNo} name={name} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default PublicLayoutQuote;
