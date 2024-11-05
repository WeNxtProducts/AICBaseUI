import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Form, Formik } from 'formik';
import FormFieldsRender from '../../../groupLifePanels/planDetails/plansTab/planMRV/planMRVForm/formCreate/FormFieldsRender';
import './ExpandRowContent.scss';

const ExpandRowContent = ({ record, handleCloseExp, fieldJSON, lovJSON }) => {
    const root = 'pol_riders'
    const [formMRV, setFormMRV] = useState(fieldJSON);
    const [formMRVInitialValues, setFormMRVInitialValues] = useState(fieldJSON);
    const [dropDown, setDropDown] = useState(lovJSON)

    const scrollToRow = () => {
        const panel = document.querySelector(`[data-row-key='${record?.key}']`);
        if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        scrollToRow();
    }, [record?.key]);

    const onSubmit = values => {
        console.log("values: ", values)
    }

    const handleOnBlur = (currentData, values) => {
        console.log("handleOnBlur")
    };

    const handleChangeValue = (value, path, setFieldValue, values) => {
        setFieldValue(path, value);
    };

    return (
        <div className='expand_row_content'>
            <div className='exp_header'>
                <p>Employee Detail</p>
                <CloseOutlined
                    onClick={() => {
                        handleCloseExp(false, record)
                    }}
                    className="close_icon_exp" />
            </div>
            <hr className='form_divier' />
            <div className='main_form'>
                <Formik
                    initialValues={formMRVInitialValues}
                    values={formMRVInitialValues}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, values, setFieldValue, resetForm }) => {
                        return (
                            <Form onSubmit={handleSubmit}>

                                <div className={`items-center grid grid-cols-${2} gap-y-2`}>
                                    {Object.keys(formMRV?.[root]?.formFields).map(fieldKey => {
                                        const dataId = formMRV?.[root]?.formFields[fieldKey]?.PFD_COLUMN_NAME;

                                        return (
                                            <React.Fragment key={dataId}>
                                                {!formMRV?.[root]?.formFields[fieldKey]?.PFD_HIDE_YN && (
                                                    <div data-id={dataId}>
                                                        <FormFieldsRender
                                                            currentData={formMRV?.[root]?.formFields[fieldKey]}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            handleOnBlur={handleOnBlur}
                                                            lovData={dropDown?.[dataId]}
                                                            handleChangeValue={handleChangeValue}
                                                            parent={root}
                                                            smallFont={true}
                                                            freeze={false}
                                                        />
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        );

                                    })}
                                </div>
                                <div className='mt-5 mb-5 submit-button-form'>
                                    <button type='button'
                                        onClick={() => {
                                            // resetForm()
                                            handleCloseExp(false, record)
                                        }}
                                        className='reset'>
                                        Cancel
                                    </button>

                                    <button type='submit' className='save ml-9'>
                                        Update
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default ExpandRowContent
