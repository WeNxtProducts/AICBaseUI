import React, { useEffect, useState } from 'react';
import './CustomInput.scss';
import { Input } from 'antd';

const CustomInput = ({
    name,
    placeholder,
    onChange,
    value,
    size = 'small',
    firstFieldRef = null,
    disabled = false,
    onBlur,
    readOnly = false,
}) => {
    const fieldSize = {
        small: { code: '1/3', desc: '2/3', main: '2/5' },
        medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
        large: { code: '1/4', desc: '3/4', main: 'full' },
    };
    const [fieldValue, setFieldValue] = useState()

    useEffect(() => {
        setFieldValue(value)
        if (firstFieldRef?.current) {
            firstFieldRef.current.focus();
        }
    }, [readOnly, value]);

    return (
        <div className={`w-${fieldSize[size].main}`}>
            <Input
                name={name}
                type='text'
                ref={firstFieldRef}
                onBlur={e => onBlur(e)}
                readOnly={readOnly}
                className='custom-form-fields'
                placeholder={placeholder}
                value={fieldValue}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};

export default CustomInput;
