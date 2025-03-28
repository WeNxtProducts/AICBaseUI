/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import QuoteFieldWithValue from './QuoteFieldWithValue';
import { createYupSchema } from '../../../components/commonHelper/SchemaGenerator'

const QuoteForm = ({
    initialValues,
    formRender,
    root,
    onSubmit,
    handleChangeValue,
    grid = '3',
    addOrUpdate = false,
    lovList,
    handleOnBlur,
    handleOnSearch,
    freeze = false,
    navigateBtn = true,
    btnText = {
        btn1: 'Save',
        btn2: 'Cancel'
    },
    handlePrevious,
    validationSchema
}) => {
    const [initValues, setInitValues] = useState(null);
    const [validation, setValidation] = useState(null);

    useEffect(() => {
        if (validationSchema) {
            setValidation(validationSchema);
        }
        else {
            const validationSchema = createYupSchema({
                [root]: formRender[root],
            });
            setValidation(validationSchema);
        }
        setInitValues(initialValues);
    }, [formRender, initialValues, root, validationSchema]);

    const onHandleOnBlur = (currentData, valuesLatest, setFieldValue, val, label = '') => {
        if (handleOnBlur) {
            handleOnBlur(currentData, valuesLatest, setFieldValue, val, label);
        }
    };

    return (
        <>
            {initValues !== null && (
                <Formik
                    initialValues={initValues}
                    values={initValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, values, errors, setFieldValue, resetForm }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className={`items-start grid grid-cols-${grid} gap-x-5 gap-y-2`}>
                                    {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
                                        const dataId = formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
                                        console.log("dataId : ", dataId)
                                        return useMemo(() => {
                                            return (
                                                <React.Fragment key={dataId}>
                                                    {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
                                                        <div data-id={dataId}>
                                                            <QuoteFieldWithValue
                                                                currentData={formRender?.[root]?.formFields[fieldKey]}
                                                                values={values}
                                                                setFieldValue={setFieldValue}
                                                                lovData={lovList?.[dataId]}
                                                                handleOnBlur={onHandleOnBlur}
                                                                handleOnSearch={handleOnSearch}
                                                                handleChangeValue={handleChangeValue}
                                                                parent={root}
                                                                freeze={freeze}
                                                            />
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                            // values?.[root]?.formFields[fieldKey],
                                            //[values?.[root]?.formFields, lovList?.[dataId], formRender, freeze]
                                        }, [values]);
                                    })}
                                </div>
                                {!freeze && (
                                    <div className='save_btn_grid'>

                                        <button type='submit'>
                                            {addOrUpdate ? btnText?.btn1 : btnText?.btn1}
                                        </button>
                                        {navigateBtn && (
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    // resetForm();
                                                    handlePrevious()
                                                }}
                                                className='reset'>
                                                {btnText?.btn2}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </Form>
                        );
                    }}
                </Formik>
            )}
        </>
    );
};

export default QuoteForm;