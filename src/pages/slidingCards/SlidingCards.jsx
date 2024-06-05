import React from 'react';
import MouseClickIcon from '../../svg/MouseClick';
import './SlidingCards.scss';

const cards = [
 {
  id: 'c1',
  title: 'TERM',
  description: 'Winter has so much to offer - creative activities',
  img: './img1.jpg',
 },
 {
  id: 'c2',
  title: 'ENDOWMENT',
  description: 'Gets better every day - stay tuned',
  img: './img2.jpg',
 },
 {
  id: 'c3',
  title: 'MORTGAGE',
  description: 'Help people all over the world',
  img: './img3.jpg',
 },
 {
  id: 'c4',
  title: 'MEDICAL',
  description: 'Space engineering becomes more and more advanced',
  img: './img4.jpg',
 },
];

const SlidingCards = () => {
 return (
  <div className='wrapper_sliding_cards'>
   <div className='container'>
    {cards.map((card, index) => (
     <div key={card.id} className='card_wrapper'>
      <input
       type='radio'
       name='slide'
       id={card.id}
       defaultChecked={index === 0}
      />
      <label htmlFor={card.id} className='card'>
       <div className='row'>
        <div></div>
        <div className=''>
         <div className='initial-letter'>{card?.title?.charAt(0)}</div>
         <div className='full-text'>{card?.title}</div>
        </div>
        <div className='icon'>
         <MouseClickIcon className='mouseSvg' />
        </div>
       </div>
      </label>
     </div>
    ))}
   </div>
  </div>
 );
};

export default SlidingCards;
