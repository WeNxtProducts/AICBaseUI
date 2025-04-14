import React from 'react';
import sampImg from '../../../assets/term-insurance.png';
import './ProductCard.scss';

const PlanCard = ({ value, onSelect }) => {
    const { LABEL } = value;
    return (
        <div className='plan_card_listing_select' onClick={() => onSelect(value)}>
            <img src={sampImg} alt={'title'} className='plan_card-image' />
            <div className='plan_card-content'>
                <h3 className='plan_card-title'>{LABEL}</h3>
                {/* <p className='plan_card-description'>{'msg'}</p> */}
            </div>
        </div>
    );
};

export default PlanCard;
