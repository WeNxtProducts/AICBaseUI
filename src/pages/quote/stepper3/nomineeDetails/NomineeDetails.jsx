import React from 'react'
import { Radio } from 'antd';
import { SelectInput, TextInput } from '@float-Input';
import { Form, Formik } from 'formik';
import { Roptions } from '../../QuoteConstant';
import { setStepper3 } from '../../../../globalStore/slices/QuoteSlice';
import { useDispatch } from 'react-redux';

const NomineeDetails = () => {
    const dispatch = useDispatch();

    return (
        <Formik
            enableReinitialize={true}
        >
            {({ handleSubmit, values, setFieldValue, errors }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <div className='customer_details nominee'>
                            <div className='switch_cust'>
                                <p className='bene'>Beneficiary Type :</p>
                                <div className='switch-control'>
                                    <Radio.Group size='small' options={Roptions} />
                                </div>
                            </div>
                            <div className='cust_form'>
                                <div className='cust_form_fields'>
                                    <SelectInput
                                        label='Type Of Assignee'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Name'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Mobile Number'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Email ID'
                                    />
                                </div>
                                <div className='cust_form_fields'>
                                    <TextInput
                                        label='Share %'
                                    />
                                </div>
                            </div>
                            <div className='save_btn_grid_nominee'>
                                <button
                                    onClick={() => dispatch(setStepper3(''))}
                                    type='submit'>
                                    Save
                                </button>
                                <button
                                    onClick={() => dispatch(setStepper3('customerAddress'))}>
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

export default NomineeDetails