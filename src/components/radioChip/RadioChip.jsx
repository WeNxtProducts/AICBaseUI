import React from 'react';
import './RadioChip.scss';

const RadioChip = ({ items, selectedValue, onSelectionChange, main, tagSize = 110 }) => {
    return (
        <div className='container'>
            <div className='list'>
                {items?.map(item => (
                    <div style={{ minWidth: `${tagSize}px` }}
                        className='form-element' key={item?.value}>
                        <input
                            type='radio'
                            name={`${main}`}
                            value={item.value}
                            id={item.value}
                            checked={selectedValue === item.value}
                            onChange={() => onSelectionChange(item)}
                        />
                        <label htmlFor={item.value}>
                            <div className='title'>{item.label}</div>
                            <div className='checkmark'></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioChip;
