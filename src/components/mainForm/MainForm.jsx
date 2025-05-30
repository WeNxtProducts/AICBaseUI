/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
import FieldWithValue from '../fieldsWithValues/FieldWithValue';
import { createYupSchema } from '../commonHelper/SchemaGenerator';
import { quotationSchema } from '../../pages/quotation/quotationPanels/quotationSchema/QuotationSchema';

const MainForm = ({
    initialValues,
    formRender,
    root,
    onSubmit,
    handleChangeValue,
    grid = '2',
    action = true,
    addOrUpdate,
    lovList,
    handleOnBlur,
    handleOnSearch,
    freeze = false,
    schemaValidation,
}) => {
    const [initValues, setInitValues] = useState(null);
    const [validation, setValidation] = useState(null);
    //  const [stall, setStall] = useState();

    //  useEffect(() => {
    //   setStall(freeze);
    //  }, [freeze]);

    useEffect(() => {
        if (addOrUpdate) {
            setInitValues(initialValues);
        } else {
            setInitValues(formRender);
        }
    }, [initValues]);

    useEffect(() => {
        if (schemaValidation) {
            setValidation(schemaValidation);
        } else {
            const validationSchema = createYupSchema({
                [root]: formRender[root],
            });
            setValidation(validationSchema);
        }
    }, [formRender]);

    const onHandleOnBlur = (currentData, valuesLatest, setFieldValue, val, label = '') => {
        if (handleOnBlur) {
            handleOnBlur(currentData, valuesLatest, setFieldValue, val, label);
        }
    };

    return (
        <>
            {initValues !== null && validation !== null && (
                <Formik
                    initialValues={initValues}
                    values={initValues}
                    validationSchema={validation}
                    onSubmit={onSubmit}
                    enableReinitialize={true}>
                    {({ handleSubmit, values, errors, setFieldValue, resetForm, touched, setFieldTouched }) => {
                        // console.log('values : ', errors);

                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className={`items-start grid grid-cols-${grid} gap-0`}>
                                    {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
                                        const dataId = formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
                                        return useMemo(() => {
                                            return (
                                                <React.Fragment key={dataId}>
                                                    {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
                                                        <div data-id={dataId}>
                                                            <FieldWithValue
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
                                        }, [values?.[root]?.formFields, lovList?.[dataId], formRender, freeze]);
                                    })}
                                </div>
                                {action && !freeze && (
                                    <div className='w-full mt-5 mb-5 submit-button-form'>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                resetForm();
                                            }}
                                            className='reset'>
                                            Reset
                                        </button>
                                        <button type='submit' className='save ml-9'>
                                            {addOrUpdate ? 'Update' : 'Submit'}
                                        </button>
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

export default MainForm;
