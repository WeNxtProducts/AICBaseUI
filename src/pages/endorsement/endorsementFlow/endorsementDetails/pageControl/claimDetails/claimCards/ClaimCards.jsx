import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

const ClaimCards = ({ rowData, selectedRow = 2, }) => {
    return (
        <div className='endorsement_cards claim_cards'>
            <div className='e_card grid grid-cols-12 gap-3'>
                {rowData?.map((item, index) => (
                    <div key={item?.alterNo} className={`alter_card col-span-4 pb-4 
                        ${selectedRow === item?.alterNo ? 'highlight_alteration_cards' : ''}`}>
                        <div className='header flex justify-between items-center'>
                            <p className='title_style'>Claim -&nbsp;
                                {String(index + 1).padStart(2, '0')}
                            </p>
                            <p><Tooltip title='View'>
                                <EyeOutlined className='mrv_icons' />
                            </Tooltip></p>
                        </div>
                        <div className='e_content mt-2'>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Claim No</p>
                                <p className='col-span-3 content_value'>{item?.alterNo}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Claim Type</p>
                                <p className='col-span-3 content_value'>{item?.endCodeDesc}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Paid Amount LC</p>
                                <p className='col-span-3 content_value'>{item?.alterDate}</p>
                            </div>
                        </div>

                        <div className='e_card_footer mt-4'>
                            <div className='status_item'>
                                <p className='content_label'>Status</p>
                                <p className='content_value'>Success</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Claim Loss Dt</p>
                                <p className='content_value'>{item?.fm_date}</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Claim Inti Dt</p>
                                <p className='content_value'>{item?.to_date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClaimCards;
