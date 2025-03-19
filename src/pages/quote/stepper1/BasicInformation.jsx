import React, { useContext, useState } from 'react';
import { SelectInput, TextInput, DateInput } from '@float-Input';
import { basicInfoInitValues } from '../QuoteConstant';
import { Form, Formik } from 'formik';
import QuoteContext from '../QuoteContext';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setStepperIndex } from '../../../globalStore/slices/QuoteSlice';

const BasicInformation = () => {
    const dispatch = useDispatch();
    const stepperIndex = useSelector(state => state?.quote?.stepperIndex);
    const [initVal, setInitVal] = useState(basicInfoInitValues)

    const onSubmit = async values => {
        console.log("values : ", values);
    }

    return (
        <div className='basic_information mt-1'>
            <p>Basic Information</p>
            <div className='w-full'>
                <Formik
                    initialValues={initVal}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ handleSubmit, values, setFieldValue, errors }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <div className='basic_form grid grid-cols-9 gap-x-6 gap-y-3'>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Title'
                                            value={values?.basic_info?.formFields?.title}
                                            onChange={value => setFieldValue(`basic_info.formFields.title`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='First Name'
                                            value={values?.basic_info?.formFields?.first_name}
                                            onChange={e => setFieldValue(`basic_info.formFields.first_name`, e.target.value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='Middle Name'
                                            value={values?.basic_info?.formFields?.midle_name}
                                            onChange={e => setFieldValue(`basic_info.formFields.midle_name`, e.target.value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='Last Name'
                                            value={values?.basic_info?.formFields?.last_name}
                                            onChange={e => setFieldValue(`basic_info.formFields.last_name`, e.target.value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <DateInput
                                            label='Date of Birth'
                                            value={values?.basic_info?.formFields?.dob}
                                            onChange={date => setFieldValue(`basic_info.formFields.dob`, date)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Gender'
                                            value={values?.basic_info?.formFields?.gender}
                                            onChange={value => setFieldValue(`basic_info.formFields.gender`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='Mobile No'
                                            value={values?.basic_info?.formFields?.mob_no}
                                            onChange={e => setFieldValue(`basic_info.formFields.mob_no`, e.target.value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='Email ID'
                                            value={values?.basic_info?.formFields?.email_id}
                                            onChange={e => setFieldValue(`basic_info.formFields.email_id`, e.target.value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Plan Term in Years'
                                            value={values?.basic_info?.formFields?.plan_term}
                                            onChange={value => setFieldValue(`basic_info.formFields.plan_term`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Currency'
                                            value={values?.basic_info?.formFields?.currency}
                                            onChange={value => setFieldValue(`basic_info.formFields.currency`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='Sum Assured in AED'
                                            value={values?.basic_info?.formFields?.sum_assured}
                                            onChange={e => setFieldValue(`basic_info.formFields.sum_assured`, e.target.value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Premium Frequency'
                                            value={values?.basic_info?.formFields?.prem_freq}
                                            onChange={value => setFieldValue(`basic_info.formFields.prem_freq`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Occupation Category'
                                            value={values?.basic_info?.formFields?.occupation_category}
                                            onChange={value => setFieldValue(`basic_info.formFields.occupation_category`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Occupation'
                                            value={values?.basic_info?.formFields?.occupation}
                                            onChange={value => setFieldValue(`basic_info.formFields.occupation`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Nationality'
                                            value={values?.basic_info?.formFields?.nationality}
                                            onChange={value => setFieldValue(`basic_info.formFields.nationality`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Smoker'
                                            value={values?.basic_info?.formFields?.smoker}
                                            onChange={value => setFieldValue(`basic_info.formFields.smoker`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <SelectInput
                                            label='Country Of residence'
                                            value={values?.basic_info?.formFields?.country_residence}
                                            onChange={value => setFieldValue(`basic_info.formFields.country_residence`, value)}
                                        />
                                    </div>
                                    <div className='col-span-3'>
                                        <TextInput
                                            label='Promo Code'
                                            value={values?.basic_info?.formFields?.promo_code}
                                            onChange={e => setFieldValue(`basic_info.formFields.promo_code`, e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='mt-5 w-full flex justify-end pr-10'>
                                    <button type='submit'
                                        onClick={() => {
                                            dispatch(setStepperIndex(1));
                                        }} className='process_button'>Get Quote</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default BasicInformation;
