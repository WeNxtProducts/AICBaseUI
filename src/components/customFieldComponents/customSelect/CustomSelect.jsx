import { useEffect, useState } from 'react';
import { Select, Tooltip } from 'antd';
import './CustomSelect.scss';

const CustomSelect = ({
    options = [],
    loading,
    placeholder,
    value,
    onSearch,
    onChange,
    mode = 'single',
    disabled = false,
    showSearch = true,
    size = 'large',
    name,
    firstFieldRef = null,
    onBlur,
    readOnly = false,
    searchMsg = 'No data found',
    allowClear = true,
}) => {
    const fieldSize = {
        small: { code: '1/3', desc: '2/3', main: '2/5' },
        medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
        large: { code: '1/4', desc: '3/4', main: 'full' },
    };
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropDownOptions, setDropDownOptions] = useState([])

    useEffect(() => {
        setDropDownOptions(options)
        if (firstFieldRef?.current) {
            firstFieldRef.current.focus();
        }
    }, [options]);

    const handleDropdownVisibleChange = open => {
        if (!readOnly) {
            setDropdownOpen(open);
        } else {
            setDropdownOpen(false);
        }
    };

    const sharedProps = {
        mode: mode,
        showSearch: readOnly ? false : showSearch,
        allowClear: readOnly ? false : allowClear,
        maxTagCount: 'responsive',
        filterOption: (input, option) => {
            return option.children.toLowerCase().includes(input.toLowerCase());
        },
        className: 'customer-select-fields',
        disabled,
    };

    const renderMaxTagPlaceholder = omittedValues => (
        <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
            <span>{`+${omittedValues?.length}`}</span>
        </Tooltip>
    );

    const handleBlur = () => {
        if (onBlur) onBlur(value);
    };

    const handleSearch = (input) => {
        let updatedOptions = dropDownOptions.filter(option => !option.label.startsWith('Use "'));
        const condition = input && !dropDownOptions.some(option => option.value.toLowerCase()
            .startsWith(input.toLowerCase()))

        if (condition) {
            updatedOptions = [
                ...updatedOptions,
                { value: input, label: `"${input}"` }
            ];
        }
        setDropDownOptions(updatedOptions);
    }


    return (
        <div className={`w-${fieldSize[size].main}`}>
            <Select
                ref={firstFieldRef}
                name={name}
                placeholder={placeholder}
                onSearch={onSearch}
                // onSearch={handleSearch}
                onBlur={handleBlur}
                loading={loading}
                value={value}
                onChange={onChange}
                open={dropdownOpen}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                notFoundContent={<span>{loading ? 'Loading...' : searchMsg}</span>}
                maxTagPlaceholder={renderMaxTagPlaceholder}
                {...sharedProps}>
                {dropDownOptions?.map(item => (
                    <Select.Option key={item.value} value={item.value}>
                        {`${item?.value}${item?.value !== item?.label ? ` - ${item?.label}` : ''}`}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default CustomSelect;
