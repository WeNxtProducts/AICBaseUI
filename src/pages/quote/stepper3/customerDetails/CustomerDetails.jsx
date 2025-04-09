import React from 'react'
import { Switch } from 'antd'
import { Form, Formik } from 'formik';
import { SelectInput, TextInput, DateInput } from '@float-Input';
import { setStepper3 } from '../../../../globalStore/slices/QuoteSlice';
import { useDispatch } from 'react-redux';

const CustomerDetails = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            enableReinitialize={true}
        >
            {({ handleSubmit, values, setFieldValue, errors }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <div className='customer_details'>
                            <div className='switch_cust'>
                                <p>Enter Manually/Upload EID:</p>
                                <div className='switch-control'>
                                    <span>Yes</span>
                                    <Switch className='switch' size="small" defaultChecked />
                                    <span>No</span>
                                </div>
                            </div>
                            <div className='switch_cust'>
                                <p>Are you UAE National :</p>
                                <div className='switch-control'>
                                    <span>Yes</span>
                                    <Switch className='switch' size="small" defaultChecked />
                                    <span>No</span>
                                </div>
                            </div>
                            <div className='cust_form'>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Country Of residence'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Emirates ID'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <DateInput
                                        label='Emirates expiry date'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Marital Status'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <DateInput
                                        label='Place Of Birth'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Weight'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Height'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Company Name'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Job Title'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Exact nature of Duties'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Industries'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Annual Income in AED'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Income Currency'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Source Of Premium'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Purpose of Insurance'
                                    />
                                </div>
                            </div>
                            <div className='passport_form mb-10'>
                                <p className='form_title'>Passport Details</p>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Passport Name'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <DateInput
                                        label='Issue Date'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Place of Issue'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <DateInput
                                        label='Expiry Date'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Nationality'
                                    />
                                </div>

                            </div>
                            <div className='save_btn_grid'>
                                <button
                                    onClick={() => dispatch(setStepper3('customerAddress'))}
                                    type='submit'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default CustomerDetails