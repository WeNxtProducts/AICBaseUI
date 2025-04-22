import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import {
    CustomInput,
    CustomNumberField, CustomSelect
} from '../../components/commonExportsFields/CommonExportsFields';
import { useNavigate } from 'react-router-dom';
import './ClaimIntimation.scss'
import { useSelector } from 'react-redux';

const EndorsementRequest = () => {
    const navigate = useNavigate();
    const { pol_no } = useSelector(state => state.custPol)
    const [initValues, setInitValues] = useState({
        Pol_No: '',
        Endorsement_type: '',
        contact_person: '',
        contact_number: '',
        email_id: ''
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    return (
        <div className='claim_intimation'>
            <div className='flex items-center pl-2'>
                <i
                    onClick={() => navigate('/endorsementRequestList', { replace: true })}
                    className='bi bi-arrow-left back_icon'
                />
                <p className='header-font pl-2'>{`Endorsement Request`}</p>
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
                                        <p className='col-span-1 form-label'>Policy Number</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='Pol_No'
                                                placeholder='pol no.'
                                                size='medium'
                                                options={[]}
                                                readOnly={false}
                                                value={values?.Pol_No || undefined}
                                                onChange={e => setFieldValue('Pol_No', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Endorsement Type</p>
                                        <div className='col-span-3'>
                                            <CustomSelect
                                                name='Endorsement_type'
                                                size='medium'
                                                showSearch={false}
                                                readOnly={false}
                                                options={[]}
                                                placeholder='type'
                                                value={values?.Endorsement_type || undefined}
                                                onChange={e => setFieldValue('Endorsement_type', e)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Contact Person</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='contact_person'
                                                size='medium'
                                                placeholder='name'
                                                value={values?.contact_person || undefined}
                                                onChange={e => setFieldValue('contact_person', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Contact Number</p>
                                        <div className='col-span-3'>
                                            <CustomNumberField
                                                format='number'
                                                placeholder={'number'}
                                                size='medium'
                                                value={values?.contact_number}
                                                onChange={e => {
                                                    setFieldValue('contact_number', e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col-span-1 grid grid-cols-4 items-center'>
                                        <p className='col-span-1 form-label'>Email Id</p>
                                        <div className='col-span-3'>
                                            <CustomInput
                                                name='email_id'
                                                size='medium'
                                                placeholder='email'
                                                value={values?.email_id || undefined}
                                                onChange={e => setFieldValue('email_id', e.target.value)}
                                            />
                                        </div>
                                    </div>


                                    <div className='col-span-2 flex items-center justify-center'>
                                        <button className='submit_btn' type='submit'>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default EndorsementRequest