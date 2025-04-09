import React from 'react'
import { Checkbox } from 'antd'
import { SelectInput, TextInput } from '@float-Input';
import { Form, Formik } from 'formik';
import { setStepper3 } from '../../../../globalStore/slices/QuoteSlice';
import { useDispatch } from 'react-redux';

const AddressFields = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            enableReinitialize={true}
        >
            {({ handleSubmit, values, setFieldValue, errors }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <div className='addresses'>
                            <div className='mail_field'>
                                <Checkbox className='mail_check'>
                                    Check here for Mailing address
                                </Checkbox>
                            </div>

                            <div className='address_field'>
                                <TextInput
                                    label='Name'
                                />
                            </div>
                            <div className='address_field'>
                                <TextInput
                                    label='Address 1'
                                />
                            </div>
                            <div className='address_field'>
                                <TextInput
                                    label='Address 2'
                                />
                            </div>
                            <div className='address_field'>
                                <TextInput
                                    label='Address 3'
                                />
                            </div>
                            <div className='address_field'>
                                <SelectInput
                                    label='City'
                                />
                            </div>
                            <div className='address_field'>
                                <SelectInput
                                    label='State'
                                />
                            </div>
                            <div className='address_field'>
                                <TextInput
                                    label='Zip Code'
                                />
                            </div>
                            <div className='mail_field flex justify-center'>
                                <Checkbox className='mail_check'>
                                    Permanent Address is same as Current Address
                                </Checkbox>
                            </div>
                            <div className='save_btn_grid'>
                                <button
                                    onClick={() => dispatch(setStepper3('nomineeDetails'))}
                                    type='submit'>
                                    Save
                                </button>
                                <button
                                    onClick={() => dispatch(setStepper3('customerDetails'))}>
                                    Previous
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default AddressFields