import React from 'react';
import weNxtLogo from '../../assets/WeNxt_Logo-removebg.png';
import './QuoteHeader.scss';

const QuoteHeader = ({ id, name }) => {
    return (
        <div className='quote_header'>
            <div className='img_head'>
                <img className='logo_img p-1' alt='logo' src={weNxtLogo} />
                {id &&
                    <div className='mr-10 detail_content'>
                        <p>Quotation Number : <span>{id}</span></p>
                        <p>Name : <span>{name}</span></p>
                    </div>
                }
            </div>

            <div className='sub_header' />
        </div>
    );
};

export default QuoteHeader;
