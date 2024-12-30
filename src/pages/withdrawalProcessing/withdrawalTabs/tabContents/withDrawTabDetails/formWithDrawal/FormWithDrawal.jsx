import React from 'react'
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';
import { CustomNumberField } from '../../../../../../components/commonExportsFields/CommonExportsFields';

const FormWithDrawal = () => {

    const renderRow = (title, value) => (
        <div className='col-span-1'>
            <div className='flex items-center'>
                <div className='w-4/12'>
                    <p className='label-font'>{title}</p>
                </div>
                <div className='w-1/2 ml-4 pl-1 ref_no_box'>
                    <p className={`pl-2 float-${title === 'Tax Slab Code' ? 'left' : 'right'}`}>
                        {title === 'LC Amount' ? formatNumber(value) : value}
                    </p>
                </div>
            </div>
        </div>
    );

    const renderInput = (title, value) => (
        <div className='col-span-1'>
            <div className='flex items-center'>
                <div className='w-4/12'>
                    <p className='label-font'>{title}</p>
                </div>
                <div className='w-1/2 ml-4'>
                    <CustomNumberField
                        name='fc_amount'
                        placeholder='0'
                        value={value}
                        readOnly={false}
                        onChange={e => {
                            console.log(" e.target.value : ", e.target.value)
                        }}
                    />

                </div>
            </div>
        </div>
    );

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

    return (
        <div className='grid grid-cols-12 gap-1 mt-2'>
            <div className='col-span-10 grid grid-cols-2 gap-3'>
                {renderRow('Tax Slab Code', 'WDTAX')}
                <div className='col-span-1' />
                {renderInput('Interest Rate', 9.0)}
                {renderInput('Rate Per', 100)}
                <div className='fc_lc_details col-span-2'>
                    <div className='mt-2 grid grid-cols-2 items-center gap-y-1 gap-x-5'>
                        <div className='col-span-2 grid grid-cols-9'>
                            <p className='col-span-3' />
                            <p className='col-span-3 form-label m-auto'>FC Amount</p>
                            <p className='col-span-3 form-label m-auto'>LC Amount</p>
                        </div>
                        {renderFCLCFields('Gross Payable', 42821.376, 42821.376)}
                        {renderFCLCFields('Tax', 855.428, 855.428)}
                        {renderFCLCFields('Cust Charge', 1284.641, 1284.641)}
                        {renderFCLCFields('Comp Charge', .000, .000)}
                        {renderFCLCFields('Sum Assured Amt', .000, .000)}
                        {renderFCLCFields('Net Payable', 40681.307, 40681.307)}
                    </div>
                </div>


            </div>
        </div>
    )
}

export default FormWithDrawal
