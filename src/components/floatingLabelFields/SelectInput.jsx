import React from 'react';
import { Select } from 'antd';
import FloatLabel from './FloatLabel';

const { Option } = Select;

const SelectInput = ({ options = [], value = '', onChange, label = '', placeholder }) => {
    return (
        <FloatLabel label={label} value={value}>
            <Select className='float-control' value={value} allowClear onChange={onChange}>
                <Option value='option1'>Option 1</Option>
                <Option value='option2'>Option 2 Option 2</Option>
            </Select>
        </FloatLabel>
    );
};

export default SelectInput;
