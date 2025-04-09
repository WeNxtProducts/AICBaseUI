import React, { useRef, useEffect, useState } from 'react';
import './CustomAccordion.scss';

const CustomAccordion = ({ title, isOpen, toggleAccordion, children }) => {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    return (
        <div className={`accordion ${isOpen ? 'open' : ''}`}>
            <button
                className={`accordion-header ${isOpen ? 'active' : ''}`}
                onClick={toggleAccordion}
            >
                <div className='acc-title'>{title}</div>
                <div>
                    <i
                        className={`bi ${isOpen
                                ? 'bi-arrow-down-circle'
                                : 'bi-arrow-up-circle'
                            } pr-5 icon_style`}
                    />
                </div>
            </button>
            <div
                className='accordion-content'
                style={{
                    height: `${height}px`,
                }}
                ref={contentRef}
            >
                <div className='accordion-content-inner'>{children}</div>
            </div>
        </div>
    );
};

export default CustomAccordion;
