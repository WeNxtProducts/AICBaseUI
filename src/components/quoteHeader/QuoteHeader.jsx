import React from 'react';
import weNxtLogo from '../../assets/WeNxt_Logo-removebg.png';
import './QuoteHeader.scss';

const QuoteHeader = () => {
    return (
        <div className='quote_header'>
            <div className='img_head'>
                <img className='logo_img p-1' alt='logo' src={weNxtLogo} />
            </div>

            <div className='sub_header' />
        </div>
    );
};

export default QuoteHeader;
