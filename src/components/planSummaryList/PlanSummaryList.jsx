import React, { useState } from 'react';
import sampImg from '../../assets/planStamp.png';
import { Button, Tooltip } from 'antd';
import { CheckCircleFilled, DownloadOutlined } from '@ant-design/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { coverListGL } from '../../pages/groupLifeQuote/GroupLifeQuoteConstants';
import './PlanSummaryList.scss';
import PlanDetailsDialog from './PlanDetailsDialog';

const PlanSummaryList = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const handleClose = () => {
        setOpenDetailsDialog(false);
    }

    return (
        <div className="plan_summary_list">
            <div className='summary_container'>
                <div className='summary_header'>
                    <div>
                        <p>GOLD</p>
                        <p>Plan A</p>
                    </div>
                    <img src={sampImg} alt="" />
                </div>
                <div className='details_box'>
                    <div className='details_btn'>
                        <Button onClick={() => setOpenDetailsDialog(true)} htmlType='button'>Details</Button>
                        <Button htmlType='button'>Breakup</Button>
                    </div>
                    <div className='list_of_covers'>
                        <div className='list_of_covers_header'>
                            <p className='covers_head'>List of Covers</p>
                            <Tooltip title='Download'>
                                <DownloadOutlined className='download_icons' />
                            </Tooltip>
                        </div>
                        <div className='covers_swiper_container'>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={10}
                                navigation={{
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev',
                                }}
                                modules={[Navigation]}
                                className="covers-swiper"
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                        spaceBetween: 10,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 15,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                    },
                                }}
                            >
                                {coverListGL.map((cover, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='cover_item'>
                                            <CheckCircleFilled className="icon" />
                                            <span>{cover.label}</span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                        </div>

                        <div className='total_details'>
                            <div className='total_details_item'>
                                <p className='total_details_item_label'>Total Employees</p>
                                <p className='total_details_item_value'>25</p>
                            </div>
                            <div className='total_details_item'>
                                <p className='total_details_item_label'>Sum Assured</p>
                                <p className='total_details_item_value'>$10,00,000</p>
                            </div>
                            <div className='total_details_item'>
                                <p className='total_details_item_label'>Premium</p>
                                <p className='total_details_item_value'>$10,00,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openDetailsDialog &&
                <PlanDetailsDialog
                    open={openDetailsDialog}
                    handleClose={handleClose}
                />}
        </div>
    );
};

export default PlanSummaryList;