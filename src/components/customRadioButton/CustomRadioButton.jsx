import React from 'react';
import './CustomRadioButton.scss';

const CustomRadioButton = ({ 
  options, 
  selectedValue, 
  onChange, 
  name, 
  className = ''
}) => {
  return (
    <div className={`custom-radio-group ${className}`}>
      {options.map((option) => (
        <label 
          key={option.value} 
          className={`custom-radio-button ${selectedValue === option.value ? 'selected' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="custom-radio-input"
          />
          <div className="radio-button-content">
            <span className="custom-radio-icon">
              {selectedValue === option.value && <span className="check-icon">✓</span>}
            </span>
            <span className="custom-radio-label">{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
};

export default CustomRadioButton;