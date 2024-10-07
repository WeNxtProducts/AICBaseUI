import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Report.scss';
import ReportForm from './reportForm/ReportForm';
import { reportValues, transformAndSortFields } from './../../components/commonHelper/DataSend';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';

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
    const getReportList = useApiRequests('getReportList', 'POST');
    const [fieldList, setFieldList] = useState(null)

    useEffect(() => {
        setFieldList(transformAndSortFields(respone))
    }, [])

    const handleGetReportList = async values => {
        try {
            const response = await getReportList(
                { REP_GL_ID: 'REP01-1', ...values }
            );
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                console.log('handleGetReportList : ', response);
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    const onSubmit = (values) => {
        const transformedValues = reportValues(values)
        handleGetReportList(transformedValues)
        console.log("onSubmit : ", transformedValues)
    }

    return (
        <div className='report_page'>
            <p className='top_style'>{currentMenuId?.menuOptionDesc}</p>
            {fieldList !== null && <ReportForm fieldList={fieldList} onSubmit={onSubmit} />}
        </div>
    );
};

export default Report;