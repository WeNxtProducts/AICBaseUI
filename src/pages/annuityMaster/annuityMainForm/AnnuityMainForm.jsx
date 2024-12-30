import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import { CustomDropDown, CustomInput, CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';

const AnnuityMainForm = () => {
    const [initValues, setInitValues] = useState({
        TYPE: '',
        CAG_DESC: '',
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='annuity_form'>
            <div className='flex items-center justify-between pl-2'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Annuity Master`}</p>
                </div>
            </div>
            <div className='mt-3 mb-5'>
                <div className='grid grid-cols-2 items-center p-2'>
                    <Formik
                        initialValues={initValues}
                        values={initValues}
                        onSubmit={onSubmit}
                        enableReinitialize={true}>
                        {({ handleSubmit, values, setFieldValue, resetForm }) => {
                            return (
                                <Form className='col-span-2 grid grid-cols-2 gap-5' onSubmit={handleSubmit}>
                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Annuity Type</p>
                                        <div className='col-span-3'>
                                            <CustomDropDown
                                                name='TYPE'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.TYPE || undefined}
                                                onChange={e => setFieldValue('TYPE', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Catg Desc</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='CAG_DESC'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='select'
                                                value={values?.CAG_DESC || undefined}
                                                onChange={e => setFieldValue('CAG_DESC', e)}
                                            />
                                        </div>
                                    </div>


                                    {/* <div className='col-span-2 flex items-center justify-center'>
                                        <button className='submit_btn' type='submit'>
                                            Submit
                                        </button>
                                    </div> */}
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default AnnuityMainForm
