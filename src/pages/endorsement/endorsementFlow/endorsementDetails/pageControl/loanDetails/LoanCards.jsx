import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

const LoanCards = ({ rowData, selectedRow, handleGetLoanDetails }) => {
    return (
        <div className='endorsement_cards loan_cards'>
            <div className='e_card grid grid-cols-12 gap-3'>
                {rowData?.map((item, index) => (
                    <div key={item?.ID} className={`alter_card col-span-4 pb-4 
                        ${selectedRow === item?.ID ? 'highlight_alteration_cards' : ''}`}>
                        <div className='header flex justify-between items-center'>
                            <p className='title_style'>Loan -&nbsp;
                                {String(index + 1).padStart(2, '0')}
                            </p>
                            <p><Tooltip title='View'>
                                <EyeOutlined onClick={() => handleGetLoanDetails(item)} className='mrv_icons' />
                            </Tooltip></p>
                        </div>
                        <div className='e_content mt-2'>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Amount LC</p>
                                <p className='col-span-3 content_value'>{item?.LC_Amount}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>O/S Amount LC</p>
                                <p className='col-span-3 content_value'>{item?.['O/S_Amount_LC']}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Repaid Amount LC</p>
                                <p className='col-span-3 content_value'>{item?.Repaid_Amount_LC}</p>
                            </div>
                        </div>

                        <div className='e_card_footer mt-4'>
                            <div className='status_item'>
                                <p className='content_label'>Status</p>
                                <p className='content_value'>{item?.Status}</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Loan Dt</p>
                                <p className='content_value'>{item?.fm_date || '-'}</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Loan Ref No</p>
                                <p className='content_value'>{item?.to_date || '-'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoanCards;
