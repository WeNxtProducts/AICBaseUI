import React, { useState } from 'react'
import { Radio, Switch } from 'antd';
import { SelectInput, TextInput, DateInput } from '@float-Input';
import { Form, Formik } from 'formik';
import { Roptions } from '../../QuoteConstant';

const NomineeDetails = () => {

    return (
        <Formik
            enableReinitialize={true}
        >
            {({ handleSubmit, values, setFieldValue, errors }) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <div className='customer_details'>
                            <div className='switch_cust'>
                                <p className='bene'>Beneficiary Type :</p>
                                <div className='switch-control'>
                                    <Radio.Group size='small' options={Roptions} />
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
                                </div></div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default NomineeDetails