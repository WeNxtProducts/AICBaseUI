import React from 'react'
import { Checkbox } from 'antd'
import { SelectInput, TextInput } from '@float-Input';
import { Form, Formik } from 'formik';

const AddressFields = () => {
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
                            <div className='mail_field'>
                                <Checkbox className='mail_check'>
                                    Current Address is same as permanent Address
                                </Checkbox>
                            </div>
                            <div className='save_btn_grid'>
                                <button type='submit'>Save</button>
                                <button>Previous</button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default AddressFields