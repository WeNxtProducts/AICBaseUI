import React from 'react'
import { CustomDatePicker, CustomInput } from '../../../components/commonExportsFields/CommonExportsFields'
import CreatableSelectField from '../../../components/customFieldComponents/creatableSelect/creatableSelectField';

const ReportFields = ({ currentData, values, setFieldValue, parent }) => {
        const { param_DataType, param_Field_Name, param_RepColunmName,
        param_Field_Required } = currentData


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
                                <CreatableSelectField
                                    options={[]}
                                    size='large'
                                    value={values[parent]?.param_Field_Value}
                                    onChange={e => {
                                        setFieldValue(`${parent}.param_Field_Value`, e?.value)
                                    }}
                                    placeholder="Select"
                                />
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
