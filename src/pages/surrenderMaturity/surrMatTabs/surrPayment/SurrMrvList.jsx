import React from 'react';
import { Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import '../../../../styles/components/mrvStyleDue.scss';
import '../../../../styles/components/swiper_slide.scss';

const SurrMrvList = ({
    tableColumn = '',
    tableData = [],
    handleEdit,
    selectIndex,
    selectedRow = '',
    action,
    isView = true,
    freeze = false,
    highlightKey = 'ID',
    isSlide = false,
    selectedCard = [],
    headerStatus = {}
}) => {
    const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;

    const checkProcessStatus = item => {
        const processItem = selectedCard?.receiptProcess?.find(
            process => process.formFields.RP_TRAN_ID === item,
        );
        return processItem ? processItem.formFields.RP_PROCESS_YN === 'Y' : false;
    };

    const renderCards = (item, index) => (
        <div
            data-id={item?.[highlightKey]}
            key={item?.[highlightKey]}
            className={selectedRow == item?.[highlightKey] ? 'list_card_highlighted_row' : 'list_card'}>
            <div
                className={`action_header flex item-center justify-${action && !freeze ? 'between' : 'between'
                    }`}>
                <div
                    onClick={() => {
                        if (headerStatus?.RH_APPRV_STATUS !== 'A') {
                            selectIndex(item);
                        }
                    }}
                    className='pl-2 flex items-center'>
                    {/* {isSlide &&
                        <div className='mrv_checkbox'>
                            <input
                                readOnly
                                disabled={item?.Process_YN === 'Y'}
                                checked={checkProcessStatus(item?.ID)}
                                id={index}
                                type='checkbox'
                            />
                            <label />
                        </div>
                    } */}
                    {isSlide && <p className='pl-3 count_style'>Life Assured Detail - {index + 1}</p>}
                </div>

                <div className='flex gap-2 pe-3 p-1'>
                    {isView && (
                        <Tooltip title='View'>
                            <EyeOutlined onClick={() => handleEdit(item)} className='mrv_icons' />
                        </Tooltip>
                    )}
                </div>
            </div>

            {Object.keys(column)?.map(key => (
                <div key={key} className='ml-3 mrv_list items-center grid grid-cols-12 gap-1'>
                    <p className='col-span-6 key_font'>{column[key]}</p>
                    <p className='col-span-6 value_font'>{item[key]}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div className={`MRV_card MRV_card--slide ${isSlide ? '' : 'overflow-y-auto p-2'}`}>
            {isSlide ? (
                <div className='surrender_swiper'>
                    {tableData?.length > 4 &&
                        <>
                            <div className="swiper-button image-swiper-button-next">
                                <IoIosArrowForward />
                            </div>
                            <div className="swiper-button image-swiper-button-prev">
                                <IoIosArrowBack />
                            </div>
                        </>
                    }
                    <Swiper
                        navigation={{
                            nextEl: ".image-swiper-button-next",
                            prevEl: ".image-swiper-button-prev",
                            disabledClass: "swiper-button-disabled"
                        }}
                        modules={[Navigation]}
                        slidesPerView={4}
                        slidesPerGroup={2}
                        className="mySwiper"
                    >
                        {tableData?.map((item, index) =>
                            <SwiperSlide key={index}>
                                {renderCards(item, index)}
                            </SwiperSlide>)}
                    </Swiper>
                </div>
            ) : (
                tableData?.map((item, index) => renderCards(item, index))
            )}
        </div>
    );
};

export default SurrMrvList;
