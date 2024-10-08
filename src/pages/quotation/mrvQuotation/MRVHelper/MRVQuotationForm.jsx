/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { createYupSchema } from '../../../../components/commonHelper/SchemaGenerator';
import QuotationFieldWithValue from './QuotationFieldWithValue';
import { Button } from 'antd';

const MRVQuotationForm = ({
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
    smallFont = true,
    title = '',
    freeze = false,
    formInit = false,
    nextStep,
    handleOnSearch,
    schemaValidation
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
        if (schemaValidation) {
            setValidation(schemaValidation);
        } else {
            const validationSchema = createYupSchema({
                [root]: formRender[root],
            });
            setValidation(validationSchema);
        }
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
                    {({ handleSubmit, values, setFieldValue, resetForm, errors }) => {
                        // console.log('errors : ', errors);
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className='mb-4 flex items-center justify-between px-2'>
                                    <p className='form_title'>{title}</p>
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

                                <div className={`items-center grid grid-cols-${grid} gap-y-3 px-2`}>
                                    {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
                                        const dataId = formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;

                                        return (
                                            <React.Fragment key={dataId}>
                                                {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
                                                    <div data-id={dataId}>
                                                        <QuotationFieldWithValue
                                                            currentData={formRender?.[root]?.formFields[fieldKey]}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleOnBlur={handleOnBlur}
                                                            lovData={lovList?.[dataId]}
                                                            handleChangeValue={handleChangeValue}
                                                            handleOnSearch={handleOnSearch}
                                                            parent={root}
                                                            smallFont={smallFont}
                                                            freeze={freeze}
                                                        />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>

                                {/* <div className={`items-center grid grid-cols-${grid} gap-y-3 px-2`}>
         {Object.keys(formRender?.[root]?.formFields).map(fieldKey => {
          const dataId = formRender?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;
          return useMemo(() => {
           return (
            <React.Fragment key={dataId}>
             {!formRender?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
              <div data-id={dataId}>
               <QuotationFieldWithValue
                currentData={formRender?.[root]?.formFields[fieldKey]}
                values={values}
                setFieldValue={setFieldValue}
                handleOnBlur={handleOnBlur}
                lovData={lovList?.[dataId]}
                handleChangeValue={handleChangeValue}
                handleOnSearch={handleOnSearch}
                parent={root}
                smallFont={smallFont}
                freeze={freeze}
               />
              </div>
             )}
            </React.Fragment>
           );
           //values?.[root]?.formFields[fieldKey]
          }, [values, lovList?.[dataId], formRender]);
         })}
        </div> */}
                                {action && (
                                    <div className='w-full mt-5 mb-5 submit-button-form'>
                                        {!freeze && (
                                            <button disabled={freeze} type='submit' className='save ml-9'>
                                                {addOrUpdate ? 'Update' : 'Submit'}
                                            </button>
                                        )}
                                        {!['pol_riders', 'medical_details']?.includes(root) && (
                                            <button onClick={() => nextStep()} type='button' className='next-button ml-9'>
                                                Next
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

export default MRVQuotationForm;
