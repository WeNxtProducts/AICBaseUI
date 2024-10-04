import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Report.scss';
import ReportForm from './reportForm/ReportForm';

const respone = [
    {
        "param_RepColunmName": "REP_VALUE_5",
        "param_Field_Name": "User Id From",
        "param_DataType": "LOV",
        "param_Field_Required": "TRUE",
        "param_Field_Order": "5"
    },
    {
        "param_RepColunmName": "REP_VALUE_3",
        "param_Field_Name": "Transaction Date From",
        "param_DataType": "DATE",
        "param_Field_Required": "TRUE",
        "param_Field_Order": "3"
    },
    {
        "param_RepColunmName": "REP_VALUE_2",
        "param_Field_Name": "Policy No To",
        "param_DataType": "LOV",
        "param_Field_Required": "TRUE",
        "param_Field_Order": "2"
    },
    {
        "param_RepColunmName": "REP_VALUE_1",
        "param_Field_Name": "Policy No From ",
        "param_DataType": "LOV",
        "param_Field_Required": "TRUE",
        "param_Field_Order": "1"
    },
    {
        "param_RepColunmName": "REP_VALUE_6",
        "param_Field_Name": "User Id To",
        "param_DataType": "TEXT",
        "param_Field_Required": "TRUE",
        "param_Field_Order": "6"
    }
]

const Report = () => {
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const [fieldList, setFieldList] = useState(null)

    const sortAndAddFieldValue = (fields) => {
        return fields
            .map(field => ({ ...field, param_Field_Value: "" }))
            .sort((a, b) => parseInt(a.param_Field_Order) - parseInt(b.param_Field_Order));
    };

    useEffect(() => {
        // setFieldList(sortAndAddFieldValue(respone))
        const fieldObject = respone.reduce((acc, field) => {
            acc[field.param_RepColunmName] = {
                ...field,
                param_Field_Value: ''
            };
            return acc;
        }, {});
        setFieldList(fieldObject)
    }, [])

    const onSubmit = (values) => {
        console.log("onSubmit : ", values)
    }

    return (
        <div className='report_page'>
            <p className='top_style'>{currentMenuId?.menuOptionDesc}</p>

            {fieldList !== null && <ReportForm fieldList={fieldList} onSubmit={onSubmit} />}
        </div>
    );
};

export default Report;