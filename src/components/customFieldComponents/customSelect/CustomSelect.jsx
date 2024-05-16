import { useEffect } from 'react';
import { Select, Tooltip } from 'antd';
import './CustomSelect.scss';

const CustomSelect = ({
 options,
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
}) => {
 const fieldSize = {
  small: { code: '1/3', desc: '2/3', main: '2/5' },
  medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
  large: { code: '1/4', desc: '3/4', main: 'full' },
 };

 useEffect(() => {
  if (firstFieldRef?.current) {
   firstFieldRef.current.focus();
  }
 }, []);

 const sharedProps = {
  mode: mode,
  // variant: "borderless",
  showSearch,
  allowClear: true,
  maxTagCount: 'responsive',
  filterOption: (input, option) => {
   console.log('option : ', option);
   option?.children?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0;
  },
  className: 'customer-select-fields',
  disabled,
 };

 const renderMaxTagPlaceholder = omittedValues => (
  <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
   <span>{`+${omittedValues?.length}`}</span>
  </Tooltip>
 );

 return (
  <div className={`w-${fieldSize[size].main}`}>
   <Select
    ref={firstFieldRef}
    name={name}
    placeholder={placeholder}
    onSearch={onSearch}
    loading={loading}
    value={value}
    onChange={onChange}
    notFoundContent={<span>{loading ? 'Loading...' : 'No data found'}</span>}
    maxTagPlaceholder={renderMaxTagPlaceholder}
    {...sharedProps}>
    {options?.map(item => (
     <Select.Option key={item.value} value={item.value}>
      {`${item?.value}${
       item?.value !== item?.label ? ` - ${item?.label}` : ''
      }`}
     </Select.Option>
    ))}
   </Select>
  </div>
 );
};

export default CustomSelect;
