import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReportForm from './reportForm/ReportForm';
import { reportValues, transformAndSortFields } from './../../components/commonHelper/DataSend';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import './Report.scss';

const Report = () => {
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const reportBuilderFormList = useApiRequests('reportBuilderFormList', 'GET');
    const getReportList = useApiRequests('getReportList', 'POST');
    const [fieldList, setFieldList] = useState(null)

    const handleReportBuilderFormList = async values => {
        try {
            const response = await reportBuilderFormList(
                '', {}, { id: currentMenuId?.listingQueryId }
            );
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setFieldList(transformAndSortFields(response?.data))
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        handleReportBuilderFormList()
    }, [])

    const handleGetReportList = async values => {
        try {
            const response = await getReportList(
                { REP_GL_ID: currentMenuId?.listingQueryId, ...values }
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