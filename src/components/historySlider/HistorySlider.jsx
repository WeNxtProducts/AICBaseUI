import React, { useState } from 'react';
import successArrow from '../../assets/success_arrow.png';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './HistorySlider.scss';

const HistorySlider = ({ items }) => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const itemsToShow = 4;

 const handleNext = () => {
  if (currentIndex < items.length - itemsToShow) {
   setCurrentIndex(currentIndex - 3);
  }
 };

 const handlePrev = () => {
  if (currentIndex > 0) {
   setCurrentIndex(currentIndex - 1);
  }
 };

 return (
  <div className='slider-container'>
   <LeftOutlined
    className={`arrow ${currentIndex === 0 ? 'left-arrow-dis' : 'left-arrow'}`}
    onClick={handlePrev}
    disabled={currentIndex === 0}
   />
   <div className='slider-wrapper'>
    <div
     className='slider-content'
     style={{
      transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
     }}>
     {items.map((item, index) => (
      <div
       className='slider-item flex items-center justify-around'
       key={item?.id}>
       <div>
        <p className='item_label'>{item?.label}</p>
        <p className='item_date'>{item?.date}</p>
       </div>
       {items?.length - 1 !== index && (
        <div className='decision_arrow'>
         <img src={successArrow} />
        </div>
       )}
      </div>
     ))}
    </div>
   </div>
   <RightOutlined
    className={`arrow ${
     currentIndex >= items.length - itemsToShow
      ? 'right-arrow-dis'
      : 'right-arrow'
    }`}
    onClick={handleNext}
    disabled={currentIndex >= items.length - itemsToShow}
   />
  </div>
 );
};

export default HistorySlider;
