import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

const AlterCard = ({ rowData, progressId = 2, selectedRow = '' }) => {
    return (
        <div className='endorsement_cards alteration_cards'>
            <div className='e_card grid grid-cols-12 gap-3'>
                {rowData?.map((item, index) => (
                    <div key={item?.alterNo} className={`alter_card col-span-4 pb-4 
                        ${progressId === item?.alterNo ? 'progress_card' :
                            selectedRow === item?.alterNo ? 'highlight_alteration_cards' : ''}`}
                    >
                        <div className='header flex justify-between items-center'>
                            <p className='title_style'>Alteration -&nbsp;
                                {String(index + 1).padStart(2, '0')}</p>
                            <div className='flex gap-1'>
                                {progressId !== item?.alterNo ?
                                    <Tooltip title='View'>
                                        <EyeOutlined className='mrv_icons' />
                                    </Tooltip>
                                    : (
                                        <>
                                            <Tooltip title='Edit'>
                                                <EditOutlined className='mrv_icons' />
                                            </Tooltip>
                                            <Tooltip title='Delete'>
                                                <DeleteOutlined className='mrv_icons delete_mrv_row' />
                                            </Tooltip>
                                        </>
                                    )}

                            </div>
                        </div>
                        <div className='e_content mt-2'>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Alteration No</p>
                                <p className='col-span-3 content_value'>{item?.alterNo}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>End code-desc</p>
                                <p className='col-span-3 content_value'>{item?.endCodeDesc}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Alteration Date</p>
                                <p className='col-span-3 content_value'>{item?.alterDate}</p>
                            </div>
                        </div>

                        <div className='e_card_footer mt-4'>
                            <div className='status_item'>
                                <p className='content_label'>Status</p>
                                <p className='content_value'>Success</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Alter Fm Dt</p>
                                <p className='content_value'>{item?.fm_date}</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Alter To Dt</p>
                                <p className='content_value'>{item?.to_date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default AlterCard;
