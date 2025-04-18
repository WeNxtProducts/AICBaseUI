import React from 'react'
import {
    CustomDatePicker, CustomInput, CustomNumberField,
    CustomSelect, CustomTextArea
} from '../commonExportsFields/CommonExportsFields';

const TableWithFields = ({ colDetails, handleChange, value }) => {
    const { field_type, key, index, label } = colDetails

    return (
        <div>
            {(() => {
                switch (field_type) {
                    case 'text':
                        return (
                            <CustomInput
                                name={`${key}`}
                                size='large'
                                readOnly={false}
                                value={value}
                                onChange={(e) => handleChange(index, `${key}`, e?.target?.value)}
                            />
                        );
                    case 'select':
                        return (
                            <CustomSelect
                                name={`${key}`}
                                size='large'
                                showSearch={false}
                                readOnly={false}
                                options={[]}
                                placeholder='select'
                                value={value || undefined}
                                onChange={(e) => handleChange(index, `${key}`, e)}
                            />
                        );
                    case 'number':
                    case 'amount':
                        return (
                            <CustomNumberField
                                name={`${key}`}
                                placeholder='0'
                                format={field_type}
                                size='large'
                                readOnly={false}
                                value={value}
                                onChange={(e) => handleChange(index, `${key}`, e?.target?.value)}
                            />
                        );
                    case 'date':
                        return (
                            <CustomDatePicker
                                name={`${key}`}
                                placeholder='date'
                                size='large'
                                readOnly={false}
                                value={value}
                                onChange={(date) => handleChange(index, `${key}`, date)}
                            />
                        );
                    case 'textarea':
                        return (
                            <CustomTextArea
                                name={`${key}`}
                                size='large'
                                readOnly={false}
                                value={value}
                                onChange={(e) => handleChange(index, `${key}`, e?.target?.value)}
                            />
                        );
                    default:
                        return null;
                }
            })()}
        </div>
    )
}

export default TableWithFields
