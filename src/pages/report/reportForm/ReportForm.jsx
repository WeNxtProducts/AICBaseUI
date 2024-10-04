/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react'
import { Form, Formik } from 'formik';
import ReportFields from './ReportFields';

const ReportForm = ({ fieldList, onSubmit }) => {
    const [initValues, setInitValues] = useState(null);

    useEffect(() => {
        // console.log("fieldList : ", fieldList)
        setInitValues(fieldList);
    }, [fieldList]);

    return (
        <div className='report_form'>
            {initValues !== null &&
                <Formik
                    initialValues={initValues}
                    values={initValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, values, setFieldValue }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className={`items-start grid grid-cols-${2} gap-3 mt-3`}>
                                    {Object.keys(fieldList)?.map((fieldKey, index) => {
                                        const dataId = fieldKey
                                        return useMemo(() => {
                                            return (
                                                <React.Fragment key={dataId}>
                                                    <div data-id={dataId}>
                                                        <ReportFields
                                                            currentData={fieldList?.[fieldKey]}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            parent={fieldKey}
                                                        />
                                                    </div>
                                                </React.Fragment>
                                            );
                                        }, [values[fieldKey]?.param_Field_Value]);
                                    })}
                                </div>
                                <button className='mt-5' type='submit'>Submit</button>
                            </Form>
                        )
                    }}
                </Formik>
            }
        </div>

    )
}

export default ReportForm
