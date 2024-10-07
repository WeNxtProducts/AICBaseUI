import React, { useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        width: '100%',
        borderRadius: '8px',
        border: '1px solid #cecece',
        boxShadow: state.isFocused ? '0 0 5px rgba(3, 130, 200, 0.7)' : 'none',
        padding: '0 4px',
        minHeight: '32px',
        height: '32px',
        '&:hover': {
            border: '1px solid #2c99d6',
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0 0',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0',
        padding: '0',
        lineHeight: 'normal',
        fontSize: '12px',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
        lineHeight: '30px',
        fontSize: '14px',
        marginTop: '-6px'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#333',
        lineHeight: '30px',
        fontSize: '14px',
        marginTop: '-6px'
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#cce4f6' : 'white',
        color: state.isSelected ? 'white' : '#333',
        '&:hover': {
            backgroundColor: '#cce4f6',
        },
        lineHeight: '20px',
        fontSize: '12px',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: '#999',
        '&:hover': {
            color: '#666',
        },
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
    }),
};

const CreatableSelectField = ({
    options = [],
    onChange,
    value,
    size = 'small',
}) => {
    const fieldSize = {
        small: { code: '1/3', desc: '2/3', main: '2/5' },
        medium: { code: '1/4', desc: '3/4', main: '3/5' },
        large: { code: '1/4', desc: '3/4', main: 'full' },
    };

    return (
        <div className={`w-${fieldSize[size].main}`}>
            <CreatableSelect
                styles={customStyles}
                options={options}
                value={options.find(option => option.value === value)}
                onChange={onChange}
                placeholder="Select"
            />
        </div>
    );
};

export default CreatableSelectField;
