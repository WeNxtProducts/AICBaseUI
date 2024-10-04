import React, { useEffect, useState } from 'react'
import { CustomDatePicker, CustomInput, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields'
import { tableColumn } from '../../../components/tableComponents/sampleData'
import CreatableSelect from 'react-select/creatable';

const ReportFields = ({ currentData, values, setFieldValue, parent }) => {
    const { param_DataType, param_Field_Name, param_RepColunmName,
        param_Field_Required } = currentData

    // useEffect(() => {
    //     console.log("useEffect : ", values[parent]?.param_Field_Value)
    // }, [])

    const [options, setOptions] = useState([
        { label: 'Account Type', value: 'accountType' },
        { label: 'Bank Account', value: 'bankAccount' },
        { label: 'Main Account', value: 'mainAccount' }
    ]);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #cecece',
            boxShadow: state.isFocused ? '0 0 5px rgba(3, 130, 200, 0.7)' : 'none',
            padding: '0 4px',       // Adjust outer padding
            minHeight: '32px',      // Minimum height for the select input
            height: '32px',         // Set a fixed height
            '&:hover': {
                border: '1px solid #2c99d6',
            },
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 0',       // Set inner padding to zero
            margin: '0',          // Remove margins to pull text closer
            display: 'flex',
            alignItems: 'center', // Center items vertically in the value container
        }),
        input: (provided) => ({
            ...provided,
            margin: '0',          // Remove input margins
            padding: '0',         // Remove extra padding from the input
            lineHeight: 'normal', // Adjust line-height to help with centering
            fontSize: '12px',     // Reduce font size here
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#999',
            lineHeight: '30px', // Match line-height to the control height
            fontSize: '14px',    // Reduce font size here
            marginTop: '-6px'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#333',
            lineHeight: '30px', // Match line-height to the control height
            fontSize: '14px',    // Reduce font size here
            marginTop: '-6px'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#cce4f6' : 'white',
            color: state.isSelected ? 'white' : '#333',
            '&:hover': {
                backgroundColor: '#cce4f6',
            },
            lineHeight: '20px', // Match line-height to the option height
            fontSize: '12px',    // Reduce font size here
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


    return (
        <div className='current-field p-1 flex items-baseline'>
            <div className='w-2/6'>
                <p className={`label-font select-none`}>
                    {param_Field_Name}
                    {param_Field_Required && <span className='mandatory-symbol'>*</span>}
                </p>
            </div>
            <div className='input-container fields-error w-4/6 pl-3'>
                {(() => {
                    switch (param_DataType) {
                        case 'TEXT':
                            return (
                                <CustomInput
                                    name={param_RepColunmName}
                                    value={values[parent]?.param_Field_Value}
                                    size='medium'
                                    onChange={e => {
                                        setFieldValue(`${parent}.param_Field_Value`, e.target.value);
                                    }}
                                />
                            )

                        case 'LOV':
                            return (
                                <CreatableSelect
                                    styles={customStyles}
                                    options={options}
                                    onChange={e => {
                                        setFieldValue(`${parent}.param_Field_Value`, e?.value)
                                    }}
                                    placeholder="Select"
                                />
                                // <CustomSelect
                                //     options={tableColumn}
                                //     name={param_RepColunmName}
                                //     placeholder='select'
                                //     size='medium'
                                //     showSearch={true}
                                //     value={values[parent]?.param_Field_Value || undefined}
                                //     onChange={e => {
                                //         setFieldValue(`${parent}.param_Field_Value`, e);
                                //     }}
                                // />
                            )

                        case 'DATE':
                            return (
                                <CustomDatePicker
                                    name={param_RepColunmName}
                                    placeholder='date'
                                    size='medium'
                                    value={values[parent]?.param_Field_Value}
                                    onChange={date => {
                                        setFieldValue(`${parent}.param_Field_Value`, date);
                                    }}
                                />
                            )
                    }
                })()}
            </div>
        </div>
    )
}

export default ReportFields
