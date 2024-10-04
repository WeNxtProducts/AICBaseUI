/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react'
import { Form, Formik } from 'formik';
import ReportFields from './ReportFields';

const ReportForm = ({ fieldList, onSubmit }) => {
    const [initValues, setInitValues] = useState(null);

    useEffect(() => {
        setInitValues(fieldList);
    }, [fieldList]);

    return (
        <div className='report_form'>

            <Formik
                initialValues={initValues}
                values={initValues}
                onSubmit={onSubmit}
                enableReinitialize={true}>
                {({ handleSubmit, values, setFieldValue }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className={`items-start grid grid-cols-${2} gap-0`}>
                                {fieldList?.map((item, index) => {
                                    const dataId = item?.param_RepColunmName
                                    return useMemo(() => {
                                        return (
                                            <React.Fragment key={dataId}>
                                                <div data-id={dataId}>
                                                    <ReportFields
                                                        currentData={item}
                                                        index={index}
                                                        values={values}
                                                        setFieldValue={setFieldValue}
                                                    />
                                                </div>
                                            </React.Fragment>
                                        );
                                    }, []);
                                })}
                            </div>
                            <button type='submit'>Submit</button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ReportForm
