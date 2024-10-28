import React, { useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const CustomDatePicker = ({
  value = '',
  onChange,
  disabledDates,
  placeholder,
  showTimePicker = false,
  size = 'large',
  name,
  disabled = false,
  onBlur,
  readOnly = false,
}) => {
  const dateFormat = 'DD-MM-YYYY';
  const fieldSize = {
    small: { code: '1/3', desc: '2/3', main: '2/5' },
    medium: { code: '1/4', desc: '3/4', main: '3/5' }, // 3/4
    large: { code: '1/4', desc: '3/4', main: 'full' },
  };

  // console.log("value : ", dayjs(value).format('DD-MM-YYYY'))

  const minDate = new Date(disabledDates);

  const disabledDate = current => {
    // Disable dates before the minimum date
    return current && current < minDate.setHours(0, 0, 0, 0);
  };

  const handleChange = (date, dateString) => {
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className={`w-${fieldSize[size].main}`}>
      <DatePicker
        format={dateFormat}
        // variant="borderless"
        name={name}
        disabled={readOnly ? readOnly : disabled}
        placeholder={placeholder}
        inputReadOnly={readOnly}
        // open={!readOnly}
        onBlur={e => {
          if (e.target.nodeName === 'INPUT') {
            const date = e.target.value;
            onBlur(date);
          }
        }}
        className='custom-form-fields'
        value={value ? dayjs(value) : null}
        disabledDate={disabledDate}
        needConfirm={false}
        allowClear={false}
        showTime={
          showTimePicker
            ? {
              showHour: true,
              showMinute: true,
              showSecond: false,
              use12Hours: true,
            }
            : null
        }
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomDatePicker;
