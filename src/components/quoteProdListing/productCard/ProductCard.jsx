import React from 'react';
import { Button } from 'antd';
import sampImg from '../../../assets/term-insurance.png';
import brochure1 from '../../../assets/brochure1.png';
import brochure from '../../../assets/brochure.png';
import './ProductCard.scss';

const ProductCard = ({ value, onSelect }) => {
    const { PROD_CODE, PROD_DESC } = value;

    return (
        <div className='card' onClick={() => onSelect(value)}>
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
                        <div className='mt-2 flex justify-center'>
                            <Button className='get-quote-btn'>Get Quote</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
