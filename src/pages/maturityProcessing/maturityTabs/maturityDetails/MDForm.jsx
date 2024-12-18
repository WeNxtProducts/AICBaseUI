import React from 'react'
import { Button } from 'antd';
import { Form, useFormikContext } from 'formik';
import { CustomNumberField } from '../../../../components/commonExportsFields/CommonExportsFields';

const MDForm = () => {
    const { setFieldValue, values, handleSubmit } = useFormikContext()

    return (
        <Form className='col-span-2 grid grid-cols-11 gap-2'
            onSubmit={handleSubmit}>
            <div className='col-span-3 flex items-center gap-x-3'>
                <p className='form-label'>Tax Slab Rate</p>
                <CustomNumberField
                    name='tax_slab_rate'
                    placeholder='.00'
                    format='amount'
                    size='medium'
                    readOnly={false}
                    value={values?.tax_slab_rate}
                    onChange={e => setFieldValue('tax_slab_rate', e?.target?.value)}
                />
            </div>

            <div className='col-span-3 flex items-center gap-x-3'>
                <p className='form-label'>Interim Int. Rate</p>
                <CustomNumberField
                    name='interim_int_rate'
                    placeholder='.00'
                    format='amount'
                    size='medium'
                    readOnly={false}
                    value={values?.interim_int_rate}
                    onChange={e => setFieldValue('interim_int_rate', e?.target?.value)}
                />
            </div>

            <div className='col-span-3 flex items-center gap-x-3'>
                <p className='form-label'>Rate Per</p>
                <CustomNumberField
                    name='rate_per'
                    placeholder='.00'
                    format='amount'
                    size='medium'
                    readOnly={false}
                    value={values?.rate_per}
                    onChange={e => setFieldValue('rate_per', e?.target?.value)}
                />
            </div>

            <div className='col-span-2 flex items-center justify-end gap-x-3'>
                <Button className='contribution_btn'>Contribution Dtls</Button>
            </div>
            {/* <button type='submit'>Submit</button> */}
        </Form>
    )
}

export default MDForm
