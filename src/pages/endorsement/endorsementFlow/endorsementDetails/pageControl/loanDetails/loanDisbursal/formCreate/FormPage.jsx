/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'antd';
import { createYupSchema } from '../../../../../../../../components/commonHelper/SchemaGenerator';
import FormFieldsRender from './FormFieldsRender';

const FormPage = ({
    initialValues,
    formRender,
    root,
    onSubmit,
    handleChangeValue,
    grid = '2',
    action = true,
    addOrUpdate,
    resetForm: formReset,
    lovList,
    handleOnBlur,
    smallFont = false,
    freeze = false,
    formInit = false,
    handleBack
}) => {
    const [initValues, setInitValues] = useState(null);
    const [validation, setValidation] = useState(null);
    const formikRef = useRef(null);

    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.resetForm();
        }
    }, [formInit]);

    useEffect(() => {
        const validationSchema = createYupSchema({
            [root]: formRender[root],
        });
        setValidation(validationSchema);
        setInitValues(initialValues);
    }, [formRender, initialValues, root]);

    return (
        <>
            {validation !== null && (
                <Formik
                    initialValues={initValues}
                    values={initValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    innerRef={formikRef}>
                    {({ handleSubmit, values, setFieldValue, resetForm }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className='mb-4 flex items-center justify-between'>
                                    {addOrUpdate && (
                                        <>
                                            {action && !freeze && (
                                                <Button
                                                    className='add-buttons me-5'
                                                    type='primary'
                                                    onClick={() => {
                                                        if (addOrUpdate) formReset();
                                                        else resetForm();
                                                    }}
                                                    icon={<i className='bi bi-plus icon-style' />}>
                                                    Add New
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className={`items-center grid grid-cols-${grid} gap-y-4`}>
                                    {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
                                        const dataId = formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
                                        return useMemo(() => {
                                            return (
                                                <React.Fragment key={dataId}>
                                                    {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
                                                        <div data-id={dataId}>
                                                            <FormFieldsRender
                                                                currentData={formRender?.[root]?.formFields[fieldKey]}
                                                                values={values}
                                                                setFieldValue={setFieldValue}
                                                                handleOnBlur={handleOnBlur}
                                                                lovData={lovList?.[dataId]}
                                                                handleChangeValue={handleChangeValue}
                                                                parent={root}
                                                                smallFont={smallFont}
                                                                freeze={freeze}
                                                            />
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        }, [values?.[root]?.formFields[fieldKey], lovList?.[dataId]]);
                                    })}
                                </div>
                                {action && (
                                    <div className='mt-5 mb-5 submit-button-form'>
                                        <button type='button'
                                            onClick={() => {
                                                resetForm()
                                                handleBack()
                                            }}
                                            className='reset'>
                                            Back
                                        </button>
                                        {!freeze && (
                                            <button disabled={freeze} type='submit' className='save ml-9'>
                                                {addOrUpdate ? 'Submit' : 'Submit'}
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

export default FormPage;
