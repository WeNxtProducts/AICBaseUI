import React, { useState } from 'react'
import { FormikProvider, useFormik } from 'formik';
import MDForm from './MDForm';
import { CustomNumberField } from '../../../../components/commonExportsFields/CommonExportsFields';

const MaturityDetails = () => {
    const [initValues, setInitValues] = useState({
        tax_slab_rate: '',
        interim_int_rate: '',
        rate_per: '',
    });

    const onSubmit = values => {
        console.log("Values : ", values);
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit,
        enableReinitialize: true,
    });

    const renderFCLCFields = (label, LCval = .00, FCval = .00) => (
        <div className='col-span-2 grid grid-cols-9 gap-3'>
            <p className='col-span-3 form-label'>{label}</p>
            <div className='col-span-3'>
                <CustomNumberField
                    name={`${label}-LC`}
                    placeholder='.00'
                    size='large'
                    value={LCval}
                    readOnly={true}
                    format='amount'
                    onChange={e => {
                        console.log(e);
                    }}
                />
            </div>
            <div className='col-span-3'>
                <CustomNumberField
                    name={`${label}-FC`}
                    placeholder='.00'
                    size='large'
                    value={FCval}
                    readOnly={true}
                    format='amount'
                    onChange={e => {
                        console.log(e);
                    }}
                />
            </div>
        </div>
    )

    const renderFCLCHeader = () => (
        <div className='col-span-2 grid grid-cols-9'>
            <p className='col-span-3' />
            <p className='col-span-3 form-label m-auto'>FC Amount</p>
            <p className='col-span-3 form-label m-auto'>LC Amount</p>
        </div>
    )

    return (
        <div className='maturity_Details grid grid-cols-8 gap-x-2'>
            <div className='col-span-8 grid grid-cols-2 items-center p-2'>
                <FormikProvider value={formik}>
                    <MDForm />
                </FormikProvider>
            </div>

            <div className='currency_fc_lc_details col-span-8 grid grid-cols-8 gap-x-4'>
                <div className='fc_lc_details col-span-4'>
                    <div className='mt-2 grid grid-cols-2 items-center gap-y-1 gap-x-5'>
                        {renderFCLCHeader()}
                        {renderFCLCFields('Gross Payable', 42821.376, 42821.376)}
                        {renderFCLCFields('Gross Commt', 855.428, 855.428)}
                        {renderFCLCFields('Cust Charge', 1284.641, 1284.641)}
                        {renderFCLCFields('Comp Charge', .000, .000)}
                        {renderFCLCFields('Tax', .000, .000)}
                        {renderFCLCFields('Net Commt', 40681.307, 40681.307)}
                    </div>

                </div>

                <div className='fc_lc_details col-span-4'>
                    <div className='mt-2 grid grid-cols-2 items-center gap-y-1 gap-x-5'>
                        {renderFCLCHeader()}
                        {renderFCLCFields('Annuity Before Commt', 28676.564, 28676.564)}
                        {renderFCLCFields('Cost of Pension', .000, .000)}
                        {renderFCLCFields('Emp Annuity Amt', 20073.595, 20073.595)}
                        {renderFCLCFields('Emp Annuity Inst', 1672.800, 1672.800)}
                        {renderFCLCFields('Spouse Annuity Amt', 13382.397, 13382.397)}
                        {renderFCLCFields('Spouse Annuity Inst', 1115.200, 1115.200)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MaturityDetails
