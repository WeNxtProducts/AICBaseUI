import React, { useState } from 'react';
import './UnderWriterWorkBench.scss';
import PersonalDetailsUnderWriter from './personalDetailsUnderWriter/PersonalDetailsUnderWriter';
import HeaderUnderWriter from './headerUnderWriter/HeaderUnderWriter';
import PremiumDetails from './premiumDetails/PremiumDetails';
import OtherPolicies from './otherPolicies/OtherPolicies';
import Coverage from './coverage/Coverage';
import DecisionBox from './decisionBox/DecisionBox';
import { Button } from 'antd';

const CustomSlider = ({ items }) => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const itemsToShow = 4;

 const handleNext = () => {
  if (currentIndex < items.length - itemsToShow) {
   setCurrentIndex(currentIndex + 1);
  }
 };

 const handlePrev = () => {
  if (currentIndex > 0) {
   setCurrentIndex(currentIndex - 1);
  }
 };

 return (
  <div className='slider-container'>
   <button
    className='arrow left-arrow'
    onClick={handlePrev}
    disabled={currentIndex === 0}>
    &lt;
   </button>
   <div className='slider-wrapper'>
    <div
     className='slider-content'
     style={{
      transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
     }}>
     {items.map((item, index) => (
      <div className='slider-item' key={index}>
       {item}
      </div>
     ))}
    </div>
   </div>
   <button
    className='arrow right-arrow'
    onClick={handleNext}
    disabled={currentIndex >= items.length - itemsToShow}>
    &gt;
   </button>
  </div>
 );
};

const UnderWriterWorkBench = ({
 fromQuotation = false,
 fromPremCalc = false,
 setShowUnderWriter,
 onClose,
}) => {
 const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
 ];
 const [currentIndex, setCurrentIndex] = useState(0);

 const itemsToShow = 4; // Number of items to show at once

 const handleNext = () => {
  if (currentIndex < items.length - itemsToShow) {
   setCurrentIndex(currentIndex + 1);
  }
 };

 const handlePrev = () => {
  if (currentIndex > 0) {
   setCurrentIndex(currentIndex - 1);
  }
 };

 return (
  <div className='under-writer-workbench pl-5 pr-5 pt-3 pb-2'>
   {fromQuotation && (
    <div
     onClick={() => setShowUnderWriter(false)}
     className='flex items-center mb-2 back-button-uw-decision'>
     <i className='bi bi-arrow-left-short' />
     <p>Back</p>
    </div>
   )}
   <HeaderUnderWriter />
   <PersonalDetailsUnderWriter />
   <div className='premium_policies mt-4'>
    <PremiumDetails />
    <OtherPolicies />
   </div>
   <Coverage fromPremCalc={fromPremCalc} />
   {!fromPremCalc ? (
    <DecisionBox />
   ) : (
    <div className='close_button'>
     <Button onClick={onClose}>Close</Button>
    </div>
   )}

   <CustomSlider
    items={items.map(item => (
     <div key={item} className='item'>
      {item}
     </div>
    ))}
   />
  </div>
 );
};

export default UnderWriterWorkBench;
