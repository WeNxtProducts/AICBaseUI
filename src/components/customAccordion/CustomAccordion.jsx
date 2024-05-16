import React from 'react';
import './CustomAccordion.scss';

const CustomAccordion = ({ title, content, isOpen, toggleAccordion }) => {
 return (
  <div className='accordion'>
   <button
    className={`accordion-header ${isOpen ? 'active' : ''}`}
    onClick={toggleAccordion}>
    <div className='flex items-center justify-between'>
     <div className='acc-title'>{title}</div>
     <div>
      {isOpen ? (
       <i className='bi bi-arrow-down-circle pr-5 icon_style' />
      ) : (
       <i className='bi bi-arrow-up-circle pr-5 icon_style' />
      )}
     </div>
    </div>
   </button>
   <div
    className='accordion-content'
    style={{
     maxHeight: isOpen ? '500px' : '0',
    }}>
    <div className='accordion-content-inner'>{content}</div>
   </div>
  </div>
 );
};

export default CustomAccordion;
