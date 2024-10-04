import React, { useEffect } from 'react'

const ReportFields = ({ currentData, index, values, setFieldValue }) => {
    const { param_DataType, param_Field_Name, param_RepColunmName } = currentData

    useEffect(() => {
        console.log("ReportFields : ", param_RepColunmName)
    }, [index])

    return (
        <div>
            <p>ReportFields</p>
        </div>
    )
}

export default ReportFields
