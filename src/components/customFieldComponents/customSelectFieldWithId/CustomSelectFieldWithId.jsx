import { useEffect, useState } from "react";
import { Select, Space } from "antd";
import "../customSelect/CustomSelect.scss";

export const CustomSelectFieldWithId = ({
  options,
  loading,
  placeholder,
  value,
  onSearch,
  onChange,
  mode = "single",
  disabled = false,
}) => {
  const [optionList, setOptionList] = useState([]);
  const [currentValue, setCurrentValue] = useState();

  const CustomOptionList = ({ record }) => {
    return (
      <div
        onClick={() => handleSelected(record)}
        className="custom-list-for-id flex"
      >
        <div className="w-1/2">{record?.value}</div>
        <div className="w-1/2">{record?.label}</div>
      </div>
    );
  };

  useEffect(() => {
    const reformedOptionList = options.map((item) => ({
      main: item,
      value: item?.value,
      label: item?.label,
      code: <CustomOptionList record={item} />,
    }));
    setOptionList(reformedOptionList);
  }, [options]);

  const sharedProps = {
    mode: mode,
    variant: "borderless",
    showSearch: true,
    allowClear: true,
    className: "customer-select-fields",
    disabled,
  };

  const customFilterOption = (input, option) => {
    return option?.value
      ?.toString()
      .toLowerCase()
      .includes(input.toLowerCase());
  };

  const handleSelected = (mainValue) => {
    setCurrentValue(mainValue?.value);
    console.log("handleSelected : ", mainValue?.value);
  };

  return (
    <div>
      {/* <p>{currentValue}</p> */}
      <Select
        placeholder={placeholder}
        onSearch={onSearch}
        loading={loading}
        value={value}
        onChange={onChange}
        filterOption={customFilterOption}
        notFoundContent={
          <span>{loading ? "Loading..." : "No data found"}</span>
        }
        optionLabelProp="label"
        {...sharedProps}
      >
        {optionList?.map((item) => (
          <Select.Option key={item.value} value={item.value} label={item.label}>
            <Space>{item.code}</Space>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelectFieldWithId;
