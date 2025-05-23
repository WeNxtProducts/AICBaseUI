import React from 'react';
import { Button } from 'antd';
import sampImg from '../../../assets/term-insurance.png';
import brochure1 from '../../../assets/brochure1.png';
import brochure from '../../../assets/brochure.png';
import './ProductCard.scss';
import { YoutubeOutlined } from '@ant-design/icons';

const ProductCard = ({ value, onSelect }) => {
    const { PROD_CODE, PROD_DESC } = value;

    const actionIcons = overlay => (
        <div className='grid grid-cols-3 mt-2'>
            <div className='col-span-1 flex flex-col items-center'>
                {overlay ? <YoutubeOutlined /> : <YoutubeOutlined />}
                <p className='ac-text'>Video</p>
            </div>
            <div className='col-span-1 flex flex-col items-center'>
                <img src={overlay ? brochure1 : brochure} className='ac-img' />
                <p className='ac-text'>Brochure</p>
            </div>
            <div className='col-span-1 flex flex-col items-center'>
                <img src={overlay ? brochure1 : brochure} className='ac-img' />
                <p className='ac-text'>Presentation</p>
            </div>
        </div>
    );

    return (
        <div className='prod_card_listing_select'>
            <div className='card-content'>
                <div className='img-container'>
                    <img src={sampImg} className='img-card' />
                </div>
                <div className='action_content'>
                    <p className='card-title'>{PROD_CODE}</p>
                    <div className='mt-2 flex justify-center'>
                        <Button className='get-quote-btn'>Get Quote</Button>
                    </div>
                </div>
            </div>
            <div className='card-overlay'>
                <div className='card-overlay-content'>
                    <div className='top-level'>
                        <p className='card-title'>{PROD_CODE}</p>
                        <div className='description mt-1'>
                            <p className='description-style'>{PROD_DESC}</p>
                        </div>
                    </div>
                    <div className='lower-level'>
                        {actionIcons(true)}
                        <div className='mt-2 flex justify-center'>
                            <Button
                                onClick={() => onSelect(value)}
                                className='get-quote-btn'>Get Quote</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
