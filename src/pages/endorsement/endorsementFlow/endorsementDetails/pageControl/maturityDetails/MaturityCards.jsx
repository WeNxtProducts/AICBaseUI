import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';
import dayjs from 'dayjs';

const MaturityCards = ({ rowData, selectedRow, proceedTOSurrenderMaturity }) => {
    return (
        <div className='endorsement_cards loan_cards'>
            <div className='e_card grid grid-cols-12 gap-3'>
                {rowData?.map((item, index) => (
                    <div key={item?.Surr_Mat_Ref_No} className={`alter_card col-span-4 pb-4 
                        ${selectedRow === item?.Surr_Mat_Ref_No ? 'highlight_alteration_cards' : ''}`}>
                        <div className='header flex justify-between items-center'>
                            <p className='title_style'>Surr/Mat -&nbsp;
                                {String(index + 1).padStart(2, '0')}
                            </p>
                            <button onClick={() => proceedTOSurrenderMaturity(item)}
                                className='surr_mat_proceed'>Proceed</button>
                        </div>
                        <div className='e_content mt-2'>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Surr/Mat Ref No</p>
                                <p className='col-span-3 content_value'>{item?.Surr_Mat_Ref_No}</p>
                            </div>
                            <div className='grid grid-cols-5 mt-2'>
                                <p className='col-span-2 content_label'>Amount</p>
                                <p className='col-span-3 content_value'>{formatNumber(item?.Amount)}</p>
                            </div>
                        </div>

                        <div className='e_card_footer mt-4'>
                            <div className='status_item'>
                                <p className='content_label'>Status</p>
                                <p className='content_value'>{item?.Status === 'Y' ? "Success" : "Failed"}</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>Transaction Dt</p>
                                <p className='content_value'>{dayjs(item?.Transaction_Dt).format('YYYY-MM-DD')}</p>
                            </div>
                            <div className='status_item'>
                                <p className='content_label'>User</p>
                                <p className='content_value'>{item?.User}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaturityCards;
