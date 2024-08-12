import React from 'react';
import { Button } from 'antd';
import sampImg from '../../../../../assets/term-insurance.png';
import brochure from '../../../../../assets/brochure.png';
import brochure1 from '../../../../../assets/brochure1.png';
import './ProductCard.scss';

const ProductCard = ({ value, onSelect }) => {
 const { label } = value;
 const msg = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
 classical Latin literature from 45 BC, making it over
 2000 years old. Richard McClintock, a Latin
 professor at Hampden-Sydney College in Virginia,
 looked up one of the more obscure Latin words, 
 consectetur, from a Lorem Ipsum passage. `;

 const actionIcons = overlay => (
  <div className='grid grid-cols-3 mt-2'>
   <div className='col-span-1 flex flex-col items-center'>
    <img src={overlay ? brochure1 : brochure} className='ac-img' />
    <p className='ac-text'>Faq</p>
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
  <div className='card' onClick={() => onSelect(value)}>
   <div className='card-content'>
    <div className='img-container'>
     <img src={sampImg} className='img-card' />
    </div>
    <div className='action_content'>
     <p className='card-title'>{label}</p>
     {actionIcons(false)}
     <div className='mt-2 flex justify-center'>
      <Button className='get-quote-btn'>Get Policy</Button>
     </div>
    </div>
   </div>
   <div className='card-overlay'>
    <div className='card-overlay-content'>
     <div className='top-level'>
      <p className='card-title'>{label}</p>
      <div className='description mt-1'>
       <p className='description-style'>{msg}</p>
      </div>
     </div>
     <div className='lower-level'>
      {actionIcons(true)}
      <div className='mt-2 flex justify-center'>
       <Button className='get-quote-btn'>Get Policy</Button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ProductCard;
